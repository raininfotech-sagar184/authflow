'use client'
import Header from '@/components/include/Header'
import Footer from "@/components/include/Footer";
import { Toaster } from "react-hot-toast";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'; 
import { AuthContextProvider } from '@/context/auth'; 
import { PreLoader } from '@/components/include/PageLoader';


export default function RootLayout({ children }) {
  return (
    <>
      <html
        lang="en"
        className="dark-style layout-navbar-fixed layout-wide"
        dir="ltr"
        data-theme="theme-default"
        data-assets-path="/assets/"
        data-template="front-pages"
        data-style="light">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

          <title>Landing Page - Front Pages | Vuexy - Bootstrap Admin Template</title>

          <meta name="description" content="" />

          {/* <!-- Favicon --> */}
          <link rel="icon" type="image/x-icon" href="/assets/img/favicon/favicon.ico" />

          {/* <!-- Fonts --> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&ampdisplay=swap"
            rel="stylesheet" />

          <link rel="stylesheet" href="/assets/vendor/fonts/tabler-icons.css" />

          {/* <!-- Core CSS --> */}

          <link rel="stylesheet" href="/assets/vendor/css/rtl/core.css" className="template-customizer-core-css" />
          <link rel="stylesheet" href="/assets/vendor/css/rtl/theme-default.css" className="template-customizer-theme-css" />
          <link rel="stylesheet" href="/assets/vendor/css/rtl/core-dark.css" />
          <link rel="stylesheet" href="/assets/vendor/css/rtl/theme-default-dark.css" />

          <link rel="stylesheet" href="/assets/css/demo.css" />

          <link rel="stylesheet" href="/assets/vendor/css/pages/front-page.css" />
          {/* <!-- Vendors CSS --> */}
          <link rel="stylesheet" href="/assets/vendor/libs/node-waves/node-waves.css" />

          <link rel="stylesheet" href="/assets/vendor/libs/nouislider/nouislider.css" />
          <link rel="stylesheet" href="/assets/vendor/libs/swiper/swiper.css" />

          {/* <!-- Page CSS --> */}

          <link rel="stylesheet" href="/assets/vendor/css/pages/front-page-landing.css" />

          {/* <!-- Helpers --> */}
          <script src="/assets/vendor/js/helpers.js"></script>
          {/* <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section --> */}

          {/* <!--? Template customizer: To hide customizer set displayCustomizer value false in config.js.  --> */}
          <script src="/assets/vendor/js/template-customizer.js"></script>

          {/* <!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  --> */}
          <script src="/assets/js/front-config.js"></script>
        </head>

        <body>

          <AuthContextProvider>
            <Header />
            <Toaster position="top-right" />
            <ProgressBar height="3px" color="#ffffff" options={{ showSpinner: false }} shallowRouting />
            <PreLoader />
            {children}
            <Footer />
          </AuthContextProvider>

        </body>
      </html>
    </>
  );
}
