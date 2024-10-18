'use client'
import { SessionProvider, signOut, useSession } from "next-auth/react" 
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

 
export default function Header() {
  const [dropShow, setDropShow] = useState(false) 
  const { data: session } = useSession();
  const [loader,setLoader] = useState(false)
  const logout = async () => {
    setLoader(true)
    const data = await signOut({ redirect: true, callbackUrl: '/' + process.env.ADMFLDR }) 
  }
  function toggleMenuClass() {
    const htmlTag = document.documentElement;  
      if (!htmlTag.classList.contains('layout-menu-expanded')) {
        htmlTag.classList.add('layout-menu-expanded');
      } 
    }
  return (
    <>
   

    
    <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar">
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <span className="nav-item nav-link px-0 me-xl-4 cursor-pointer"  onClick={toggleMenuClass}>
            <i className="ti ti-menu-2 ti-md"></i>
          </span>
        </div>

        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
          {/* <!-- Search --> */}
          <div className="navbar-nav align-items-center">
            <div className="nav-item navbar-search-wrapper mb-0">
              <span className="nav-item nav-link search-toggler d-flex align-items-center px-0"  >
                <i className="ti ti-search ti-md me-2 me-lg-4 ti-lg"></i>
                <span className="d-none d-md-inline-block text-muted fw-normal">Search (Ctrl+/)</span>
              </span>
            </div>
          </div>
          {/* <!-- /Search --> */}

          <ul className="navbar-nav flex-row align-items-center ms-auto"> 
            {/* <!-- User --> */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <span
                className={`nav-link dropdown-toggle hide-arrow p-0  ${dropShow ? 'show' : ''}`}
                onClick={() => setDropShow(!dropShow)}
                data-bs-toggle="dropdown"
                aria-expanded={dropShow?"true":"false"}
                >
                <div className="avatar avatar-online">
                  <img src="../../assets/img/avatars/1.png" alt = "true" className="rounded-circle" />
                </div>
              </span> 
              <ul className={`dropdown-menu dropdown-menu-end p-0  ${dropShow ? 'show' : ''}`} data-bs-popper="static">
                <li>
                  <span className="dropdown-item mt-0" href="pages-account-settings-account.html">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-2">
                        <div className="avatar avatar-online">
                          <img src="../../assets/img/avatars/1.png" alt = "true" className="rounded-circle" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{session?.user?.name}</h6>
                        <small className="text-muted">Admin</small>
                      </div>
                    </div>
                  </span>
                </li> 
                <Link href="configuration"> 
                <li>
                  <span className="dropdown-item" href="pages-account-settings-account.html">
                    <i className="ti ti-settings me-3 ti-md"></i><span className="align-middle">Settings</span>
                  </span>
                </li>
               </Link>
                <li>
                  <div className="d-grid px-2 pt-2 pb-1">
                    <span className="btn btn-sm btn-danger d-flex"  onClick={logout}>
                     {loader && <i className="fa fa-refresh fa-spin ti-14px ms-2"></i>}
                      <small className="align-middle p-2 pt-0 pb-0">Logout</small>
                      <i className="ti ti-logout ms-2 ti-14px"></i>
                    </span>
                  </div>
                </li>
              </ul>
            </li>
            {/* <!--/ User --> */}
          </ul>
        </div>

        {/* <!-- Search Small Screens --> */}
        <div className="navbar-search-wrapper search-input-wrapper d-none">
          <input
            type="text"
            className="form-control search-input container-xxl border-0"
            placeholder="Search..."
            aria-label="Search..." />
          <i className="ti ti-x search-toggler cursor-pointer"></i>
        </div>
      </nav>

    </>
  )
}