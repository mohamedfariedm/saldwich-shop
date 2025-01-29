/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Working.css';
import { translate } from '../../translations/TranslationContext';

const HowWorkingComponent = ({ lang ,images}) => {
  return (
    <div>
      <div className='title_how'>
        <p>{images?.title}</p>
        <h1>{images?.title}</h1>
        <Container>
          <Row>
            {images?.Posts.map((item)=> (
            <Col xs={6} sm={6} md={3} key={item?.id}>
            <div className='grid_working'>
              <img src={item?.attachment[0]?.original} alt="Working Step 1" />
              <h2>{item?.title}</h2>
              <p>{item?.description}</p>
            </div>
            </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HowWorkingComponent;
