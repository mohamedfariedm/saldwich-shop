/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { translate } from '../../translations/TranslationContext';
import './MappingComponent.css';

const MappingComponent = () => {
  const [lang, setLang] = useState('en');
  const [MappingData, setMapping] = useState<any>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [activeButton, setActiveButton] = useState(0);
  const [positions, setPositions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: '50%', left: '50%' });

  const imageRef = useRef<HTMLImageElement>(null);

  
  const handleButtonClick = (location: any, index: any, position: any) => {
    setSelectedLocation(location);
    setActiveButton(index);
    setModalPosition({
      top: position.top,
      left: position.left,
    });
    setShowModal(true);
  };

  const generateRandomPosition = (existingPositions: any[]) => {
    let newPosition;
    const minDistance = 50; // الحد الأدنى للمسافة بين كل زر والآخر (بالبكسل)
    let attempts = 0;
    
    const imageWidth = imageRef.current?.clientWidth || 1000; // عرض الصورة
    const imageHeight = imageRef.current?.clientHeight || 1000; // ارتفاع الصورة
  
    do {
      let left = Math.random() * (800 - 400) + 400; // نطاق `left` بين 400px و 800px
      let top = Math.random() * (900 - 80) + 80; // `top` بين 80px و 900px
  
      newPosition = { left, top };
      attempts++;
    } while ((!isFarEnough(newPosition, existingPositions, minDistance) || attempts < 100) && attempts < 100);
  
    return {
      left: `${(newPosition.left / imageWidth) * 100}%`, 
      top: `${(newPosition.top / imageHeight) * 100}%`
    };
  };
  
  

  // التحقق من أن المواقع ليست متداخلة
  const isFarEnough = (newPos: { left: number; top: number }, existingPositions: any[], minDistance: number) => {
    return existingPositions.every(pos => {
      const dx = newPos.left - parseFloat(pos.left);
      const dy = newPos.top - parseFloat(pos.top);
      return Math.sqrt(dx * dx + dy * dy) >= minDistance;
    });
  };

  useEffect(() => {
    const fetchMapping = async () => {
      try {
        const storedLang = localStorage.getItem('lang') || 'en';
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Branch`, {
          method: 'GET',
          headers: {
            'Accept-Language': storedLang,
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMapping(data);

        if (data.data.length > 0) {
          setSelectedLocation(data.data[0]);
          setActiveButton(0);
        }
      } catch (error) {
        console.error('Error fetching home page data:', error);
      }
    };

    fetchMapping();
  }, []);

  useEffect(() => {
    if (MappingData.data?.length > 0 && positions.length === 0) {
      const storedPositions = localStorage.getItem('buttonPositions');
      if (storedPositions) {
        setPositions(JSON.parse(storedPositions));
      } else {
        const randomPositions: any = [];
        for (let i = 0; i < MappingData.data.length; i++) {
          randomPositions.push(generateRandomPosition(randomPositions));
        }
        setPositions(randomPositions);
        localStorage.setItem('buttonPositions', JSON.stringify(randomPositions));
      }
    }
  }, [MappingData]);

  return (
    <>
    <div className="mapping relative mapping-desktop">
      
        <div className='md:w-[80%] mx-auto my-0 bg-white px-4 py-8 relative '>
        <div className='absolute top-[19%] right-[1%]'>
          <p className="self-stretch justify-start text-Text+Icon-Primary text-xl font-normal font-['Aptly'] leading-[30px]">Where to Find Us</p>
          <h1 className="justify-start text-Text+Icon-Primary text-[56px] font-bold font-['Aptly'] leading-[67.20px]">Our Branches</h1>
        </div>
        <div className="maping" style={{ position: 'relative', overflow: 'hidden' }}>
          <img ref={imageRef} src="/GroupMaping.png" style={{ width: '100%', display: 'block' }} alt="Map" />
          {MappingData.data?.length > 0 &&
            MappingData.data.map((location: any, index: any) => {
              const position = positions[index];
              if (!position) return null;
              return (
                <button
                  key={index}
                  className="mapping_button"
                  style={{
                    position: 'absolute',
                    left: position.left,
                    top: position.top,
                    transform: 'translate(-50%, -50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleButtonClick(location, index, position)}
                >
                  <img src={activeButton === index ? '/imgs/Point_location.svg' : '/imgs/Pointlocation.svg'} alt="Location" />
                </button>
              );
            })}
        </div>
        </div>
     
      {showModal && selectedLocation && (
        <div
          className="modal_overlay"
          onClick={() => setShowModal(false)}
          style={{
            position: 'absolute',
            top: modalPosition.top,
            left: modalPosition.left,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
            backgroundColor: 'rgb(255, 255, 255)',
            borderRadius: '24px',
            padding: '24px',
            maxWidth: '24%',
          }}
        >
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <p>{translate('Location', lang)}</p>
            <h1>{selectedLocation.name}</h1>
            <p className="values">{selectedLocation.address}</p>
            <div className="mapping_icons">
              <div>
                <img src="/imgs/location-09.svg" alt="Direction" />
                <span>
                  <a
                    className="locations"
                    href={`https://www.google.com/maps/search/?api=1&query=${selectedLocation.latitude},${selectedLocation.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {translate('Direction', lang)}
                  </a>
                </span>
              </div>
              <div>
                <img src="/imgs/call1.svg" alt="Phone" />
                <span className="phone_dir">{selectedLocation.phone || '+966XXXXXXXXX'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    <div className="mapping mapping-mobile">
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <div className="maping">
            <img src="/imgs/Map2.png" />
            {MappingData.data?.length > 0 && MappingData.data.map((location: any, index: any) => {
              const position = positions[index]; 
              if (!position) {
                return null; 
              } 
              return (
                <button
                  key={index}
                  className="mapping_button"
                  style={{
                    left: position.left,
                    top: position.top,
                  }}
                  onClick={() => handleButtonClick(location, index,position)}
                >
                  <img src={activeButton === index ? '/imgs/Point_location.svg' : '/imgs/Pointlocation.svg'} />
                </button>
              );
            })}
          </div>
        </Col>
        <Col>
          {selectedLocation ? (
            <div className="title_mapping">
              <p>{translate('Location', lang)}</p>
              <h1>{selectedLocation.name}</h1>
              <p className="values">{selectedLocation.address}</p>
              <div className="mapping_icons">
                <div>
                  <img src="/imgs/location-09.svg" />
                  <span>
                    <a className="locations" href={`https://www.google.com/maps/search/?api=1&query=${selectedLocation.latitude},${selectedLocation.longitude}`} target="_blank" rel="noopener noreferrer">
                      {translate('Direction', lang)}
                    </a>
                  </span>
                </div>
                <div>
                  <img src="/imgs/call1.svg" />
                  <span className="phone_dir">{selectedLocation.phone || '+966XXXXXXXXX'}</span>
                </div>
              </div>
            </div>
          ) : (
            <p>{translate('Loading...', lang)}</p>
          )}
        </Col>
      </Row>
    </Container>
  </div>
  </>
  );
};

export default MappingComponent;



{/* <div className="mapping">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <div className="maping">
              <img src="/imgs/Map2.png" />
              {MappingData.data?.length > 0 && MappingData.data.map((location: any, index: any) => {
                const position = positions[index]; 
                if (!position) {
                  return null; 
                } 
                return (
                  <button
                    key={index}
                    className="mapping_button"
                    style={{
                      left: position.left,
                      top: position.top,
                    }}
                    onClick={() => handleButtonClick(location, index)}
                  >
                    <img src={activeButton === index ? '/imgs/Point_location.svg' : '/imgs/Pointlocation.svg'} />
                  </button>
                );
              })}
            </div>
          </Col>
          <Col>
            {selectedLocation ? (
              <div className="title_mapping">
                <p>{translate('Location', lang)}</p>
                <h1>{selectedLocation.name}</h1>
                <p className="values">{selectedLocation.address}</p>
                <div className="mapping_icons">
                  <div>
                    <img src="/imgs/location-09.svg" />
                    <span>
                      <a className="locations" href={`https://www.google.com/maps/search/?api=1&query=${selectedLocation.latitude},${selectedLocation.longitude}`} target="_blank" rel="noopener noreferrer">
                        {translate('Direction', lang)}
                      </a>
                    </span>
                  </div>
                  <div>
                    <img src="/imgs/call1.svg" />
                    <span className="phone_dir">{selectedLocation.phone || '+966XXXXXXXXX'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p>{translate('Loading...', lang)}</p>
            )}
          </Col>
        </Row>
      </Container>
    </div> */}
