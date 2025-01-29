/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import FooterComponent from '../component/footer/FooterComponent';
import NavbarComponent from "../component/navbar/Navbar";
import './contact.css';
import { translate } from '../translations/TranslationContext';
import Link from 'next/link';

const Page = () => {

  const [Setting, setSetting] = useState({});
  const [Countact, setCountact] = useState({});
  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [lang, setLang] = useState('en');


  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const storedLang = localStorage.getItem('lang') || 'en';
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting`, {
          method: 'GET',
          headers: {
            'Accept-Language': storedLang,
          }
        });
        const responseCountact = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/4`, {
          method: 'GET',
          headers: {
            'Accept-Language': storedLang,
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        const dataContact = await responseCountact.json();

        setSetting(data); 
        setCountact(dataContact); 
      } catch (error) {
        console.error('Error fetching home page data:', error);
      }
    };
  
    fetchSetting();
  }, []);


  useEffect(() => {
    const storedLang = localStorage.getItem('lang') || 'en';
    setLang(storedLang);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };


  const validateForm = () => {
    let formErrors = {};
    if (!formData.full_name) formErrors.full_name = translate('Name is required', lang);
    if (!formData.email) formErrors.email = translate('Email is required', lang);
    if (!formData.phone) formErrors.phone = translate('Phone is required', lang);
    if (!formData.subject) formErrors.subject = translate('Subject is required', lang);
    if (!formData.message) formErrors.message = translate('Message is required', lang);
    return formErrors;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage(translate('Message sent successfully', lang));
        setFormData({
          message:'',
          full_name: '',
          email: '',
          subject: '',
          phone: '',
        });
        setErrors({});
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <NavbarComponent onLanguageChange={setLang} />

      <div className='page_about'  style={{
    backgroundImage: `url(${Countact?.data?.sliders[0]?.original || '/imgs/image11.png'})`
  }}>
        <div className='bredcramp'>
          <h1>{Countact?.data?.title}</h1>
          <div className="prive_bredcramp">
            <span><Link href='/' className='about_link'>{translate('Home', lang)}</Link></span> <span>&gt;</span> <span>{Countact?.data?.name}</span>
          </div>
        </div>
      </div>

      <div className='contact'>
        <h1 className='title_intro'>{translate('Get In Touch', lang)}</h1>
        <p>{translate('Organic foods are typically certified by regulatory bodies to ensure they meet specific organic standards.', lang)}</p>

        <Container>
          <div className='background'>
            <Row>
              <Col xs={12} sm={12} md={4}>
                <div className='information_contanct'>
                  <div className='text_contatc'>
                    <h1>{translate('Contact Information', lang)}</h1>
                    {/* <p>{translate('Organic foods are typically certified by regulatory bodies to ensure they meet', lang)}</p> */}
                  </div>

                  <div className='contant_tel'>
                    <div className='display'>
                      <img src='/imgs/call.svg' /><span>{Setting?.data?.setting?.company_information?.phone}</span>
                    </div>
                    <div className='display'>
                      <img src='/imgs/mail-01.svg' /><span>{Setting?.data?.setting?.company_information?.email}</span>
                    </div>
                    <div className='display'>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${Setting?.data?.setting?.company_information?.Latitude},${Setting?.data?.setting?.company_information?.longitude}`} target="_blank"> <img src='/imgs/location-06.svg' /><span>{Setting?.data?.setting?.company_information?.name}</span></a>
                    </div>
                  </div>

                  <div className='social_contact'>
                    <h1>{translate('Follow Social Media', lang)}</h1>
                    <div className='icon_social'>
                      <ul>
                      <li><a href={Setting?.data?.setting.social?.linked_in}> <img src='/imgs/Frame251.svg' alt="Social 4" /></a></li>
                      <li><a href={Setting?.data?.setting.social?.snabchat}> <img src='/imgs/Frame250.svg' alt="Social 4" /></a></li>
                      <li><a href={Setting?.data?.setting.social?.facebook}> <img src='/imgs/Frame_22.svg' alt="Social 1" /></a></li>
                      <li><a href={Setting?.data?.setting.social?.tiktok}> <img src='/imgs/Frame_23.svg' alt="Social 2" /></a> </li>
                      <li><a href={Setting?.data?.setting.social?.twetter}> <img src='/imgs/Frame_24.svg' alt="Social 3" /></a></li>
                      <li><a href={Setting?.data?.setting.social?.instgram}> <img src='/imgs/Frame_25.svg' alt="Social 4" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={8}>

                <div className='form_contact'>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Label>{translate('Your name', lang)}</Form.Label>
                        <Form.Control 
                          type="text"
                          id="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          placeholder={translate('Enter your name', lang)}
                          className="form-control" 
                        />
                        {errors.full_name && <p className="text-danger">{errors.full_name}</p>}
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>{translate('Your Email', lang)}</Form.Label>
                        <Form.Control  
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={translate('Enter your email', lang)}
                          className="form-control" 
                        />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group className="mb-3" controlId="phone" as={Col}>
                        <Form.Label>{translate('Your Phone', lang)}</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={translate('Enter your phone number', lang)} 
                        />
                        {errors.phone && <p className="text-danger">{errors.phone}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" as={Col}>
                        <Form.Label>{translate('Your Subject', lang)}</Form.Label>
                        <Form.Control 
                          type="text"
                          id="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={translate('Enter subject', lang)}
                          className="form-control" 
                        />
                        {errors.subject && <p className="text-danger">{errors.subject}</p>}
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="message">
                      <Form.Label>{translate('Message', lang)}</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={10}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={translate('Enter your message', lang)} 
                      />
                      {errors.message && <p className="text-danger">{errors.message}</p>}
                    </Form.Group>

                    <Button variant="" type="submit">
                      {translate('Send Message', lang)}
                    </Button>
                    {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      <div className="section_footer">
        <FooterComponent lang={lang} />
      </div>
    </div>
  );
};

export default Page;
