/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import Image from 'next/image'
import  './styleNav.css'
import {Container, Row, Col, Button} from 'react-bootstrap';
import Link from 'next/link';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from 'react';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { translate } from '../../translations/TranslationContext';

interface NavbarComponentProps {
  onLanguageChange: (lang: string) => void;
}


function NavbarComponent({ onLanguageChange }: NavbarComponentProps) {
  const [lang, setLang] = useState('en');
  const [activePath, setActivePath] = useState<string>('');
  useEffect(() => {
    const storedLang = localStorage.getItem('lang') || 'en';
    setLang(storedLang);
    onLanguageChange(storedLang);

    setActivePath(window.location.pathname);
  }, [onLanguageChange]);

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    onLanguageChange(newLang);
  };

  return (
    <Navbar expand="lg" className="navBar">
      <Container>
        <Navbar.Brand href="/"><Image src="/logo1.png" width={127.64} 
      height={31.456} alt="Picture of the author"/></Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="nav_bar">
            <Link href="/" className={activePath === "/" ? "active" : ""}>
              {translate('Home', lang)}
            </Link>
            <Link href="/about" className={activePath === "/about" ? "active" : ""}>
              {translate('About Us', lang)}
            </Link>
            {/* <Link href="/#OurServices" className={activePath === "/#OurServices" ? "active" : ""}>
              {translate('Our Services', lang)}
            </Link> */}
            {/* <Link href="/menu" className={activePath === "/menu" ? "active" : ""}>
              {translate('Menu', lang)}
            </Link> */}
            <Link href="/Menu.pdf" target='_blank'>
              {translate('Menu', lang)}
            </Link>
            <Link href="/app" className={activePath === "/app" ? "active" : ""}>
              {translate('App', lang)}
            </Link>
            <Link href="/contact" className={activePath === "/contact" ? "active" : ""}>
              {translate('Contact Us', lang)}
            </Link>
            <LanguageSwitcher onLanguageChange={handleLanguageChange} />
          </Nav>
          <div className="langu">
         <Button className='downloadButton' href="https://apps.apple.com/sa/app/%D8%B3%D8%A7%D9%84%D8%AF%D9%88%D8%AA%D8%B4/id1538574421?l=ar">       
            <img 
           src="/imgs/download-04.svg" 
           alt="Picture of the author"
           />
         {translate('Download App' , lang)}</Button>
       </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
