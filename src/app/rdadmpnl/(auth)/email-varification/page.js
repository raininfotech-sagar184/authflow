'use client';
import { useRouter } from 'next/navigation'
import { useRef, useState } from "react"
import toast from 'react-hot-toast';
import { validate_string,  chk_otp } from "@/utils/common";
import ReCAPTCHA from "react-google-recaptcha";
import { fetchApi } from "@/utils/frondend";
// import { useAuthContext } from "@/context/auth"; 
import { deleteCookie, getCookie } from 'cookies-next';
import { useAuthContext } from '@/context/auth';
export default function LoginaPage() {
  const { setAuthTkn, setPageLoader, lang, langData, pageLoader } = useAuthContext()
  const [data, setData] = useState({ password: "", rePassword: "", otp: "" })
  const [loader, setLoader] = useState({ resetpwd: false, sendOtp: false })
  const router = useRouter()
  const [msg, setMsg] = useState("")
  const [otpTimer, setOtpTimer] = useState({ waiting: false, timer: '00:00' })
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const reRef = useRef(null);
  const mlTkn = getCookie("mltknauth") || ""
  // useEffect(() => {
  //   setPageLoader(false)
  // }, [])

  let tt
  function startTimer(duration) {
    var timer = duration
    var minutes = 0
    var seconds = 0
    tt = setInterval(function () {
      minutes = parseInt((timer / 60).toString(), 10);
      seconds = parseInt((timer % 60).toString(), 10);
      setOtpTimer({ waiting: true, timer: (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds) })
      if (minutes == 0 && seconds == 0) {
        setOtpTimer({ waiting: false, timer: '00:00' })
        clearInterval(tt);
        return false;
      }
      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  const sendOtp = async () => {
    if (!loader.sendOtp) {
      setLoader({ ...loader, sendOtp: true })
      const repchaToken = await reRef.current.executeAsync();
      const param = JSON.stringify({ repchaToken: repchaToken, email: `admin@solares.com`, mlTkn: mlTkn })
      const response = await fetchApi("auth/forgot-password-otp", param)
      setLoader({ ...loader, sendOtp: false })
      if (response.statusCode === 200) {
        startTimer(5 * 60)
        toast.success(response.data.message)
      } else {
        console.log(response.data)
        if (response.data.message == "Unauthorized") {
          // setAuthTkn(response.data.message)
        } 
      }
    }
  }

  const varify_email = async () => {
    toast.dismiss()
    if (!loader.resetpwd) {
      try { 
         
        validate_string(otp.join(""), `otp`, 0)
        chk_otp(otp.join(""), "")
      } catch (e) {
        toast.error(e)
        return
      }
      setLoader({ ...loader, resetpwd: true })
      const repchaToken = await reRef.current.executeAsync();
      const param = JSON.stringify({   mlTkn: mlTkn, otp: otp.join(""), repchaToken: repchaToken })
      const response = await fetchApi("auth/email-varification", param)
      setLoader({ ...loader, resetpwd: false })
      if (response.statusCode === 200) {
        toast.success(response.data.message)
        deleteCookie("mltknauth") 
        setTimeout(() => {
          router.push("login")
        }, 1000)
      } else {
        if (response.data.message == "Unauthorized") {
          // setAuthTkn(response.data.message)
        } else {
          if (response.data.email == 'invalid') {
            router.push("forgot-password")
          }
          else {
            toast.error(response.data.message)
          }
        }
      }
    }
  }





  const handleChange = (element, index) => { 
    if (isNaN(element.value)) return; 
    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp); 
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) { 
      event.target.previousSibling.focus();
    }
  };
  return (
    <>
      <div className="authentication-wrapper authentication-cover">
        <span className="app-brand auth-cover-brand">
          <span className="app-brand-logo demo">
            <img src="/assets/image/logo.svg" alt="logo" />
          </span>
          <span className="app-brand-text demo text-heading fw-bold" onClick={() => console.log(otp.join(""))}>Nft Marketplace</span>
        </span>
        <div className="authentication-inner row m-0">
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
          <div className="d-flex col-12 col-lg-4 align-items-center authentication-bg p-sm-12 p-6">
            <div className="w-px-400 mx-auto mt-12 pt-5">
              <h4 className="mb-1">Email Verification 👋</h4>

              <div className="mb-3">
                <label htmlFor="otp" className="form-label">Enter otp sent to your email</label> 
                <div className="mb-6 fv-plugins-icon-container">
                  <div className="auth-input-wrapper d-flex align-items-center justify-content-between numeral-mask-wrapper">

                    {otp.map((data, index) => ( 
                      <input
                        key={index}
                        className="form-control auth-input h-px-50 text-center numeral-mask mx-sm-1 my-2"
                        type="text"
                        maxLength="1"
                        value={data}
                        onChange={e => handleChange(e.target, index)}
                        onKeyDown={e => handleKeyDown(e, index)} 
                      />
                    ))}
                   
                  </div> 
                  <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                </div>

              </div>
              <div className="my-8">
                {otpTimer.waiting == true?"": <div className="text-center mb-1 fs-18">Didn’t receive the OTP? </div>} 
                <div className="d-flex justify-content-center"> 
                  <span className="cursor-pointer"  >
                    <div className="text-center mb-10 text-primary fs-18">{loader.sendOtp ? <i className="fas fa-refresh fa-spin mx-1"></i> : ""}{otpTimer.waiting == true ? <span className="text-bold text-yellow">{`Resend after`}: {otpTimer.timer}</span> : <span className="cursor-pointer text-capitalize fs-18 text-yellow" onClick={() => sendOtp()}>{`Click here to Resend OTP Code`}</span>}</div>
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="cursor-pointer" onClick={() => router.push(process.env.ADMFLDR + '/')}>
                    <p className="mb-0">Back To Login?</p>
                  </span>
                </div>
              </div>
              <button className="btn btn-primary w-100" onClick={() => varify_email()}>{loader.resetpwd && <i className="fa fa-refresh fa-spin me-2"></i>} <span className="ml-2">Submit</span></button>
            </div>
          </div>
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
