'use client'
import Link from "next/link"
import { signOut } from 'next-auth/react'
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { trunc } from "../../utils/common"
export default function Header() {
  const router = useRouter()
  const logout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/' + process.env.ADMFLDR })
    router.push('/' + process.env.ADMFLDR)
  }

  const _path = usePathname();
  const path = _path.split('/').pop();
  const [pageName, setPageName] = useState("");
  const { open } = useWeb3Modal()
  const { address, chainId } = useWeb3ModalAccount()
  const [account, setAccount] = useState('')
  const [chain, setChain] = useState(0)
  const CHAINID = process.env.CHAINID
  const CHAINNAME = process.env.CHAINNAME

  useEffect(() => {
    setAccount(address || "")
    setChain(chainId || 0)
  }, [chainId, address])

  useEffect(() => {
    const pageNames = {
      'dashboard': 'DashBoard',
      'user-staking-history': 'User Staking History',
      'nft-list': 'NFT List',
      'user-nft-list': 'User NFT List',
      'nft-reward-history': 'NFT Reward History',
      'transaction-history': 'Transaction History',
      'admin-wallet-history': 'Admin Wallet History',
      'loyalty-pool-history': 'Loyalty Pool History',
      'lotto-history': 'Lotto History',
      'sponsor-bonus-history': 'Sponsor Bonus History',
      'settings': 'Settings',
      'user-list': 'User List',
      "first-movers-user-nft-list": "First Movers User NFT",
      "release-first-movers-ecpro": "Release First Movers ECPRO",
      "spro-user-list": "SPRO User List",
      "package-list": "Package List",
      "user-package-list": "User Package List"
    };
    setPageName(pageNames[path] || "");
  }, [_path]);

  return (
    <>
      <div className="navbar-custom" onClick={()=>console.log({address, chainId})}>
        <ul className="list-unstyled topnav-menu float-right mb-0">
          <li className="mt-2">{!account ? <button className="btn btn-primary mx-3" onClick={() => open({ view: 'Connect' })}>Connect Wallet</button> : ""}

            {account && chain != CHAINID ? <button className="btn btn-primary mx-3" onClick={() => open({ view: 'Networks' })}>
              Switch to  {CHAINNAME}
            </button> : account && chain == CHAINID ? <button onClick={() => open({ view: 'Account' })} className="btn btn-primary mx-3">
              {trunc(account)}
            </button> : ""}</li>
          <li className="dropdown notification-list">
            <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
              <img src="/assets/images/profile.png" alt="user-image" className="rounded-circle" />
              <span className="pro-user-name ml-1">
                Admin <i className="mdi mdi-chevron-down"></i>
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
              {/* <div className="dropdown-header noti-title">
                <h6 className="text-overflow m-0">Welcome !</h6>
              </div>

              <Link href="#" className="dropdown-item notify-item">
                <i className="fe-user"></i>
                <span>My Account</span>
              </Link>

              <Link href="settings" className="dropdown-item notify-item">
                <i className="fe-settings"></i>
                <span>Settings</span>
              </Link>


              <div className="dropdown-divider"></div> */}

              <Link href="" onClick={() => { logout() }} className="dropdown-item notify-item">
                <i className="fe-log-out"></i>
                <span >Logout</span>
              </Link>

            </div>
          </li>
        </ul>

        <div className="logo-box">
          <Link href={process.env.ADMFLDR} className="logo logo-dark text-center">
            <span className="logo-lg">
              <img src="/assets/images/logo-dark.svg" alt="logo" className="sidebar-logo" />
            </span>
            <span className="logo-sm">
              <img src="/assets/images/logo-dark.svg" alt="logo" className="sidebar-logo" />
            </span>
          </Link>
          <Link href={process.env.ADMFLDR} className="logo logo-light text-center">
            <span className="logo-lg">
              <img src="/assets/images/logo-dark.svg" alt="logo" className="sidebar-logo" />
            </span>
            <span className="logo-sm">
              <img src="/assets/images/logo-dark.svg" alt="logo" className="sidebar-logo" />
            </span>
          </Link>
        </div>

        <ul className="list-unstyled topnav-menu topnav-menu-left mb-0">
          <li>
            <button className="button-menu-mobile disable-btn waves-effect">
              <i className="fe-menu"></i>
            </button>
          </li>

          <li>
            <h3 className="page-title-main">{pageName}</h3>
          </li>

        </ul>

      </div>

    </>
  )
}