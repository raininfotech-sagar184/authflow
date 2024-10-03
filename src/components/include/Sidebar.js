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
    const path = path_.split('/exchinadmpnl')[1];

    return (
        <>
            <div className="left-side-menu">
                <div className="slimscroll-menu">
                    <div className="user-box text-center">
                        <img src="/assets/images/profile.png" alt="user-img" title="Mat Helme" className="rounded-circle img-thumbnail avatar-md" />
                        <p className="text-muted">Admin</p>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <Link href={`/${process.env.ADMFLDR}/settings`} className="text-muted">
                                    <i className="mdi mdi-cog"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <div className="cursor-pointer text-yellow" onClick={() => { logout() }}>
                                    <i className="mdi mdi-power"></i>
                                </div>
                            </li>
                        </ul>
                    </div>


                    <div id="sidebar-menu">
                        <ul className="metismenu" id="side-menu">
                            <li className="menu-title">Navigation</li>
                            <li className={`${path == "/dashboard" ? "mm-active" : ""}`}>
                                <Link href={`/${process.env.ADMFLDR}/dashboard`} className={`${path == '/dashboard' ? 'active' : ''}`} >
                                    <i className="mdi mdi-view-dashboard"></i>
                                    <span> Dashboard </span>
                                </Link>
                            </li>

                            <li className={`${path == "/user-list" ? "mm-active" : ""}`}>
                                <Link href={`/${process.env.ADMFLDR}/user-list`} className={`${path == '/user-list' ? 'active' : ''}`}>
                                    <i className="mdi mdi-account"></i>
                                    <span>User List </span>
                                </Link>
                            </li>

                            <li className={`${path == "/nft-list" || path == "/user-nft-list" || path == "/nft-reward-history" ? "mm-active" : ""}`}>
                                <Link href="#" className={`${path == "/nft-list" || path == "/user-nft-list" || path == "/nft-reward-history" ? "active" : ""}`}>
                                    <i className="mdi mdi-nativescript fs-18"></i>
                                    <span> NFT </span>
                                    <span className="menu-arrow"></span>
                                </Link>
                                <ul className="nav-second-level" aria-expanded="false">
                                    <li className={`${path == "/nft-list" ? "mm-active" : ""}`}>
                                        <Link href={`/${process.env.ADMFLDR}/nft-list`}>NFT List</Link>
                                    </li>
                                    <li className={`${path == "/user-nft-list" ? "mm-active" : ""}`}>
                                        <Link href={`/${process.env.ADMFLDR}/user-nft-list`}>User NFT List</Link>
                                    </li>
                                    <li className={`${path == "/nft-reward-history" ? "mm-active" : ""}`}>
                                        <Link href={`/${process.env.ADMFLDR}/nft-reward-history`}>NFT Reward History</Link>
                                    </li>

                                </ul>
                            </li>    

                            <li className={`${path == "/package-list" || path == "/user-package-list" ? "mm-active" : ""}`}>
                                <Link href="#" className={`${path == "/package-list" ? "active" : ""}`}>
                                    <i className="mdi mdi-package fs-18"></i>
                                    <span>Subscription</span>
                                    <span className="menu-arrow"></span>
                                </Link>
                                <ul className="nav-second-level" aria-expanded="false">
                                    <li className={`${path == "/first-movers-user-nft-list" ? "mm-active" : ""}`}>
                                        <Link href={`/${process.env.ADMFLDR}/package-list`}>Package List</Link>
                                    </li>
                                    <li className={`${path == "/user-package-list" ? "mm-active" : ""}`}>
                                        <Link href={`/${process.env.ADMFLDR}/user-package-list`}>User Package List</Link>
                                    </li>
                                </ul>
                            </li>

                            <li className={`${path == "/transaction-history" ? "mm-active" : ""}`}>
                                <Link href={`/${process.env.ADMFLDR}/transaction-history`} className={`${path == '/transaction-history' ? 'active' : ''}`}>
                                    <i className="mdi mdi-menu"></i>
                                    <span> Transaction History </span>
                                </Link>
                            </li>

                            <li className={`${path == "/admin-wallet-history" ? "mm-active" : ""}`}>
                                <Link href={`/${process.env.ADMFLDR}/admin-wallet-history`} className={`${path == '/admin-wallet-history' ? 'active' : ''}`}>
                                    <i className="mdi mdi-wallet"></i>
                                    <span>Admin Wallet History </span>
                                </Link>
                            </li>

                            <li className={`${path == "/loyalty-pool-history" ? "mm-active" : ""}`}>
                                <Link href={`/${process.env.ADMFLDR}/loyalty-pool-history`} className={`${path == '/loyalty-pool-history' ? 'active' : ''}`}>
                                    <i className="mdi mdi-menu"></i>
                                    <span>Loyalty Pool History</span>
                                </Link>
                            </li>

                            <li className={`${path == "/lotto-history" ? "mm-active" : ""}`}>
                                <Link href={`/${process.env.ADMFLDR}/lotto-history`} className={`${path == '/lotto-history' ? 'active' : ''}`}>
                                    <i className="fa fa-list"></i>
                                    <span>Lotto History</span>
                                </Link>
                            </li>
                            <li className={`${path == "/sponsor-bonus-history" ? "mm-active" : ""}`}>
                                <Link href={`/${process.env.ADMFLDR}/sponsor-bonus-history`} className={`${path == '/sponsor-bonus-history' ? 'active' : ''}`}>
                                    <i className="fa fa-list-alt"></i>
                                    <span>Sponsor Bonus History</span>
                                </Link>
                            </li>
                            <li className={`${path == "/spro-user-list" ? "mm-active" : ""}`}>
                                <Link href={`/${process.env.ADMFLDR}/spro-user-list`} className={`${path == '/spro-user-list' ? 'active' : ''}`}>
                                    <i className="fa fa-list-ol"></i>
                                    <span>SPRO User List</span>
                                </Link>
                            </li>

                            <li className={`${path == "/settings" ? "mm-active" : ""}`}>
                                <Link href={`/${process.env.ADMFLDR}/settings`} className={`${path == '/settings' ? 'active' : ''}`}>
                                    <i className="mdi mdi-cog"></i>
                                    <span>Settings</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="clearfix"></div>
                </div>
            </div>
        </>
    )
}
export default Sidebar


