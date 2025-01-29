/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import Slider from 'react-slick';
import styles from './SliderComponent.module.css'; 

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} ${styles.arrow} ${styles.nextArrow}`} style={{ ...style }} onClick={onClick}>
      <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} ${styles.arrow} ${styles.prevArrow}`} style={{ ...style }} onClick={onClick}>
      <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
    </div>
  );
};

interface SliderComponentProps {
  images: any;  // قبول مصفوفة الصور كـ prop
  original:any
}

const SliderComponent: React.FC<SliderComponentProps> = ({ images }) => {
  // console.log(images)
  var settings = {
    className: "center",
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          className: "center",
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          className: "center",
          centerMode: true,
        },
      },
    ],
  };

  return (
    <div className={styles.sliderContainer}>
      <div className='Home_slider'>
        <Slider {...settings}>
        {images?.map((image: any,index:any) => (
            <div className={styles.productCard} key={index}>
              <img src={image?.image[0]?.original} alt={`slide ${index}`} />
              <p className={styles.productName}>{image?.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default SliderComponent;
