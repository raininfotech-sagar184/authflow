'use client';
import { useRouter } from 'next/navigation'
import { useRef, useState } from "react"
import toast from 'react-hot-toast';
import { validate_string, chk_email, chk_confirm_password, chk_otp } from "@/utils/common";
import ReCAPTCHA from "react-google-recaptcha";
import { ButtonSpinner } from "@/components/include/Loader";
import { fetchApi } from "@/utils/frondend";
// import { useAuthContext } from "@/context/auth";
import $ from "jquery";
import { getCookie } from 'cookies-next';
export default function LoginaPage() {
  // const { setAuthTkn, setPageLoader, lang, langData } = useAuthContext()
  const [data, setData] = useState({ password: "", rePassword: "", otp: "" })
  const [loader, setLoader] = useState({ resetpwd: false, sendOtp: false })
  const [passType, setpassType] = useState({ t1: "password", t2: "password" })
  const router = useRouter()
  const [validline, setvalidLine] = useState(false)
  const [msg, setMsg] = useState("")
  const [otpTimer, setOtpTimer] = useState({ waiting: false, timer: '00:00' })
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
     
      const param = JSON.stringify({ repchaToken: repchaToken, email: `admin@solares.com`,mlTkn:mlTkn })
      const response = await fetchApi("auth/forgot-password-otp", param)
      setLoader({ ...loader, sendOtp: false })
      if (response.statusCode === 200) {
        startTimer(5 * 60)
        toast.success(response.data.message)
      } else {
        console.log(response.data)
        if (response.data.message == "Unauthorized") {
          // setAuthTkn(response.data.message)
        } else {
          if (response.data.email == 'invalid') {
            router.push("/forgot-password")
          } else {
            toast.error(response.data.message)
          }
        }
      }
    }
  }

  const chkPassword = (pwd) => {
    setvalidLine(true);
    let v = pwd;
    let digit = /[0-9]/;
    let lower = /[a-z]/;
    let cap = /[A-Z]/;
    let spchar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (v === "" || v === undefined) {
      $("#er1, #er2, #er3, #er4, #er5")
        .addClass("text-danger fa-times-circle")
        .removeClass("text-success fa-check-circle");
    } else {
      let c = v.length;
      $("#er1")
        .addClass(v.match(digit) ? "text-success fa-check-circle" : "text-danger fa-times-circle")
        .removeClass(v.match(digit) ? "text-danger fa-times-circle" : "text-success fa-check-circle");
      $("#er2")
        .addClass(v.match(lower) ? "text-success fa-check-circle" : "text-danger fa-times-circle")
        .removeClass(v.match(lower) ? "text-danger fa-times-circle" : "text-success fa-check-circle");
      $("#er3")
        .addClass(v.match(spchar) ? "text-success fa-check-circle" : "text-danger fa-times-circle")
        .removeClass(v.match(spchar) ? "text-danger fa-times-circle" : "text-success fa-check-circle");
      $("#er4")
        .addClass((c >= 8 && c <= 30) ? "text-success fa-check-circle" : "text-danger fa-times-circle")
        .removeClass((c >= 8 && c <= 30) ? "text-danger fa-times-circle" : "text-success fa-check-circle");
      $("#er5")
        .addClass(v.match(cap) ? "text-success fa-check-circle" : "text-danger fa-times-circle")
        .removeClass(v.match(cap) ? "text-danger fa-times-circle" : "text-success fa-check-circle");

      if (
        $("#er5").hasClass("text-success") &&
        $("#er2").hasClass("text-success") &&
        $("#er3").hasClass("text-success") &&
        $("#er4").hasClass("text-success") &&
        $("#er1").hasClass("text-success")
      ) {
        setMsg("");
      } else {
        setMsg("Password should contain 8 - 30 characters, with at least one uppercase, one lowercase, one number, and one special character.");
      }
    }
  }

  const reset_password = async () => {
    toast.dismiss()
    if (!loader.resetpwd) {
      try {
        validate_string(data.password, 'password', 0)
        if (msg) {
          toast.error(msg)
          return false
        }
        validate_string(data.rePassword, `confirm password`, 0)
        chk_confirm_password(data.password, data.rePassword)
        validate_string(data.otp, `otp`, 0)
        chk_otp(data.otp, "")
      } catch (e) {
        toast.error(e)
        return
      }
      setLoader({ ...loader, resetpwd: true })
      // let tkn = getCookie("passfgTkn") || "" 
      const repchaToken = await reRef.current.executeAsync(); 
      const param = JSON.stringify({ password: data.password,mlTkn:mlTkn, repassword: data.rePassword, otp: data.otp, repchaToken: repchaToken,email: `admin@solares.com` })
      const response = await fetchApi("auth/reset-password",param)
      setLoader({ ...loader, resetpwd: false })
      if (response.statusCode === 200) {
        toast.success(response.data.message)
        deleteCookie("mlTkn")
        setTimeout(() => {
          router.push("login")
        }, 1000)
      } else { 
        if (response.data.message == "Unauthorized") {
          // setAuthTkn(response.data.message)
        } else { 
          if (response.data.email == 'invalid') {
            router.push("/forgot-password")
          }
          else { 
            toast.error(response.data.message)
          }
        }
      }
    }
  }
  return (
    <>
      <div className="authentication-wrapper authentication-cover"> 
        <a href="index.html" className="app-brand auth-cover-brand">
        <span className="app-brand-logo demo">
             <img src="/assets/image/logo.svg" alt="logo" />
          </span>
          <span className="app-brand-text demo text-heading fw-bold">Nft Marketplace</span>
        </a> 
        <div className="authentication-inner row m-0"> 
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
          <div className="d-flex col-12 col-lg-4 align-items-center authentication-bg p-sm-12 p-6">
            <div className="w-px-400 mx-auto mt-12 pt-5">
              <h4 className="mb-1">Reset Password? 👋</h4>
           
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={passType.t1}
                    name="password"
                    placeholder={`Password`}
                    className="form-control"
                    value={data.password}
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
                      chkPassword(e.target.value);
                    }}
                    onKeyUp={(e) => e.keyCode === 13 && reset_password()}
                  />
                  <span className="input-group-text">
                    <i
                      className={`cursor-pointer text-light fs-18 ti  ${passType.t1 === "password" ? "ti-eye-off" : "ti-eye"}`}
                      onClick={() => {
                        setpassType({
                          ...passType,
                          t1: passType.t1 === "password" ? "text" : "password",
                        });
                      }}
                    ></i>
                  </span>
                </div>
              </div>
              {validline ? (
                <div>
                  <div className="row mt-2">
                    <div className="col-xl-6">
                      <span id="er1" className="pass-valid fa fs-12">
                        <span className="validPassText mx-1">1 Number</span>
                      </span>
                      <br />
                      <span id="er5" className="pass-valid fa fs-12">
                        <span className="validPassText mx-1">1 Uppercase</span>
                      </span>
                      <br />
                      <span id="er2" className="pass-valid fa fs-12">
                        <span className="validPassText mx-1">1 Lowercase</span>
                      </span>
                    </div>
                    <div className="col-xl-6">
                      <span id="er3" className="pass-valid fa fs-12">
                        <span className="validPassText mx-1">1 Special Character</span>
                      </span>
                      <br />
                      <span id="er4" className="pass-valid fa fs-12">
                        <span className="validPassText mx-1">Min 8 - 30 Max Characters</span>
                      </span>
                    </div>
                  </div>
                </div>
              ) : ""}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Confirm Password</label>
                <div className="input-group">

                  <input
                    type={passType.t2}
                    name="password"
                    placeholder={`Confirm Password`}
                    className="form-control"
                    value={data.rePassword}
                    onChange={(e) => {
                      setData({ ...data, rePassword: e.target.value });
                    }}
                    onKeyUp={(e) => e.keyCode === 13 && reset_password()}
                  />
                  <span className="input-group-text">
                    <i
                      className={`cursor-pointer text-light fs-18 ti  ${passType.t2 === "password" ? "ti-eye-off" : "ti-eye"}`}
                      onClick={() => {
                        setpassType({
                          ...passType,
                          t2: passType.t2 === "password" ? "text" : "password",
                        });
                      }}
                    ></i>
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">OTP</label>
                <div className="input-group">

                  <input
                    type="text"
                    name="otp"
                    placeholder={`OTP`}
                    className="form-control"
                    value={data.otp}
                    onKeyUp={(e) => e.keyCode == 13 && reset_password()}
                    onChange={(e) => setData({ ...data, otp: e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1") })}
                    maxLength={6}
                  />
                  <span className="input-group-text">
                    <i className="text-light fs-18 ti ti-lock"></i>
                  </span>
                </div>
              </div>
              <div className="my-8">
                <div className="d-flex justify-content-between">
                  <span className="cursor-pointer"  >
                  <div className="text-end mb-10 text-primary fs-18">{loader.sendOtp ? <i className="fa fa-refresh fa-spin mx-1"></i> : ""}{otpTimer.waiting == true ? <span className="text-bold text-yellow">{`Resend after`}: {otpTimer.timer}</span> : <span className="cursor-pointer text-capitalize fs-18 text-yellow" onClick={() => sendOtp()}>{`Click here to Resend OTP Code`}</span>}</div>
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="cursor-pointer" onClick={() => router.push(process.env.ADMFLDR + '/')}>
                    <p className="mb-0">Back To Login?</p>
                  </span>
                </div>
              </div>
              <button className="btn btn-primary w-100" onClick={() => reset_password()}>{loader.resetpwd ? <ButtonSpinner /> : ""} <span className="ml-2">Submit</span></button>
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
