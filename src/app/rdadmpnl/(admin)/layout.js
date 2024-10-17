'use client'
import Script from "next/script";
import Header from '@/components/include/Header'
import Sidebar from '@/components/include/Sidebar'
import Footer from "@/components/include/Footer";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


export default function RootLayout({ children }) {
  return (

    <html
      lang="en"
      className="dark-style layout-navbar-fixed layout-menu-fixed layout-compact"
      dir="ltr"
      data-theme="theme-default"
      data-assets-path="/assets/"
      data-template="vertical-menu-template"
      data-style="light">
      <head>


        {/* <!-- Fonts --> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&ampdisplay=swap"
          rel="stylesheet" />

        {/* <!-- Icons --> */}
        <link rel="stylesheet" href="/assets/vendor/fonts/fontawesome.css" />
        <link rel="stylesheet" href="/assets/vendor/fonts/flag-icons.css" />



        {/* <!-- Vendors CSS --> */}
        <link rel="stylesheet" href="/assets/vendor/libs/node-waves/node-waves.css" />

        <link rel="stylesheet" href="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/typeahead-js/typeahead.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/apex-charts/apex-charts.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css" /> 

      </head>

      <body>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <SessionProvider >
              <Sidebar />
              <div className="layout-page">
                <Header />
                <div className="content-wrapper">
                  <Toaster position="top-right" /> 
                  <ProgressBar height="3px" color="#ffffff" options={{ showSpinner: false }} shallowRouting />
                  {children}
                  <Footer />
                  <div className="content-backdrop fade"></div>
                </div>
              </div>
            </SessionProvider>
          </div>
          <div className="layout-overlay layout-menu-toggle"></div>
          <div className="drag-target"></div>
        </div>
      </body>
    </html>
  );
}
