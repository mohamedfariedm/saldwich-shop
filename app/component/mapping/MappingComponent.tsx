/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { translate } from '../../translations/TranslationContext';
import './MappingComponent.css';

const MappingComponent = () => {
  const [lang, setLang] = useState('en');
  const [MappingData, setMapping] = useState<any>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [activeButton, setActiveButton] = useState(0);

  const handleButtonClick = (location: any, index: any) => {
    setSelectedLocation(location);
    setActiveButton(index);
  };
  const [positions, setPositions] = useState<any[]>([]);

  const generateRandomPosition = () => {
    const left = Math.floor(Math.random() * 39) + 20; 
    const top = Math.floor(Math.random() * 85) + 5;   
    return { left: `${left}%`, top: `${top}%` };
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
      // تحقق من وجود المواقع المخزنة في localStorage
      const storedPositions = localStorage.getItem('buttonPositions');
      if (storedPositions) {
        // إذا كانت المواقع موجودة، قم بتحميلها
        setPositions(JSON.parse(storedPositions));
      } else {
        // إذا لم تكن المواقع موجودة، قم بتوليدها وتخزينها في localStorage
        const randomPositions = MappingData.data.map(() => generateRandomPosition());
        setPositions(randomPositions);
        localStorage.setItem('buttonPositions', JSON.stringify(randomPositions)); // تخزين المواقع
      }
    }
  }, [MappingData]);
  
  

  return (
    <div className="mapping">
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
    </div>
  );
}

export default MappingComponent;
