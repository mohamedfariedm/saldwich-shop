/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import React,{useState,useEffect} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { translate } from '../../translations/TranslationContext';
import { useSettings } from '../../service/SettingsContext';

import './Testimonials.css'
const Testimonials = ({ lang }) => {
  const [ClientReview, setReview] = useState({});
  const SettingsReviews = useSettings();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const storedLang = localStorage.getItem('lang') || 'en';
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ClientReview`, {
          method: 'GET',
          headers: {
            'Accept-Language': storedLang,
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setReview(data); 
      } catch (error) {
        console.error('Error fetching home page data:', error);
      }
    };
  
    fetchReview();
  }, []);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            }
          ]
      };

      const settingsRtl = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        rtl:true,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            }
          ]
      };

      const splitArray = (array) => {
        const length = array.length;
        const mid = Math.ceil(length / 2); // يتم تقسيم النصف الأول والنصف الثاني بشكل متساوي أو قريب إلى ذلك
      
        const firstHalf = array.slice(0, mid); // النصف الأول
        const secondHalf = array.slice(mid); // النصف الثاني
      
        return { firstHalf, secondHalf };
      };

      
      const { firstHalf, secondHalf } = splitArray(ClientReview.data || []); // تأكد من وجود البيانات

      return (
        
        <>
        {SettingsReviews?.data?.setting?.client_review === true && (

          <div className='testimonials_section'><div className='title'>
              <p>{translate('Testimonials', lang)}</p>
              <h1>{translate('Our Customer Feedbacks', lang)}</h1>
            </div><Slider {...settings}>
                {firstHalf.map((item) => (
                  <div className="sliders_testimonials" key={item.id}>
                    <img src="/sldier/quote-up.png" />
                    <div className="text_testimonials">
                      <p>{item?.text}</p>
                    </div>
                    <div className="flexed_testimonials">
                      <img src={item?.image[0]?.original} className="testimonials_img" />
                      <div className="title_personal">
                        <h2>{item?.name}</h2>
                        <p>{item?.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider><Slider {...settingsRtl}>
                {secondHalf.length > 0 ? (
                  secondHalf.map((item) => (
                    <div className="sliders_testimonials" key={item.id}>
                      <img src="/sldier/quote-up.png" />
                      <div className="text_testimonials">
                        <p>{item?.text}</p>
                      </div>
                      <div className="flexed_testimonials">
                        <img src={item?.image[0]?.original} className="testimonials_img" />
                        <div className="title_personal">
                          <h2>{item?.name}</h2>
                          <p>{item?.position}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="sliders_testimonials">
                    <img src="/sldier/quote-up.png" />
                    <div className="text_testimonials">
                      <p>
                        {translate(
                          'Lorem ipsum dolor sit amet consectetur. Augue semper commodo risus hac tellus. Pellentesque laoreet tristique fusce egestas dolor sit bibendum. Sed arcu a risus eget suspendisse nam non id sit.',
                          lang
                        )}
                      </p>
                    </div>
                    <div className="flexed_testimonials">
                      <img src="/sldier/Ellipse 8.png" />
                      <div className="title_personal">
                        <h2>{translate('Osama Zafar', lang)}</h2>
                        <p>{translate('Product Designer', lang)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </Slider></div>
          )}
        </>
      );
}

export default Testimonials
