/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import FooterComponent from '../component/footer/FooterComponent';
import NavbarComponent from "../component/navbar/Navbar";
import { translate } from '../translations/TranslationContext';
import Link from 'next/link';
import './clientOrder.css';
import '../contact/contact.css';
import Aboutcomponent from '../component/aboutSection/Aboutcomponent';
import styles from './clientOrder.module.css'; 

const PageContent = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search'); 
  
  const [orderData, setOrderData] = useState({});
  const [lang, setLang] = useState('en');

  useEffect(() => {
    if (searchValue) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/Service/${searchValue}`)
        .then(response => response.json())
        .then(data => setOrderData(data))
        .catch(error => console.error('Error fetching data:', error)); // Optional error handling
    }

    const storedLang = localStorage.getItem('lang') || 'en';
    setLang(storedLang);

  }, [searchValue]); // Changed id to searchValue

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service_id: parseInt(searchValue)
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  
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
          service_id: parseInt(searchValue)
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

      <div className='page_about'>
        <div className='bredcramp'>
          <h1>{orderData?.data?.name?.en}</h1>
          <div className="prive_bredcramp">
            <span><Link href='/' className='about_link'>{translate('Home', lang)}</Link></span> <span>&gt;</span> <span><Link href='/#OurServices' className='about_link'> {translate('Our Services', lang)}</Link></span><span>&gt;</span> <span>{orderData?.data?.name?.en}</span>
          </div>
        </div>
      </div>

      <div className='About_section'>
      <div>
      <Container>
      {orderData?.data?.posts?.length > 0 ? (
        orderData.data.posts.map((item) => (
          <Row key={item.id}>
          <Col xs={12} sm={12} md={6}>
            <div className="title_about">
              <h6>{translate('About Us', lang)}</h6>
              <h1>{item?.title?.en?.en}</h1>
              <p>{item?.description?.en?.en}</p>

              <div className='line_section'>
                <div className='frist_line'>
                  <img src='/imgs/Frame_42.svg' />
                  <div>
                    <h3>{translate('Sustainable Sourcing', lang)}</h3>
                    <p>{translate('Locally sourced, eco-friendly ingredients for the freshest produce.', lang)}</p>
                  </div>
                </div>
                <div className='frist_line'>
                  <img src='/imgs/Frame_420.svg' />
                  <div>
                    <h3>{translate('Sustainable Sourcing', lang)}</h3>
                    <p>{translate('Locally sourced, eco-friendly ingredients for the freshest produce.', lang)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <img src={item.attachment[0]?.original} />
          </Col>
        </Row>
         ))
        ) : (
          <p></p>
        )}
      </Container>
    </div>

      </div>

      <Container>
        <div className={styles.whereweare}>
          <h3>Where we are</h3>
          <ul>
            {orderData.data?.brands.map((itmes)=>(
              <li key={itmes.id}><img src={itmes?.image.original} alt='Logo Mark' /></li>
            ))}
          </ul>
        </div>
      </Container>

      <div className={styles.contactus}>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={4}>
              <div className={styles.perant_section}>
                <h1 className={styles.title_contect}>{translate('Contact us', lang)}</h1>
                <p className={styles.pargraph_contect}>
                  {translate('Organic foods are typically certified by regulatory bodies to ensure they meet specific organic standards', lang)}
                </p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <div className='form_contact background'>
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
                    <input type="number" value={searchValue} readOnly hidden />
                    <Button variant="" type="submit">
                      {translate('Send Message', lang)}
                    </Button>
                    {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
                  </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section_footer">
        <FooterComponent lang={lang} />
      </div>
    </div>
  ); 
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
