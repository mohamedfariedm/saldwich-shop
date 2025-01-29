/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import FooterComponent from '../../component/footer/FooterComponent';
import NavbarComponent from "../../component/navbar/Navbar";
import { translate } from '../../translations/TranslationContext';
import Link from 'next/link';
import './clientOrder.css';
import '../../contact/contact.css'
import Aboutcomponent from '../../component/aboutSection/Aboutcomponent';
import styles from './clientOrder.module.css'; 

export default function ClientOrderPage({ id }: { id: string }) {
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(data => setOrderData(data));
    }

    const storedLang = localStorage.getItem('lang') || 'en';
    setLang(storedLang);

  }, [id]);

  const events = (e:any)=>{
    e.preventDefault();
  }


  const [lang, setLang] = useState('en');


  // if (!orderData) {
  //   return <div>Loading...</div>; 
  // }

  return (
    <div>
      <NavbarComponent onLanguageChange={setLang} />

      <div className='page_about'>
        <div className='bredcramp'>
          <h1>{translate('Order', lang)}</h1>
          <div className="prive_bredcramp">
            <span><Link href='/' className='about_link'>{translate('Home', lang)}</Link></span> <span>&gt;</span> <span><Link href='/#OurServices' className='about_link'> {translate('Our Services', lang)}</Link></span><span>&gt;</span> <span>{translate('Order', lang)}</span>
          </div>
        </div>
      </div>

      <div className='About_section'>
        <Aboutcomponent lang={lang}/>
      </div>

      <Container>
        <div className={styles.whereweare}>
          <h3>
          Where we are
          </h3>
          <ul>
            <li><img src='/service/Logomark.svg' /> </li>
            <li><img src='/service/Company1.svg' /></li>
            <li><img src='/service/Company2.svg' /></li>
            <li><img src='/service/Company3.svg' /></li>
            <li><img src='/service/Company4.svg' /></li>
          </ul>
        </div>
      </Container>




     


      <div className={styles.contactus}>
      <Container>
          <div className=''>
            <Row>
              <Col xs={12} sm={12} md={4}>
                <div className={styles.perant_section}>
                  <div className=''>
                    <h1 className={styles.title_contect}>{translate('Contact us', lang)}</h1>
                    <p className={styles.pargraph_contect}>{translate('Organic foods are typically certified by regulatory bodies to ensure they meet specific organic standards', lang)}</p>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={8}>

                <div className='form_contact background'>
                  <Form>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>{translate('Your name', lang)}</Form.Label>
                        <Form.Control type="text" placeholder={translate('', lang)} />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>{translate('Your Email', lang)}</Form.Label>
                        <Form.Control type="email" placeholder={translate('', lang)} />
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                      <Form.Label>{translate('Your Subject', lang)}</Form.Label>
                      <Form.Control placeholder={translate('', lang)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>{translate('Message', lang)}</Form.Label>
                      <Form.Control as="textarea" rows={10} placeholder={translate('', lang)} />
                    </Form.Group>

                    <Button variant="" type="submit" onClick={events}>
                      {translate('Send Message', lang)}
                    </Button>
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

      {/* <h1>Order Details for ID: {id}</h1>
      <p>Name: {orderData?.title}</p>
      <img src={orderData?.image} alt={orderData?.title} /> */}
    </div>
  );
}
