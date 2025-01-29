'use client';

import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from './SliderComponent.module.css'; 



const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} ${styles.arrow} ${styles.nextArrow}`} style={{ ...style }} onClick={onClick}>
      <div className='sliders'>
      <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
      </div>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} ${styles.arrow} ${styles.prevArrow}`} style={{ ...style }} onClick={onClick}>
      <div className='sliders'>
      <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
      </div>
    </div>
  );
};

const ProductSlider = () => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]); 
  const [selectedNameIndex, setSelectedNameIndex] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const nameSliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedLang = localStorage.getItem('lang') || 'en';
  
        // Fetch category
        const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Category?show_in_homepage=${storedLang}`, {
          method: 'GET',
          headers: {
            'Accept-Language': storedLang,
          },
        });
  
        if (!categoryResponse.ok) {
          throw new Error('Network response was not ok for category');
        }
  
        const categoryData = await categoryResponse.json();
        setCategory(categoryData.data || []); 
        if (categoryData.data.length > 0) {
          fetchProductByCategoryId(categoryData.data[0].id);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const fetchProductByCategoryId = async (categoryId) => {
    try {
      const storedLang = localStorage.getItem('lang') || 'en';
  
      const productResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Product?category_id=${categoryId}`, {
        method: 'GET',
        headers: {
          'Accept-Language': storedLang,
        },
      });
  
      if (!productResponse.ok) {
        throw new Error('Network response was not ok for product');
      }
  
      const productData = await productResponse.json();
      setProducts(productData.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const handleNameClick = (index, categoryId) => {
    setSelectedNameIndex(index);
    fetchProductByCategoryId(categoryId); 

    // if (nameSliderRef.current) {
    //   nameSliderRef.current.slickGoTo(currentLanguage === 'ar' ? category.length - index - 1 : index);
    // }
  };

  const keenSliderOptions = currentLanguage === 'en'
    ? {
        slides: {
          perView: 8,
          spacing: 15,
        },
        breakpoints: {
          '(max-width: 768px)': {
            slides: {
              perView: 2,
            },
          },
        },
      }
    : {
        loop: true,
        rtl: true,
        slides: {
          perView: 2,
          spacing: 10,
        },
      };

  const imageSliderSettings = {
    dots: false,
    className: "center",
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>

      {/* Keen Slider for Name Selection */}
      <div className={styles.name_text}>
        <div ref={nameSliderRef} className="keen-slider">
          {category.map((name, index) => (
            <div
              key={name.id}
              className={`keen-slider__slide ${styles.nameButton} ${index === selectedNameIndex ? styles.selectedName : ''}`}
              onClick={() => handleNameClick(index, name.id)}
            >
              {name.name}
            </div>
          ))}
        </div>
      </div>

      {/* Image Slider */}
      <div className={styles.sliderContainer}>
        <Slider {...imageSliderSettings}>
          {products.map((imageObj, idx) => (
            <div key={idx} className={styles.productCard}>
              <img src={imageObj.image[0]?.original} alt={`Image ${idx}`} />
              <p className={styles.productName}>{imageObj.name}</p>
            </div>
          ))}
        </Slider>
      </div>

    </div>
  );
};

export default ProductSlider;
