'use client'
import Script from "next/script";
import Header from '@/components/include/Header'
import Sidebar from '@/components/include/Sidebar'
import Footer from "@/components/include/Footer";
import { Toaster } from "react-hot-toast"; 
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'; 


export default function RootLayout({ children }) {
  return (
<>

    {/* <html
      lang="en"
      className="dark-style layout-navbar-fixed layout-menu-fixed layout-compact"
      dir="ltr"
      data-theme="theme-default"
      data-assets-path="/assets/"
      data-template="vertical-menu-template"
      suppressHydrationWarning
      data-style="light"> */}
      {/* <head>

 
        <link rel="stylesheet" href="/assets/vendor/fonts/fontawesome.css" />
        <link rel="stylesheet" href="/assets/vendor/fonts/flag-icons.css" />


 
        <link rel="stylesheet" href="/assets/vendor/libs/node-waves/node-waves.css" /> 
        <link rel="stylesheet" href="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/typeahead-js/typeahead.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/apex-charts/apex-charts.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css" />
        <link rel="stylesheet" href="/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css" /> 

      </head>

      <body > */}
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container"> 
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
          </div>
          <div className="layout-overlay layout-menu-toggle"></div>
          <div className="drag-target"></div>
        </div>
      {/* </body>
    </html> */}

</>
  );
}
