'use client'

import React, { useState, useEffect } from 'react';
import './OurService.css';
import styles from './OurService.module.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const OurService = (service: any) => {
  
  const [Service, setService] = useState<any>({ data: [] });
  const [ServiceData, setdata] = useState<any>({ data: [] });

  const [selectedType, setSelectedType] = useState<string>('Business'); // تعيين النوع الافتراضي Business
  const [selectedNameIndex, setSelectedNameIndex] = useState(0);
  const router = useRouter();

  const fetchService = async (type: string) => {
    try {
      const storedLang = localStorage.getItem('lang') || 'en';
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Service?type=${type}`, {
        method: 'GET',
        headers: {
          'Accept-Language': storedLang,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setdata(data);
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  useEffect(() => {
    fetchService(selectedType); // جلب البيانات بناءً على النوع المختار
  }, [selectedType]);

  const handleTypeClick = (type: string) => {
    setSelectedType(type); // تغيير النوع عند اختيار زر جديد
    setSelectedNameIndex(0); // إعادة ضبط الفهرس المختار
  };

  const handleNameClick = (index: number) => {
    setSelectedNameIndex(index);
  };

  const handleViewMoreClick = (id: number) => {
    router.push(`/orderDetils?search=${id}`);
  };

  return (
    <div>
      <Container>
        <Row>
          <div className="row_center" id="OurServices">
            <div className="title_service">
              <p>{service?.service?.title}</p>
              <h1>{service?.service?.Posts[0]?.title}</h1>
              <span>{service?.service?.Posts[0]?.description}</span>
            </div>
          </div>
         

          <div className={styles.perant}>
          <div className={styles.name_button}>
            <div
              className={`${styles.nameButton} ${selectedType === 'Business' ? styles.selectedName : ''}`}
              onClick={() => handleTypeClick('Business')}
            >
              Business
            </div>
            <div
              className={`${styles.nameButton} ${selectedType === 'Individual' ? styles.selectedName : ''}`}
              onClick={() => handleTypeClick('Individual')}
            >
              Individual
            </div>
          </div>
        </div>

          <div className={styles.grid_box}>
            <Row>
              {ServiceData?.data.length > 0 ? (
                ServiceData.data.map((item: any, idx: any) => (
                  <Col xs={12} md={4} key={idx}>
                    <div className={styles.productCard}>
                      <img src={item.images[0]?.original} />
                      <h3 className={styles.productName}>{item.name}</h3>
                      <p className={styles.productprgraph}>{item?.description}</p>
                      <button className="button" onClick={() => handleViewMoreClick(item.id)}>
                        View More
                        <img src="/service/arrow-right-02.svg" />
                      </button>
                    </div>
                  </Col>
                ))
              ) : (
                <p>No services available</p>
              )}
            </Row>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default OurService;
