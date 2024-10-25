'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination'; 

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function App({packageList}) {
  const GetList = (str) => {
    let list = []
    try {
      list = JSON.parse(str)
    } catch (error) {
      list = []
    }
    return list
  }
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >


        {packageList.map((item, index) => (
          <SwiperSlide key={index}>
            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
           
                <div className="card border border-primary shadow-xl swiper-package-card">
                  <div className="card-header">
                    <div className="text-center">
                      <img src="/assets/img/front-pages/icons/plane.png" alt="plane icon" className="mb-8 pb-2" />
                      <h4 className="mb-0">Team</h4>
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="price-monthly h2 text-primary fw-extrabold mb-0">$29</span>
                        <span className="price-yearly h2 text-primary fw-extrabold mb-0 d-none">$22</span>
                        <sub className="h6 text-muted mb-n1 ms-1">/mo</sub>
                      </div>
                      <div className="position-relative pt-2">
                        <div className="price-yearly text-muted price-yearly-toggle d-none">$ 264 / year</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled pricing-list">
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Everything in basic
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Timeline with database
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Advanced search
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Marketing automation
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Advanced chatbot
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Campaign management
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Collaboration tools
                        </h6>
                      </li>
                    </ul>
                    <div className="d-grid mt-8">
                      <a href="payment-page.html" className="btn btn-primary">Get Started</a>
                    </div>
                  </div>
                </div> 
          </SwiperSlide>
        ))}
        <SwiperSlide>
         
        </SwiperSlide>
        {/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
