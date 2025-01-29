'use client';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Aboutcomponent from '../component/aboutSection/Aboutcomponent';
import Testimonials from '../component/testimonials/Testimonials';
import FooterComponent from '../component/footer/FooterComponent';
import NavbarComponent from "../component/navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import HowWorkingComponent from '../component/howWorking/HowWorkingComponent';
import './AboutStyle.css';
import styles from './SliderComponent.module.css'; 
import { translate } from '../translations/TranslationContext';
import Link from 'next/link';

const Page = () => {
  const [lang, setLang] = useState('en');
  const [aboutPageData, setAboutPageData] = useState<any>({});

  useEffect(() => {
    const fetchAboutPageData = async () => {
      try {
        const storedLang = localStorage.getItem('lang') || 'en';
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/about-us`, {
          method: 'GET',
          headers: {
            'Accept-Language': storedLang,
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setAboutPageData(data); 
      } catch (error) {
        console.error('Error fetching home page data:', error);
      }
    };
  
    fetchAboutPageData();
  }, []);

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') || 'en';
    setLang(storedLang);
  }, []);

  return (
    <div>
      <NavbarComponent onLanguageChange={setLang}/>
      
      <div className='page_about' style={{
    backgroundImage: `url(${aboutPageData?.data?.sliders[0]?.original || '/imgs/image11.png'})`
  }}>
        <div className='bredcramp'>
          <h1>{aboutPageData?.data?.name}</h1>
          <div className="prive_bredcramp">
            <span><Link href='/' className='about_link'>{translate('Home', lang)}</Link></span> <span>&gt;</span><span>{aboutPageData?.data?.name}</span>
          </div>
        </div>
      </div>

      <div className='About_section'>
      <div>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6}>
            <div className="title_about">
              <h6>{aboutPageData?.data?.sections[0]?.title}</h6>
              <h1>{aboutPageData?.data?.sections[0]?.Posts[0]?.title}</h1>
              <p>{aboutPageData?.data?.sections[0]?.Posts[0]?.description}</p>

              <div className='line_section'>
              {aboutPageData.data?.sections[0]?.Posts[0]?.children.map((item: any)=>(
              <div className='frist_line' key={item.id}>
                <img src={item?.attachment[0]?.original} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
               ))}
               
              </div>


            </div>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <img src={aboutPageData?.data?.sections[0]?.Posts[0]?.attachment[0].original} />
          </Col>
        </Row>
      </Container>
    </div>
      </div>

      <div className='section_working'>
        <HowWorkingComponent lang={lang} images={aboutPageData?.data?.sections[1]}/>
      </div>

      <div className='section_Delivery'>
        <Container>
          <div className='image_background'>
            <img src='/imgs/Rectangle29454.png' alt="Background" />
          </div>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <div className='title_Delivery'>
                <p>{aboutPageData?.data?.sections[2]?.title}</p>
                <h1>{aboutPageData?.data?.sections[2]?.Posts[0]?.title}</h1>
                <p className='prgraphe_Delivery'>
                  {aboutPageData?.data?.sections[2]?.Posts[0]?.description}
                </p>
              </div>
              <div className='grid_rows'>
                <Row>
                  {aboutPageData?.data?.sections[2]?.Posts[0]?.children.map((item:any)=>(
                     <Col xs={12} sm={12} md={6} key={item.id}>
                     <div className='box_Delivery'>
                       <div className='flexed_Delivery'>
                         <img src={item.attachment[0]?.original} alt="Fresh Product" />
                         <div className='child_title'>
                           <h3>{item.title}</h3>
                           <p>{item.description}</p>
                         </div>
                       </div>
                     </div>
                   </Col>
                  ))}
                </Row>
              </div>
            </Col>
            <Col>
              <div className='text-center Delivery'>
                <img src={aboutPageData?.data?.sections[2]?.Posts[0]?.attachment[0]?.original} alt="Delivery" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="">
        <Testimonials lang={lang}/>
      </div>
      
      <div className="section_footer">
        <FooterComponent lang={lang}/>
      </div>
    </div>
  );
};

export default Page;
