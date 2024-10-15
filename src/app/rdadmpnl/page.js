'use client';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useRef, useState } from "react" 
import toast from 'react-hot-toast';
import { chk_otp, validate_string, chk_email, chk_password } from "../../utils/common";
import { fetchApi } from "../../utils/frondend";
import  { ButtonSpinner } from "../../components/include/Loader";
import { useAuthContext } from "../../context/auth";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginaPage() { 
  const { setAuthTkn } = useAuthContext();
  const router = useRouter()
  const callbackUrl = "/admsolspnl/dashboard"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [submitLoader, setSubmitLoader] = useState(false)
  const [passwordType, setPasswordType] = useState("password")
  const [isTwoOpen, setIstwoOpen] = useState(false)
  const reRef = useRef()

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
        const param = JSON.stringify({ email: email, password: password })
        const response = await fetchApi("auth/login", param, "POST")
        setSubmitLoader(false)
        if (response.statusCode === 200) {
          if (response.data.data.twoOpen == 1) {
            setIstwoOpen(true)
          }
        } else {
          if (response.data.message == "Unauthorized") {
            setAuthTkn(response.data.message)
          } else {
            toast.error(response.data.message)
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const finalLogin = async () => {
    try {
      if (!submitLoader) {
        try {
          chk_otp(otp)
        } catch (e) {
          toast.error(e)
          return false
        }
        setSubmitLoader(true)
        const repchaToken = await reRef.current.executeAsync();
        const res = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
          otp: otp,
          repchaToken: repchaToken,
          callbackUrl,
        })
        console.log(`res========`, res)
        setSubmitLoader(false)
        if (res.error == "CredentialsSignin") {
          toast.error("Google authentication failed.")
        } else {
          router.push(process.env.ADMFLDR + '/dashboard')
          setTimeout(() => {
            window.location.reload()
          }, 500);

        }
      }
    } catch (e) {
      console.log(e)
      setSubmitLoader(false)
    }
  }

  return (
    <>
      <div className="authentication-wrapper authentication-cover">
        {/* <!-- Logo --> */}
        <a href="index.html" className="app-brand auth-cover-brand">
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
          <span className="app-brand-text demo text-heading fw-bold">Vuexy</span>
        </a>
        {/* <!-- /Logo --> */}
        <div className="authentication-inner row m-0">
          {/* <!-- /Left Text --> */}
          <div className="d-none d-lg-flex col-lg-8 p-0">
            <div className="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
              <img
                src="/assets/img/illustrations/auth-login-illustration-light.png"
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
                      <span className="cursor-pointer" onClick={()=>  router.push(process.env.ADMFLDR + '/forgot-password')}>
                        <p className="mb-0">Forgot Password?</p>
                      </span>
                    </div>
                  </div>
                  <button className="btn btn-primary w-100" onClick={() => login()}>{submitLoader ? <ButtonSpinner /> : ""} <span className="ml-2">Sign in</span></button>
                  <p className="text-center">
                    <span>New on our platform?</span>
                    <a href="auth-register-cover.html">
                      <span>Create an account</span>
                    </a>
                  </p>
                </> : <>

                  <div className="mb-6">
                    <label className="mb-1"><strong>Google authenticator OTP</strong></label>
                    <input placeholder="Enter google authenticator OTP" type="text" className="form-control" value={otp} onChange={(e) => { setOtp(e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1")) }} onKeyUp={(e) => e.keyCode == 13 && finalLogin()} maxLength={6} />
                  </div>
                  <div className="text-center">
                    <button type="button" className="btn btn-primary w-100" onClick={() => finalLogin()}>{submitLoader ? <ButtonSpinner />  : ""}Verify OTP</button>
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
