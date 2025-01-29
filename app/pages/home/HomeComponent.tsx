/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import "./styleHome.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import "./styleHome.css";
import SliderComponent from "../../component/slider/SliderComponent";
import Aboutcomponent from "../../component/aboutSection/Aboutcomponent";
import Testimonials from "../../component/testimonials/Testimonials";
import FooterComponent from "../../component/footer/FooterComponent";
import NavbarComponent from "../../component/navbar/Navbar";
import { translate } from "../../translations/TranslationContext";
import { useState, useEffect } from "react";
import MappingComponent from "@/app/component/mapping/MappingComponent";
import OurService from "@/app/component/ourService/OurService";
import { useSettings } from "../../service/SettingsContext";

const HomeComponent = () => {
  const [lang, setLang] = useState("en");
  const [homePageData, setHomePageData] = useState<any>({});
  const settings = useSettings();
  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const storedLang = localStorage.getItem("lang") || "en";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pages/home-page`,
          {
            method: "GET",
            headers: {
              "Accept-Language": storedLang
            }
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setHomePageData(data);
      } catch (error) {
        console.error("Error fetching home page data:", error);
      }
    };

    fetchHomePageData();
  }, []);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "en";
    setLang(storedLang);
  }, []);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "en";
    setLang(storedLang);
  }, []);

  if (!homePageData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="HomeNave">
        <NavbarComponent onLanguageChange={setLang} />
      </div>
      <div className="section_home">
        <main className="main">
          <div className="hero">
            <video className="video" loop muted autoPlay playsInline>
              <source src="/video/Whatsapp.mp4" type="video/mp4" />
            </video>

            <div className="overlay">
              <div className="Enjoying">
                <span>
                  {homePageData.data?.title?.split(" ").slice(0, 1).join("")}
                </span>
                {/* <img src="/imgs/FZFFBmXoAA3sjs 1.png" />  */}
              </div>
              <div className="Enjoying">
                {/* <img src="/imgs/FZFFBmXoAA3sjs 1.png" />  */}
                <span>
                  {homePageData.data?.title?.split(" ").slice(1, 2).join("")}
                </span>
              </div>
              <p className="lift_time">
                {homePageData.data?.title?.split(" ").slice(2, 10).join(" ")}
              </p>
              <p className="bragraph">{homePageData.data?.description}</p>
              <div className="text_center">
                <Button
                  className="DownloadNow"
                  href="https://apps.apple.com/sa/app/%D8%B3%D8%A7%D9%84%D8%AF%D9%88%D8%AA%D8%B4/id1538574421?l=ar"
                >
                  <img
                    src="/imgs/download-05.svg"
                    alt="Picture of the author"
                    style={{ width: "auto", height: "auto" }}
                  />
                  {translate("Download now", lang)}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
      {homePageData.data?.sections[0].active == "1" && (
        <div className="second_section">
          <Container>
            <div className="second_aline">
              <Row>
                <Col className="aline_flxed">
                  <div className="data_text">
                    <h1>{homePageData.data?.sections[0].Posts[0]?.title}</h1>
                    <p>
                      {homePageData.data?.sections[0].Posts[0]?.description}
                    </p>
                    <div className="fixed_section">
                      {/* <a href={homePageData.data?.sections[0].Posts[0].additional.ios}><img src='/imgs/Apple.svg' /></a> */}
                      <a href="https://apps.apple.com/sa/app/%D8%B3%D8%A7%D9%84%D8%AF%D9%88%D8%AA%D8%B4/id1538574421?l=ar">
                        <img src="/imgs/Apple.svg" />
                      </a>
                      <a href="https://play.google.com/store/apps/details?id=com.ruut.ruutapp.saldwich&hl=en">
                        <img src="/imgs/Google.svg" />
                      </a>

                      {/* <a href={homePageData.data?.sections[0].Posts[0].additional.indriod}><img src='/imgs/Google.svg' /></a> */}
                    </div>
                  </div>
                </Col>
                <Col>
                  <img
                    className="image_mobile"
                    src={
                      homePageData.data?.sections[0].Posts[0].attachment[0]
                        ?.original
                    }
                  />
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      )}
      {homePageData.data?.sections[1].active == "1" && (
        <div className="three_section">
          <div className="images">
            <img src="/imgs/Frame_52.png" />
            <OurService service={homePageData.data?.sections[1]} />
            <img src="/imgs/Union.png" />
          </div>

          {homePageData?.data?.category?.map((item: any) => (
            <div key={item.id}>
              <div className="inner_section">
                <Container>
                  <Row>
                    <Col>
                      <div className="text_line">
                        <p>{item.name}</p>
                        <h1>{item.description}</h1>
                      </div>
                    </Col>
                    <Col>
                      <img className="posishion" src="/imgs/Vector.png" />
                    </Col>
                  </Row>
                </Container>

                <div className="section_slider">
                  <SliderComponent
                    images={item.products.map((item: any) => item)}
                    original={undefined}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <div className='three_section secoond'>
        <div className='images'>
        <img src='/imgs/Union1.png' className="seccond_img" />
        </div>
        <div className="inner_section">
          <Container>
            <Row>
              <Col>
              <div className='text_line'>
               <p>{translate('Salads', lang)}</p>
               <h1>{translate('The Fastes Delivery To Your Favorite Food' , lang)}</h1>
               </div>
              </Col>
              <Col>
                <img className='posishion' src="/imgs/Vector.png" />
              </Col>
            </Row>

            
            </Container>

            <div className='section_slider'>
            <SliderComponent images={undefined} original={undefined} />
            </div>
            <img src='/imgs/Union2.png'/>

        </div>

      </div> */}

      {/* <div className='three_section'>
        <div className='images'>

        </div>
        <div className="inner_section">
          <Container>
            <Row>
              <Col>
              <div className='text_line'>
               <p>{translate('Salads' , lang)}</p>
               <h1>{translate('The Fastes Delivery To Your Favorite Food' , lang)}</h1>
               </div>
              </Col>
              <Col>
                <img className='posishion' src="/imgs/Vector.png" />
              </Col>
            </Row>

            
            </Container>

            <div className='section_slider'>
            <SliderComponent />
            </div>
        </div>
      </div> */}

{homePageData.data?.sections[2].active == '1' &&(

      <div className="About_section">
        {/* <Aboutcomponent lang={lang} /> */}
        <div>
          <Container>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <div className="title_about">
                  <h6>{homePageData.data?.sections[2]?.title}</h6>
                  <h1>{homePageData.data?.sections[2]?.Posts[0]?.title}</h1>
                  <p>{homePageData.data?.sections[2]?.Posts[0]?.description}</p>

                  <div className="line_section">
                    {homePageData.data?.sections[2]?.Posts[0]?.children.map(
                      (item: any) => (
                        <div className="frist_line" key={item.id}>
                          <img src={item.attachment[0]?.original} />
                          <div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      )
                    )}
                    {/* <div className='frist_line'>
                <img src='/imgs/Frame_420.svg' />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div> */}
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <img
                  src={
                    homePageData.data?.sections[2]?.Posts[0]?.attachment[0]
                      ?.original
                  }
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
 )
}
      <div className="">
        <Testimonials lang={lang} />
      </div>

      <MappingComponent />

      <div className="section_footer">
        <FooterComponent lang={lang} />
      </div>
    </div>
  );
};

export default HomeComponent;
