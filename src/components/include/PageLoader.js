
'use client'
import { useAuthContext } from "@/context/auth";
export default function PageLoader(props) {
  const { pageLoader } = useAuthContext()
  return (
    <>
      <div className='pre-loader' style={{ display: (pageLoader == false ? 'none' : '') }}>
        <div className="loader" ></div>
      </div>

      <div id="main-wrapper" className={pageLoader == false ? 'show' : ''}>
        {props.children}
      </div>
    </>
  )
}


export const PreLoaderDesign = () => {
  return (
    <>

      <div className="page-loader">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 66" height="100px" width="100px" className="page-loader-spinner">
          <circle stroke="url(#gradient)" r="20" cy="33" cx="33" stroke-width="1" fill="transparent" className="spinner-path"></circle>
          <linearGradient id="gradient">
            <stop stop-opacity="1" stop-color="#7367f0" offset="0%"></stop>
            <stop stop-opacity="0" stop-color="#af3dff" offset="100%"></stop>
          </linearGradient>

        </svg>
      </div>
    </>

  )
}



export function PreLoader() {
  const { pageLoader } = useAuthContext()
  return (
    pageLoader ? <div className="page-loader">
      <div className="spinner-container">
        <div className="spinner">
          <PreLoaderDesign />
        </div>
      </div>

    </div > : ""
  )
}
