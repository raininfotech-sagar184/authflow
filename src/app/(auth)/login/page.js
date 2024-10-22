'use client'; 
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from "react"
import toast from 'react-hot-toast';
import { chk_otp, validate_string, chk_email, chk_password } from "../../../utils/common";
import { fetchApi } from "../../../utils/frondend"; 
import { useAuthContext } from "../../../context/auth";
import ReCAPTCHA from "react-google-recaptcha";
import { setCookie } from "cookies-next";

export default function LoginaPage() {
  const { setAuthTkn,setPageLoader } = useAuthContext();
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [submitLoader, setSubmitLoader] = useState(false)
  const [passwordType, setPasswordType] = useState("password")
  const [isTwoOpen, setIstwoOpen] = useState(false)
  const reRef = useRef()

  const finalLogin = async (twoFaOpen) => {

    try {
      toast.dismiss()
      if (!submitLoader) {
        try {
          if (twoFaOpen !== 0) {
            chk_otp(otp)
          }
        } catch (e) {
          toast.error(e)
          return false
        }
        // setSubmitLoader(true)
        // const repchaToken = await reRef.current.executeAsync();
        // const res = await signIn("credentials", {
        //   redirect: false,
        //   email: email,
        //   password: password,
        //   otp: otp,
        //   repchaToken: repchaToken,
        //   twoFaOpen
        // })
        // setSubmitLoader(false)
        // console.log({ res })
        // if (res.error == "CredentialsSignin") {
        //   toast.error("Google authentication failed.")
        // } else {
        //   router.push("/" + process.env.ADMFLDR)

        // }
      }
    } catch (e) {
      console.log(e)
      setSubmitLoader(false)
    }
  }

  const login = async () => {
    try {
      toast.dismiss()
      if (!submitLoader) {
        try {
          validate_string(email, "Email")
          chk_email(email)
          validate_string(password, "Password")
          chk_password(password)
        } catch (e) {
          toast.error(e)
          return false
        }
        setSubmitLoader(true)
        const repchaToken = await reRef.current.executeAsync();
        const param = JSON.stringify({ email: email, password: password, repchaToken })
        const response = await fetchApi("/login", param, "POST")
        setSubmitLoader(false)
        if (response.statusCode === 200) {
          // if (response.data.data.twoOpen == 1) {
          //   setIstwoOpen(true)
          // } else {
          //   finalLogin(0)
          // }


          if (response.data.isVerify == 0) {
            console.log('first1')
            router.push("email-verification")
            setCookie("vrfMlTknAth", response.data.accessToken)
          } else if (response.data.isTwoFa == 1) {
            console.log('first2')
            setCookie("fctrSolsVrftKn", response.data.accessToken)
            setIstwoOpen(true)
          } else {
            console.log('first3')
            toast.success(response.data.message)
            if (response.data.accessToken) {
              setCookie("vrfUsreuthTkN", response.data.accessToken)
            }
            router.push("/")
          }
        } else {
          if (response.data.message == "Unauthorized") {
            setAuthTkn(response.data.message)
          } else {
            toast.error(response.data.message)
            if (response.data.isVarify == 0) {
              setCookie("mltknauth", response.data.accessToken)
              router.push("email-varification")
            }

          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setPageLoader(false)
  }, [])


  return (
    <>
      <div className="authentication-wrapper authentication-cover">
        <span className="app-brand auth-cover-brand">
          <span className="app-brand-logo demo">
            <img src="/assets/image/logo.svg" alt="logo" />
          </span>
          <span className="app-brand-text demo text-heading fw-bold">Nft Marketplace</span>
        </span>
        <div className="authentication-inner row m-0">
          {/* <!-- /Left Text --> */}
          <div className="d-none d-lg-flex col-lg-8 p-0">
            <div className="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
              <img
                src="/assets/image/NFT-marketplace.png"
                alt="auth-login-cover"
                className="my-5 auth-illustration"
                data-app-light-img="illustrations/auth-login-illustration-light.png"
                data-app-dark-img="illustrations/auth-login-illustration-dark.png" />

              <img
                src="/assets/img/illustrations/bg-shape-image-light.png"
                alt="auth-login-cover"
                className="platform-bg"
                data-app-light-img="illustrations/bg-shape-image-light.png"
                data-app-dark-img="illustrations/bg-shape-image-dark.png" />
            </div>
          </div>
          {/* <!-- /Left Text --> */}

          {/* <!-- Login --> */}
          <div className="d-flex col-12 col-lg-4 align-items-center authentication-bg p-sm-12 p-6">
            <div className="w-px-400 mx-auto mt-12 pt-5">
              <h4 className="mb-1">Welcome to Nft Store! 👋</h4>
              <p className="mb-6">Please {!isTwoOpen ? `sign-in to your account` : `varify google authentication and start the adventure`}</p>
              {
                !isTwoOpen ? <>
                  <div className="mb-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input placeholder="Enter email" type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} onKeyUp={(e) => e.keyCode == 13 && login()} />
                  </div>
                  <div className="mb-6 form-password-toggle">
                    <label className="form-label" htmlFor="password">Password</label>
                    <div className="input-group input-group-merge has-validation">
                      <input
                        id="password"
                        name="password"
                        aria-describedby="password"
                        placeholder="Enter password"
                        type={passwordType}
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyUp={(e) => e.keyCode == 13 && login()}

                      />
                      <span className="input-group-text cursor-pointer" onClick={() => setPasswordType(passwordType === "password" ? "text" : "password")}><i className={`ti ti-eye${passwordType == "password" ? "-off" : ""}`}></i></span>
                    </div>

                  </div>
                  <div className="my-8">
                    <div className="d-flex justify-content-between">

                      <span className="cursor-pointer" onClick={() => router.push('forgot-password')}>
                        <p className="mb-0 text-primary">Forgot Password?</p>
                      </span>
                    </div>
                  </div>
                  <button className="btn btn-primary w-100" onClick={() => login()}>{submitLoader && <i className="fa fa-refresh fa-spin me-2"></i>} <span className="ml-2">Sign In</span></button>
                  <div className="divider my-6">
                    <div className="divider-text">or</div>
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <span className="cursor-pointer" onClick={() => router.push('registration')}>
                      <p className="mb-0 text-primary">Sign up instead</p>
                    </span>
                  </div>

                </> : <>

                  <div className="mb-6">
                    <label className="mb-1"><strong>Google authenticator OTP</strong></label>
                    <input placeholder="Enter google authenticator OTP" type="text" className="form-control" value={otp} onChange={(e) => { setOtp(e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1")) }} onKeyUp={(e) => e.keyCode == 13 && finalLogin()} maxLength={6} />
                  </div>
                  <div className="text-center">
                    <button type="button" className="btn btn-primary w-100" onClick={() => finalLogin()}>{submitLoader && <i className="fa fa-refresh fa-spin me-2"></i>}Verify OTP</button>
                  </div>
                </>}
            </div>
          </div>
          {/* <!-- /Login --> */}
        </div>
      </div>

      <ReCAPTCHA
        sitekey={process.env.SITE_KEY}
        size="invisible"
        ref={reRef}
        style={{ display: "none" }}
      />
    </>
  );
}
