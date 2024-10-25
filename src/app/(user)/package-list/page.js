'use client';
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from "react"
import toast from 'react-hot-toast';
import { chk_otp, validate_string, chk_email, chk_password } from "../../../utils/common";
import { fetchApi } from "../../../utils/frondend";
import { ButtonSpinner } from "../../../components/include/Loader";
import { useAuthContext } from "../../../context/auth";
import ReCAPTCHA from "react-google-recaptcha";
import SwiperCorousel from '@/components/include/Swiper';

export default function LandingPage() {
  const { setAuthTkn, setPageLoader } = useAuthContext(); 
  const [searchLdr, setSearchLdr] = useState(false)
  const [page, setPage] = useState(1)
  const [packageList, setPackageList] = useState([])
  const getPackageList = async () => {
    if (!searchLdr) {
        setSearchLdr(true)
        const Body = JSON.stringify({
            page: page - 1, 
        })
        const response = await fetchApi("/get-package-list", Body, "GET")
        setPageLoader(false)
        if (response.statusCode == 200) {
            setSearchLdr(false)
            setPackageList(response.data.list)
            setRecordCount(response.data.total)
        } else {
            setSearchLdr(false)
            if (response.data.message == "Unauthorized" || response.data.message == "Logout") {
                setAuthTkn(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        }
    }
}

  useEffect(() => {
    getPackageList()
  }, [page])


  const test = (e) => {
    console.log(packageList)
  }
  return (
    <>
      <div data-bs-spy="scroll" className="scrollspy-example">
        {/* <!-- Hero: Start --> */}
        <section id="hero-animation">
          <div id="landingHero" className="section-py landing-hero position-relative">
            <img
              src="/assets/img/front-pages/backgrounds/hero-bg.png"
              alt="hero background"
              className="position-absolute top-0 start-50 translate-middle-x object-fit-cover w-100 h-100"
              data-speed="1" />
            <div className="container">
              <div className="hero-text-box text-center position-relative">
                <h1 className="text-primary hero-title display-6 fw-extrabold" onClick={test}>
                  Comprehensive Package List for Seamless Project Management
                </h1>
                <h2 className="hero-sub-title h6 mb-6">
                  Manage all your project dependencies effortlessly with our curated package list. Ready for production with a focus on reliability, scalability, and ease of use.
                </h2>
             
              </div>
              <div id="heroDashboardAnimation" className="hero-animation-img">
                <a href="../vertical-menu-template/app-ecommerce-dashboard.html" target="_blank">
                  <div id="heroAnimationImg" className="position-relative hero-dashboard-img">
                    <img
                      src="/assets/img/front-pages/landing-page/hero-dashboard-light.png"
                      alt="hero dashboard"
                      className="animation-img"
                      data-app-light-img="front-pages/landing-page/hero-dashboard-light.png"
                      data-app-dark-img="front-pages/landing-page/hero-dashboard-dark.png" />
                    <img
                      src="/assets/img/front-pages/landing-page/hero-elements-light.png"
                      alt="hero elements"
                      className="position-absolute hero-elements-img animation-img top-0 start-0"
                      data-app-light-img="front-pages/landing-page/hero-elements-light.png"
                      data-app-dark-img="front-pages/landing-page/hero-elements-dark.png" />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="landing-hero-blank"></div>
        </section>
        {/* <!-- Hero: End --> */}

        {/* <!-- Useful features: Start --> */}
        <section id="landingFeatures" className="section-py landing-features">
          <div className="container">
            <div className="text-center mb-4">
              <span className="badge bg-label-primary">Useful Features</span>
            </div>
            <h4 className="text-center mb-1">
              <span className="position-relative fw-extrabold z-1"
              >Everything you need 
                <img
                  src="/assets/img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1" />
              </span>
              &nbsp; to start your next project
            </h4>
            <p className="text-center mb-12">
              Not just a set of tools, the package includes ready-to-deploy conceptual application.
            </p>
            <div className='SwiperCorouselContent'>
              <SwiperCorousel packageList={packageList}/>
            </div>
          </div>
        </section>
        {/* <!-- Useful features: End --> */}

        {/* <!-- Real customers reviews: Start --> */}
        <section id="landingReviews" className="section-py bg-body landing-reviews pb-0">
          {/* <!-- What people say slider: Start --> */}
          <div className="container">
            <div className="row align-items-center gx-0 gy-4 g-lg-5 mb-5 pb-md-5">
              <div className="col-md-6 col-lg-5 col-xl-3">
                <div className="mb-4">
                  <span className="badge bg-label-primary">Real Customers Reviews</span>
                </div>
                <h4 className="mb-1">
                  <span className="position-relative fw-extrabold z-1"
                  >What people say
                    <img
                      src="/assets/img/front-pages/icons/section-title-icon.png"
                      alt="laptop charging"
                      className="section-title-img position-absolute object-fit-contain bottom-0 z-n1" />
                  </span>
                </h4>
                <p className="mb-5 mb-md-12">
                  See what our customers have to<br className="d-none d-xl-block" />
                  say about their experience.
                </p>
                <div className="landing-reviews-btns">
                  <button
                    id="reviews-previous-btn"
                    className="btn btn-label-primary reviews-btn me-4 scaleX-n1-rtl"
                    type="button">
                    <i className="ti ti-chevron-left ti-md"></i>
                  </button>
                  <button id="reviews-next-btn" className="btn btn-label-primary reviews-btn scaleX-n1-rtl" type="button">
                    <i className="ti ti-chevron-right ti-md"></i>
                  </button>
                </div>
              </div>
              <div className="col-md-6 col-lg-7 col-xl-9">
                <div className="swiper-reviews-carousel overflow-hidden">
                  <div className="swiper" id="swiper-reviews">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="card h-100">
                          <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                            <div className="mb-4">
                              <img
                                src="/assets/img/front-pages/branding/logo-1.png"
                                alt="client logo"
                                className="client-logo img-fluid" />
                            </div>
                            <p>
                              “Vuexy is hands down the most useful front end Bootstrap theme I've ever used. I can't wait
                              to use it again for my next project.”
                            </p>
                            <div className="text-warning mb-4">
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3 avatar-sm">
                                <img src="/assets/img/avatars/1.png" alt="Avatar" className="rounded-circle" />
                              </div>
                              <div>
                                <h6 className="mb-0">Cecilia Payne</h6>
                                <p className="small text-muted mb-0">CEO of Airbnb</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="card h-100">
                          <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                            <div className="mb-4">
                              <img
                                src="/assets/img/front-pages/branding/logo-2.png"
                                alt="client logo"
                                className="client-logo img-fluid" />
                            </div>
                            <p>
                              “I've never used a theme as versatile and flexible as Vuexy. It's my go to for building
                              dashboard sites on almost any project.”
                            </p>
                            <div className="text-warning mb-4">
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3 avatar-sm">
                                <img src="/assets/img/avatars/2.png" alt="Avatar" className="rounded-circle" />
                              </div>
                              <div>
                                <h6 className="mb-0">Eugenia Moore</h6>
                                <p className="small text-muted mb-0">Founder of Hubspot</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="card h-100">
                          <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                            <div className="mb-4">
                              <img
                                src="/assets/img/front-pages/branding/logo-3.png"
                                alt="client logo"
                                className="client-logo img-fluid" />
                            </div>
                            <p>
                              This template is really clean & well documented. The docs are really easy to understand and
                              it's always easy to find a screenshot from their website.
                            </p>
                            <div className="text-warning mb-4">
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3 avatar-sm">
                                <img src="/assets/img/avatars/3.png" alt="Avatar" className="rounded-circle" />
                              </div>
                              <div>
                                <h6 className="mb-0">Curtis Fletcher</h6>
                                <p className="small text-muted mb-0">Design Lead at Dribbble</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="card h-100">
                          <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                            <div className="mb-4">
                              <img
                                src="/assets/img/front-pages/branding/logo-4.png"
                                alt="client logo"
                                className="client-logo img-fluid" />
                            </div>
                            <p>
                              All the requirements for developers have been taken into consideration, so I’m able to build
                              any interface I want.
                            </p>
                            <div className="text-warning mb-4">
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star"></i>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3 avatar-sm">
                                <img src="/assets/img/avatars/4.png" alt="Avatar" className="rounded-circle" />
                              </div>
                              <div>
                                <h6 className="mb-0">Sara Smith</h6>
                                <p className="small text-muted mb-0">Founder of Continental</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="card h-100">
                          <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                            <div className="mb-4">
                              <img
                                src="/assets/img/front-pages/branding/logo-5.png"
                                alt="client logo"
                                className="client-logo img-fluid" />
                            </div>
                            <p>
                              “I've never used a theme as versatile and flexible as Vuexy. It's my go to for building
                              dashboard sites on almost any project.”
                            </p>
                            <div className="text-warning mb-4">
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3 avatar-sm">
                                <img src="/assets/img/avatars/5.png" alt="Avatar" className="rounded-circle" />
                              </div>
                              <div>
                                <h6 className="mb-0">Eugenia Moore</h6>
                                <p className="small text-muted mb-0">Founder of Hubspot</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="card h-100">
                          <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                            <div className="mb-4">
                              <img
                                src="/assets/img/front-pages/branding/logo-6.png"
                                alt="client logo"
                                className="client-logo img-fluid" />
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nemo mollitia, ad eum
                              officia numquam nostrum repellendus consequuntur!
                            </p>
                            <div className="text-warning mb-4">
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star-filled"></i>
                              <i className="ti ti-star"></i>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3 avatar-sm">
                                <img src="/assets/img/avatars/1.png" alt="Avatar" className="rounded-circle" />
                              </div>
                              <div>
                                <h6 className="mb-0">Sara Smith</h6>
                                <p className="small text-muted mb-0">Founder of Continental</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- What people say slider: End --> */}
          <hr className="m-0 mt-6 mt-md-12" />
          {/* <!-- Logo slider: Start --> */}
          <div className="container">
            <div className="swiper-logo-carousel py-8">
              <div className="swiper" id="swiper-clients-logos">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img
                      src="/assets/img/front-pages/branding/logo_1-light.png"
                      alt="client logo"
                      className="client-logo"
                      data-app-light-img="front-pages/branding/logo_1-light.png"
                      data-app-dark-img="front-pages/branding/logo_1-dark.png" />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/assets/img/front-pages/branding/logo_2-light.png"
                      alt="client logo"
                      className="client-logo"
                      data-app-light-img="front-pages/branding/logo_2-light.png"
                      data-app-dark-img="front-pages/branding/logo_2-dark.png" />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/assets/img/front-pages/branding/logo_3-light.png"
                      alt="client logo"
                      className="client-logo"
                      data-app-light-img="front-pages/branding/logo_3-light.png"
                      data-app-dark-img="front-pages/branding/logo_3-dark.png" />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/assets/img/front-pages/branding/logo_4-light.png"
                      alt="client logo"
                      className="client-logo"
                      data-app-light-img="front-pages/branding/logo_4-light.png"
                      data-app-dark-img="front-pages/branding/logo_4-dark.png" />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/assets/img/front-pages/branding/logo_5-light.png"
                      alt="client logo"
                      className="client-logo"
                      data-app-light-img="front-pages/branding/logo_5-light.png"
                      data-app-dark-img="front-pages/branding/logo_5-dark.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Logo slider: End --> */}
        </section>
        {/* <!-- Real customers reviews: End --> */}

        {/* <!-- Our great team: Start --> */}
        <section id="landingTeam" className="section-py landing-team">
          <div className="container">
            <div className="text-center mb-4">
              <span className="badge bg-label-primary">Our Great Team</span>
            </div>
            <h4 className="text-center mb-1">
              <span className="position-relative fw-extrabold z-1"
              >Supported
                <img
                  src="/assets/img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1" />
              </span>
              by Real People
            </h4>
            <p className="text-center mb-md-11 pb-0 pb-xl-12">Who is behind these great-looking interfaces?</p>
            <div className="row gy-12 mt-2">
              <div className="col-lg-3 col-sm-6">
                <div className="card mt-3 mt-lg-0 shadow-none">
                  <div
                    className="bg-label-primary border border-bottom-0 border-label-primary position-relative team-image-box">
                    <img
                      src="/assets/img/front-pages/landing-page/team-member-1.png"
                      className="position-absolute card-img-position bottom-0 start-50 scaleX-n1-rtl"
                      alt="human image" />
                  </div>
                  <div className="card-body border border-top-0 border-label-primary text-center">
                    <h5 className="card-title mb-0">Sophie Gilbert</h5>
                    <p className="text-muted mb-0">Project Manager</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card mt-3 mt-lg-0 shadow-none">
                  <div className="bg-label-info border border-bottom-0 border-label-info position-relative team-image-box">
                    <img
                      src="/assets/img/front-pages/landing-page/team-member-2.png"
                      className="position-absolute card-img-position bottom-0 start-50 scaleX-n1-rtl"
                      alt="human image" />
                  </div>
                  <div className="card-body border border-top-0 border-label-info text-center">
                    <h5 className="card-title mb-0">Paul Miles</h5>
                    <p className="text-muted mb-0">UI Designer</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card mt-3 mt-lg-0 shadow-none">
                  <div
                    className="bg-label-danger border border-bottom-0 border-label-danger position-relative team-image-box">
                    <img
                      src="/assets/img/front-pages/landing-page/team-member-3.png"
                      className="position-absolute card-img-position bottom-0 start-50 scaleX-n1-rtl"
                      alt="human image" />
                  </div>
                  <div className="card-body border border-top-0 border-label-danger text-center">
                    <h5 className="card-title mb-0">Nannie Ford</h5>
                    <p className="text-muted mb-0">Development Lead</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card mt-3 mt-lg-0 shadow-none">
                  <div
                    className="bg-label-success border border-bottom-0 border-label-success position-relative team-image-box">
                    <img
                      src="/assets/img/front-pages/landing-page/team-member-4.png"
                      className="position-absolute card-img-position bottom-0 start-50 scaleX-n1-rtl"
                      alt="human image" />
                  </div>
                  <div className="card-body border border-top-0 border-label-success text-center">
                    <h5 className="card-title mb-0">Chris Watkins</h5>
                    <p className="text-muted mb-0">Marketing Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Our great team: End --> */}

        {/* <!-- Pricing plans: Start --> */}
        <section id="landingPricing" className="section-py bg-body landing-pricing">
          <div className="container">
            <div className="text-center mb-4">
              <span className="badge bg-label-primary">Pricing Plans</span>
            </div>
            <h4 className="text-center mb-1">
              <span className="position-relative fw-extrabold z-1"
              >Tailored pricing plans
                <img
                  src="/assets/img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1" />
              </span>
              designed for you
            </h4>
            <p className="text-center pb-2 mb-7">
              All plans include 40+ advanced tools and features to boost your product.<br />Choose the best plan to fit
              your needs.
            </p>
            <div className="text-center mb-12">
              <div className="position-relative d-inline-block pt-3 pt-md-0">
                <label className="switch switch-sm switch-primary me-0">
                  <span className="switch-label fs-6 text-body me-3">Pay Monthly</span>
                  <input type="checkbox" className="switch-input price-duration-toggler" />
                  <span className="switch-toggle-slider">
                    <span className="switch-on"></span>
                    <span className="switch-off"></span>
                  </span>
                  <span className="switch-label fs-6 text-body ms-3">Pay Annual</span>
                </label>
                <div className="pricing-plans-item position-absolute d-flex">
                  <img
                    src="/assets/img/front-pages/icons/pricing-plans-arrow.png"
                    alt="pricing plans arrow"
                    className="scaleX-n1-rtl" />
                  <span className="fw-medium mt-2 ms-1"> Save 25%</span>
                </div>
              </div>
            </div>
            <div className="row g-6 pt-lg-5">
              {/* <!-- Basic Plan: Start --> */}
              <div className="col-xl-4 col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <div className="text-center">
                      <img
                        src="/assets/img/front-pages/icons/paper-airplane.png"
                        alt="paper airplane icon"
                        className="mb-8 pb-2" />
                      <h4 className="mb-0">Basic</h4>
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="price-monthly h2 text-primary fw-extrabold mb-0">$19</span>
                        <span className="price-yearly h2 text-primary fw-extrabold mb-0 d-none">$14</span>
                        <sub className="h6 text-muted mb-n1 ms-1">/mo</sub>
                      </div>
                      <div className="position-relative pt-2">
                        <div className="price-yearly text-muted price-yearly-toggle d-none">$ 168 / year</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled pricing-list">
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Timeline
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Basic search
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Live chat widget
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Email marketing
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Custom Forms
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Traffic analytics
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Basic Support
                        </h6>
                      </li>
                    </ul>
                    <div className="d-grid mt-8">
                      <a href="payment-page.html" className="btn btn-label-primary">Get Started</a>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Basic Plan: End --> */}

              {/* <!-- Favourite Plan: Start --> */}
              <div className="col-xl-4 col-lg-6">
                <div className="card border border-primary shadow-xl">
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
              </div>
              {/* <!-- Favourite Plan: End --> */}

              {/* <!-- Standard Plan: Start --> */}
              <div className="col-xl-4 col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <div className="text-center">
                      <img
                        src="/assets/img/front-pages/icons/shuttle-rocket.png"
                        alt="shuttle rocket icon"
                        className="mb-8 pb-2" />
                      <h4 className="mb-0">Enterprise</h4>
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="price-monthly h2 text-primary fw-extrabold mb-0">$49</span>
                        <span className="price-yearly h2 text-primary fw-extrabold mb-0 d-none">$37</span>
                        <sub className="h6 text-muted mb-n1 ms-1">/mo</sub>
                      </div>
                      <div className="position-relative pt-2">
                        <div className="price-yearly text-muted price-yearly-toggle d-none">$ 444 / year</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled pricing-list">
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Everything in premium
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Timeline with database
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Fuzzy search
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          A/B testing sanbox
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Custom permissions
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Social media automation
                        </h6>
                      </li>
                      <li>
                        <h6 className="mb-3">
                          <span className="badge badge-center rounded-pill bg-label-primary p-0 me-2"
                          ><i className="ti ti-check ti-14px"></i
                          ></span>
                          Sales automation tools
                        </h6>
                      </li>
                    </ul>
                    <div className="d-grid mt-8">
                      <a href="payment-page.html" className="btn btn-label-primary">Get Started</a>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Standard Plan: End --> */}
            </div>
          </div>
        </section>
        {/* <!-- Pricing plans: End --> */}

        {/* <!-- Fun facts: Start --> */}
        <section id="landingFunFacts" className="section-py landing-fun-facts">
          <div className="container">
            <div className="row gy-6">
              <div className="col-sm-6 col-lg-3">
                <div className="card border border-primary shadow-none">
                  <div className="card-body text-center">
                    <img src="/assets/img/front-pages/icons/laptop.png" alt="laptop" className="mb-4" />
                    <h3 className="mb-0">7.1k+</h3>
                    <p className="fw-medium mb-0">
                      Support Tickets<br />
                      Resolved
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card border border-success shadow-none">
                  <div className="card-body text-center">
                    <img src="/assets/img/front-pages/icons/user-success.png" alt="laptop" className="mb-4" />
                    <h3 className="mb-0">50k+</h3>
                    <p className="fw-medium mb-0">
                      Join creatives<br />
                      community
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card border border-info shadow-none">
                  <div className="card-body text-center">
                    <img src="/assets/img/front-pages/icons/diamond-info.png" alt="laptop" className="mb-4" />
                    <h3 className="mb-0">4.8/5</h3>
                    <p className="fw-medium mb-0">
                      Highly Rated<br />
                      Products
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card border border-warning shadow-none">
                  <div className="card-body text-center">
                    <img src="/assets/img/front-pages/icons/check-warning.png" alt="laptop" className="mb-4" />
                    <h3 className="mb-0">100%</h3>
                    <p className="fw-medium mb-0">
                      Money Back<br />
                      Guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Fun facts: End --> */}

        {/* <!-- FAQ: Start --> */}
        <section id="landingFAQ" className="section-py bg-body landing-faq">
          <div className="container">
            <div className="text-center mb-4">
              <span className="badge bg-label-primary">FAQ</span>
            </div>
            <h4 className="text-center mb-1">
              Frequently asked
              <span className="position-relative fw-extrabold z-1"
              >questions
                <img
                  src="/assets/img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1" />
              </span>
            </h4>
            <p className="text-center mb-12 pb-md-4">
              Browse through these FAQs to find answers to commonly asked questions.
            </p>
            <div className="row gy-12 align-items-center">
              <div className="col-lg-5">
                <div className="text-center">
                  <img
                    src="/assets/img/front-pages/landing-page/faq-boy-with-logos.png"
                    alt="faq boy with logos"
                    className="faq-image" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="accordion" id="accordionExample">
                  <div className="card accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        type="button"
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionOne"
                        aria-expanded="true"
                        aria-controls="accordionOne">
                        Do you charge for each upgrade?
                      </button>
                    </h2>

                    <div id="accordionOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Lemon drops chocolate cake gummies carrot cake chupa chups muffin topping. Sesame snaps icing
                        marzipan gummi bears macaroon dragée danish caramels powder. Bear claw dragée pastry topping
                        soufflé. Wafer gummi bears marshmallow pastry pie.
                      </div>
                    </div>
                  </div>
                  <div className="card accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        type="button"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionTwo"
                        aria-expanded="false"
                        aria-controls="accordionTwo">
                        Do I need to purchase a license for each website?
                      </button>
                    </h2>
                    <div
                      id="accordionTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Dessert ice cream donut oat cake jelly-o pie sugar plum cheesecake. Bear claw dragée oat cake
                        dragée ice cream halvah tootsie roll. Danish cake oat cake pie macaroon tart donut gummies. Jelly
                        beans candy canes carrot cake. Fruitcake chocolate chupa chups.
                      </div>
                    </div>
                  </div>
                  <div className="card accordion-item active">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        type="button"
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionThree"
                        aria-expanded="false"
                        aria-controls="accordionThree">
                        What is regular license?
                      </button>
                    </h2>
                    <div
                      id="accordionThree"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Regular license can be used for end products that do not charge users for access or service(access
                        is free and there will be no monthly subscription fee). Single regular license can be used for
                        single end product and end product can be used by you or your client. If you want to sell end
                        product to multiple clients then you will need to purchase separate license for each client. The
                        same rule applies if you want to use the same end product on multiple domains(unique setup). For
                        more info on regular license you can check official description.
                      </div>
                    </div>
                  </div>
                  <div className="card accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        type="button"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionFour"
                        aria-expanded="false"
                        aria-controls="accordionFour">
                        What is extended license?
                      </button>
                    </h2>
                    <div
                      id="accordionFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis et aliquid quaerat possimus maxime!
                        Mollitia reprehenderit neque repellat deleniti delectus architecto dolorum maxime, blanditiis
                        earum ea, incidunt quam possimus cumque.
                      </div>
                    </div>
                  </div>
                  <div className="card accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                      <button
                        type="button"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionFive"
                        aria-expanded="false"
                        aria-controls="accordionFive">
                        Which license is applicable for SASS application?
                      </button>
                    </h2>
                    <div
                      id="accordionFive"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFive"
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi molestias exercitationem ab cum
                        nemo facere voluptates veritatis quia, eveniet veniam at et repudiandae mollitia ipsam quasi
                        labore enim architecto non!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- FAQ: End --> */}

        {/* <!-- CTA: Start --> */}
        <section id="landingCTA" className="section-py landing-cta position-relative p-lg-0 pb-0">
          <img
            src="/assets/img/front-pages/backgrounds/cta-bg-light.png"
            className="position-absolute bottom-0 end-0 scaleX-n1-rtl h-100 w-100 z-n1"
            alt="cta image"
            data-app-light-img="front-pages/backgrounds/cta-bg-light.png"
            data-app-dark-img="front-pages/backgrounds/cta-bg-dark.png" />
          <div className="container">
            <div className="row align-items-center gy-12">
              <div className="col-lg-6 text-start text-sm-center text-lg-start">
                <h3 className="cta-title text-primary fw-bold mb-0">Ready to Get Started?</h3>
                <h5 className="text-body mb-8">Start your project with a 14-day free trial</h5>
                <a href="payment-page.html" className="btn btn-lg btn-primary">Get Started</a>
              </div>
              <div className="col-lg-6 pt-lg-12 text-center text-lg-end">
                <img
                  src="/assets/img/front-pages/landing-page/cta-dashboard.png"
                  alt="cta dashboard"
                  className="img-fluid mt-lg-4" />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- CTA: End --> */}

        {/* <!-- Contact Us: Start --> */}
        <section id="landingContact" className="section-py bg-body landing-contact">
          <div className="container">
            <div className="text-center mb-4">
              <span className="badge bg-label-primary">Contact US</span>
            </div>
            <h4 className="text-center mb-1">
              <span className="position-relative fw-extrabold z-1"
              >Let's work
                <img
                  src="/assets/img/front-pages/icons/section-title-icon.png"
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1" />
              </span>
              together
            </h4>
            <p className="text-center mb-12 pb-md-4">Any question or remark? just write us a message</p>
            <div className="row g-6">
              <div className="col-lg-5">
                <div className="contact-img-box position-relative border p-2 h-100">
                  <img
                    src="/assets/img/front-pages/icons/contact-border.png"
                    alt="contact border"
                    className="contact-border-img position-absolute d-none d-lg-block scaleX-n1-rtl" />
                  <img
                    src="/assets/img/front-pages/landing-page/contact-customer-service.png"
                    alt="contact customer service"
                    className="contact-img w-100 scaleX-n1-rtl" />
                  <div className="p-4 pb-2">
                    <div className="row g-4">
                      <div className="col-md-6 col-lg-12 col-xl-6">
                        <div className="d-flex align-items-center">
                          <div className="badge bg-label-primary rounded p-1_5 me-3"><i className="ti ti-mail ti-lg"></i></div>
                          <div>
                            <p className="mb-0">Email</p>
                            <h6 className="mb-0">
                              <a href="mailto:example@gmail.com" className="text-heading">example@gmail.com</a>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-12 col-xl-6">
                        <div className="d-flex align-items-center">
                          <div className="badge bg-label-success rounded p-1_5 me-3">
                            <i className="ti ti-phone-call ti-lg"></i>
                          </div>
                          <div>
                            <p className="mb-0">Phone</p>
                            <h6 className="mb-0"><a href="tel:+1234-568-963" className="text-heading">+1234 568 963</a></h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="card h-100">
                  <div className="card-body">
                    <h4 className="mb-2">Send a message</h4>
                    <p className="mb-6">
                      If you would like to discuss anything related to payment, account, licensing,<br
                        className="d-none d-lg-block" />
                      partnerships, or have pre-sales questions, you’re at the right place.
                    </p>
                    <form>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <label className="form-label" htmlFor="contact-form-fullname">Full Name</label>
                          <input type="text" className="form-control" id="contact-form-fullname" placeholder="john" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label" htmlFor="contact-form-email">Email</label>
                          <input
                            type="text"
                            id="contact-form-email"
                            className="form-control"
                            placeholder="johndoe@gmail.com" />
                        </div>
                        <div className="col-12">
                          <label className="form-label" htmlFor="contact-form-message">Message</label>
                          <textarea
                            id="contact-form-message"
                            className="form-control"
                            rows="7"
                            placeholder="Write a message"></textarea>
                        </div>
                        <div className="col-12">
                          <button type="submit" className="btn btn-primary">Send inquiry</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Contact Us: End --> */}
      </div>
    </>
  );
}
