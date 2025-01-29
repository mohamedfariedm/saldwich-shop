import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AboutStyle.css';
import { translate } from '../../translations/TranslationContext';

const Aboutcomponent = ({ lang }) => {
  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6}>
            <div className="title_about">
              <h6>{translate('About Us', lang)}</h6>
              <h1>{translate('The Fastest Delivery To Your Favorite Food', lang)}</h1>
              <p>{translate('At Saldwich, we provide the freshest and healthiest food options in KSA. Join us in promoting a healthier lifestyle.', lang)}</p>

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
            <img src='/imgs/image7.png' />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Aboutcomponent;
