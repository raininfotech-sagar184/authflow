'use client'
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

const Sidebar = () => {
    const router = useRouter()
    const logout = async () => {
        const data = await signOut({ redirect: false, callbackUrl: '/' + process.env.ADMFLDR })
        router.push('/' + process.env.ADMFLDR)
    }
    const path_ = usePathname()
    const path = path_.split('/rdadmpnl')[1];
    return (
        <>
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
                <div className="app-brand demo">
                    <a href="index.html" className="app-brand-link">
                        <span className="app-brand-logo demo">
                            <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                                    fill="#7367F0" />
                                <path
                                    opacity="0.06"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                                    fill="#161616" />
                                <path
                                    opacity="0.06"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                                    fill="#161616" />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                                    fill="#7367F0" />
                            </svg>
                        </span>
                        <span className="app-brand-text demo menu-text fw-bold">Vuexy</span>
                    </a>

                    <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto">
                        <i className="ti menu-toggle-icon d-none d-xl-block align-middle"></i>
                        <i className="ti ti-x d-block d-xl-none ti-md align-middle"></i>
                    </a>
                </div>

                <div className="menu-inner-shadow"></div>

                <ul className="menu-inner py-1">


                    {/* <!-- Dashboard --> */}
                    <li className="menu-header small">
                        <span className="menu-header-text">Dashboard</span>
                    </li>
                    <li className={`menu-item ${path === '/dashboard' ? 'active' : ''}`}>
                        <Link href={`/${process.env.ADMFLDR}/dashboard`} className="menu-link">
                            <i className="menu-icon tf-icons ti ti-mail"></i>
                            <div  >Dashboard</div>
                        </Link>
                    </li>

                    {/* <!-- User --> */}
                    <li className="menu-header small">
                        <span className="menu-header-text">Manage User</span>
                    </li>
                    <li className={`menu-item ${path === '/user-list' ? 'active' : ''}`}>
                        <Link href={`/${process.env.ADMFLDR}/user-list`} className="menu-link">
                            <i className="menu-icon tf-icons ti ti-mail"></i>
                            <div >User List</div>
                        </Link>
                    </li>


                    {/* <!-- Package --> */}
                    <li className="menu-header small">
                        <span className="menu-header-text">Manage Package</span>
                    </li>
                    <li className={`menu-item ${path === '/package-list' ? 'active' : ''}`}>
                        <Link href={`/${process.env.ADMFLDR}/package-list`}className="menu-link">
                            <i className="menu-icon tf-icons ti ti-mail"></i>
                            <div >Package List</div>
                        </Link>
                    </li>



                    {/* <!-- Setting --> */}
                    <li className="menu-header small">
                        <span className="menu-header-text">Setting</span>
                    </li>
                    <li className={`menu-item`}>
                        <a href="javascript:void(0);" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons ti ti-smart-home"></i>
                            <div data-i18n="Dashboards">Setting</div>
                            <div className="badge bg-danger rounded-pill ms-auto">5</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={`menu-item ${path === '/analytics' ? 'active' : ''}`}>
                                <a href="index.html" className="menu-link">
                                    <div data-i18n="Analytics">Analytics</div>
                                </a>
                            </li>
                            <li className={`menu-item ${path === '/crm' ? 'active' : ''}`}>
                                <a href="dashboards-crm.html" className="menu-link">
                                    <div data-i18n="CRM">CRM</div>
                                </a>
                            </li>

                            <li className={`menu-item ${path === '/logistics' ? 'active' : ''}`}>
                                <a href="app-logistics-dashboard.html" className="menu-link">
                                    <div data-i18n="Logistics">Logistics</div>
                                </a>
                            </li>
                            <li className={`menu-item ${path === '/academy' ? 'active' : ''}`}>
                                <a href="app-academy-dashboard.html" className="menu-link">
                                    <div data-i18n="Academy">Academy</div>
                                </a>
                            </li>
                        </ul>
                    </li>






                </ul>
            </aside>
        </>
    )
}
export default Sidebar


