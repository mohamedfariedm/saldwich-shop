'use client';

import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  OverlayView,
} from '@react-google-maps/api';

type Branch = {
  id: number;
  name: string;
  phone: string;
  address: string;
  latitude: string;
  longitude: string;
};

const center = {
  lat: 24.774265, // وسط السعودية
  lng: 46.738586,
};

const containerStyle = {
  width: '100%',
  height: '100%',
};

const Map = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selected, setSelected] = useState<Branch | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const storedLang = localStorage.getItem('lang') || 'en';
        setLang(storedLang as 'en' | 'ar');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Branch`, {
          headers: {
            'Accept-Language': storedLang,
          },
        });
        const json = await res.json();
        setBranches(json.data);
      } catch (error) {
        console.error('Error loading branches', error);
      }
    };

    fetchBranches();
  }, []);

  const translate = (key: string, lang: string) => {
    const translations: any = {
      Location: { en: 'Location', ar: 'الموقع' },
      Direction: { en: 'Direction', ar: 'الاتجاهات' },
    };
    return translations[key]?.[lang] || key;
  };

  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-[1280px] h-[617px] rounded-2xl overflow-hidden relative mb-24">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10.5}
            options={{
              mapTypeControl: false,
              fullscreenControl: false,
              streetViewControl: false,
            }}
          >
            {branches.map((branch, index) => {
              const lat = parseFloat(branch.latitude);
              const lng = parseFloat(branch.longitude);
              return (
                <MarkerF
                  key={branch.id}
                  position={{ lat, lng }}
                  icon={{
                    url:
                      activeIndex === index
                        ? '/imgs/Point_location.svg'
                        : '/imgs/Pointlocation.svg',
                    scaledSize: new google.maps.Size(70, 70),
                  }}
                  onClick={() => {
                    setSelected(branch);
                    setActiveIndex(index);
                  }}
                />
              );
            })}

            {selected && (
              <OverlayView
                position={{
                  lat: parseFloat(selected.latitude),
                  lng: parseFloat(selected.longitude),
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div
                  className="bg-white rounded-2xl p-5 shadow-lg w-[270px] md:w-[320px] text-black"
                  style={{ transform: 'translate(-50%, -120%)' }}
                  onClick={() => setSelected(null)}
                >
                  <p className="text-sm text-gray-500">{translate('Location', lang)}</p>
                  <h1 className="text-xl font-semibold">{selected.name}</h1>
                  <p className="text-sm text-gray-600 mt-1">{selected.address}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <img src="/imgs/location-09.svg" className="w-5 h-5" alt="Direction" />
                    <a
                      className="text-blue-600 underline text-sm"
                      href={`https://www.google.com/maps/search/?api=1&query=${selected.latitude},${selected.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {translate('Direction', lang)}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <img src="/imgs/call1.svg" className="w-5 h-5" alt="Phone" />
                    <span className="text-sm">{selected.phone || '+966XXXXXXXXX'}</span>
                  </div>
                </div>
              </OverlayView>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Map;
