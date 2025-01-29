'use client'
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import FooterComponent from '../component/footer/FooterComponent';
import NavbarComponent from "../component/navbar/Navbar";
import ProductSlider from '../component/ProductSlider/ProductSlider';
import './menu.css';
import { translate } from '../translations/TranslationContext';
import Link from 'next/link';

const Page = () => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') || 'en';
    setLang(storedLang);
  }, []);

  return (
    <div>
      <NavbarComponent onLanguageChange={setLang} />
  
      <div className='page_about'>
        <div className='bredcramp'>
          <h1>{translate('Menu', lang)}</h1>
          <div className="prive_bredcramp">
            <span><Link href='/' className='about_link'>{translate('Home', lang)}</Link></span> <span>&gt;</span> <span>{translate('Menu', lang)}</span>
          </div>
        </div>
      </div>

      <ProductSlider />

      <div className="section_footer">
        <FooterComponent lang={lang} />
      </div>
    </div>
  );
};

export default Page;
