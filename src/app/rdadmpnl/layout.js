import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "@/context/auth"; 
import "./globals.css"; // Assuming global CSS

export const metadata = {
  title: "Vuexy - Bootstrap Admin Template",
  description: "Your description here",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="dark-style layout-wide customizer-hide"
      dir="ltr"
      data-theme="theme-default"
      data-assets-path="/assets/"
      data-template="vertical-menu-template"
      data-style="light"
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"
        />
        <link rel="icon" type="image/x-icon" href="/assets/image/favicon/favicon.ico" />
        <link rel="stylesheet" href="/assets/vendor/fonts/tabler-icons.css" />

        {/* Fonts */}
        <link rel="stylesheet" href="/assets/vendor/fonts/fontawesome.css" />
        <link rel="stylesheet" href="/assets/vendor/fonts/flag-icons.css" /> 
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />

        {/* FontAwesome */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />

        {/* Core CSS */}
        <link rel="stylesheet" href="/assets/css/demo.css" />
        <link rel="stylesheet" href="/assets/vendor/css/pages/page-auth.css" />
        <link rel="stylesheet" href="/assets/vendor/css/rtl/core.css" className="template-customizer-core-css" />
        <link rel="stylesheet" href="/assets/vendor/css/rtl/theme-default.css" className="template-customizer-theme-css" />

        {/* Page CSS */}
        <link rel="stylesheet" href="/assets/vendor/css/pages/page-auth.css" />
        <link rel="stylesheet" href="/assets/vendor/css/rtl/core-dark.css" />
        <link rel="stylesheet" href="/assets/vendor/css/rtl/theme-default-dark.css" />
      </head>

      <body suppressHydrationWarning>
        <Toaster position="top-right" />
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
