'use client'; 
import { useRouter } from 'next/navigation'
import { useRef, useState } from "react"
import toast from 'react-hot-toast';
import {   validate_string, chk_email, chk_password, chk_confirm_password, chk_username, validateFile } from "../../../utils/common";
import { fetchApi } from "../../../utils/frondend"; 
import { useAuthContext } from "../../../context/auth";
import ReCAPTCHA from "react-google-recaptcha";
import $ from "jquery";
import { setCookie } from 'cookies-next';

export default function LoginaPage() {
  const { setAuthTkn } = useAuthContext();
  const router = useRouter() 
  const [image, setImage] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  // const [userData, setUserData] = useState({
  //   username: "", email: "", mobile: "", referralcode: "", password: "",
  // })

  const userFormField = {
    "username": "user1",
    "email": "user@user.com",
    "mobile": "1234567890",
    "referralcode": "asdfgh",
    "password": "User@123",
    "confirm_password": "User@123",
  }
  const [userData, setUserData] = useState({
    ...userFormField
  })
  const [validline, setvalidLine] = useState(false)
  const [msg, setMsg] = useState("") 
  const [submitLoader, setSubmitLoader] = useState(false)
  const [passwordType, setPasswordType] = useState("password") 
  const reRef = useRef() 
  const chkPassword = (pass) => {
    setvalidLine(true);
    const v = pass;
    const digit = /[0-9]/;
    const lower = /[a-z]/;
    const cap = /[A-Z]/;
    const spchar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (v == "" || v == undefined) {
      $("#er1, #er2, #er3, #er4, #er5")
        .addClass("text-danger fa-circle-xmark")
        .removeClass("text-success fa-check-circle");
    } else {
      const c = v.length;
      $("#er1")
        .addClass(v.match(digit) ? "text-success fa-check-circle" : "text-danger fa-circle-xmark")
        .removeClass(v.match(digit) ? "text-danger fa-circle-xmark" : "text-success fa-check-circle");
      $("#er2")
        .addClass(v.match(lower) ? "text-success fa-check-circle" : "text-danger fa-circle-xmark")
        .removeClass(v.match(lower) ? "text-danger fa-circle-xmark" : "text-success fa-check-circle");
      $("#er3")
        .addClass(v.match(spchar) ? "text-success fa-check-circle" : "text-danger fa-circle-xmark")
        .removeClass(v.match(spchar) ? "text-danger fa-circle-xmark" : "text-success fa-check-circle");
      $("#er4")
        .addClass((c >= 8 && c <= 30) ? "text-success fa-check-circle" : "text-danger fa-circle-xmark")
        .removeClass((c >= 8 && c <= 30) ? "text-danger fa-circle-xmark" : "text-success fa-check-circle");
      $("#er5")
        .addClass(v.match(cap) ? "text-success fa-check-circle" : "text-danger fa-circle-xmark")
        .removeClass(v.match(cap) ? "text-danger fa-circle-xmark" : "text-success fa-check-circle");
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
  };
  const Submit = async () => {
    toast.dismiss()
    if (!submitLoader) {
      try {
        if (msg) {
          toast.error(msg)
          return false
        }
        validate_string(userData.username, "Username")
        chk_username(userData.username)
        validate_string(userData.email, "Email")
        chk_email(userData.email)
        validate_string(userData.mobile, "Mobile")
        if (`${userData.mobile}`.length != 10) {
          throw "Mobile number should be 10 digits."
        }
        validate_string(userData.referralcode, "Referral code")
        validate_string(userData.password, "Password")
        chk_password(userData.password)
        validate_string(userData.confirm_password, "Confirm password")
        chk_confirm_password(userData.password, userData.confirm_password)
        // if (!imageUrl) {
        //   toast.error("Upload image")
        //   return
        // }
        // validateFile(image, "Images")
      } catch (e) {
        toast.error(e)
        return false
      }
      setSubmitLoader(true)
      const repchaToken = await reRef.current.executeAsync();
      const bodyData = JSON.stringify({
        username: userData.username, email: userData.email, mobile: userData.mobile, referralcode: userData.referralcode, password: userData.password, repchaToken
      })
      // const formData = new FormData()
      // formData.append('image', image)
      // formData.append('data', bodyData)
      const response = await fetchApi(`/register`, bodyData, "POST")
      setSubmitLoader(false)
      if (response.statusCode === 200) {
        toast.success(response.data.message)  
        setCookie('vrfMlTknAth', response.data.accessToken)
        setCookie("refCode", userData.refCode ? userData.refCode : '')
        setUserData({...userFormField})
        setvalidLine(false)
        router.push("email-varification")
      } else {
        if (response.data.message == "Unauthorized") {
          setAuthTkn(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      }
    }
  }

  const selectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      try {
        validateFile(file, "images")
      } catch (e) {
        toast.error(e)
        return false
      }
      setImage(file)
      console.log("URL.createObjectURL(file)", URL.createObjectURL(file))
      setImageUrl(URL.createObjectURL(file))
    }
  }

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
              <h4 className="mb-1">Welcome to Nft Store!  🚀</h4>
              <p className="mb-6">Please ragister to your account</p>
              
                  <div className="mb-6">
                    <label htmlFor="username" className="form-label">User Name</label>
                    <input placeholder="Enter username" type="text" className="form-control" value={userData?.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} onKeyUp={(e) => e.keyCode == 13 && Submit()} />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input placeholder="Enter email" type="text" className="form-control" value={userData?.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} onKeyUp={(e) => e.keyCode == 13 && Submit()} />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="mobile" className="form-label">Mobile</label>
                    <input placeholder="Enter mobile"  maxLength={10} type="text" className="form-control" value={userData?.mobile} onChange={(e) => setUserData({ ...userData, mobile: e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1") })} onKeyUp={(e) => e.keyCode == 13 && Submit()} />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="referralcode" className="form-label">Referral Code</label>
                    <input placeholder="Enter referralcode" type="text" className="form-control" value={userData?.referralcode} onChange={(e) => setUserData({ ...userData, referralcode: e.target.value })} onKeyUp={(e) => e.keyCode == 13 && Submit()} />
                  </div>
                  <div className="mb-6">
                    <label className="form-label" htmlFor="password">Password</label>
                    <div className="input-group input-group-merge has-validation">
                      <input
                        id="password"
                        name="password"
                        aria-describedby="password"
                        placeholder="Enter password"
                        type={passwordType.password}
                        className="form-control"
                        value={userData.password}

                        onChange={(e) => { setUserData({ ...userData, password: e.target.value }); chkPassword(e.target.value); }}
                        onKeyUp={(e) => e.keyCode == 13 && Submit()}

                      />
                      <span className="input-group-text cursor-pointer" onClick={() => setPasswordType({ ...passwordType, password: passwordType.password === "password" ? "text" : "password" })}><i className={`ti ti-eye${passwordType.password == "password" ? "-off" : ""}`}></i></span>
                    </div>
                  </div>
                  {validline ? (
                    <span className='password-validation-span mb-3'>
                      <span><i className='fa fa-circle-xmark' id='er1'></i> 1 Number</span>
                      <span><i className='fa fa-circle-xmark' id='er5'></i> 1 Uppercase</span>
                      <span><i className='fa fa-circle-xmark' id='er2'></i> 1 Lowercase</span>
                      <span><i className='fa fa-circle-xmark' id='er3'></i> 1 Special Character</span>
                      <span><i className='fa fa-circle-xmark' id='er4'></i> Min 8 - 32 Max Character</span>
                    </span>
                  ) : ""}
                  <div className="mb-6">
                    <label className="form-label" htmlFor="password">Confirm Password</label>
                    <div className="input-group input-group-merge has-validation">
                      <input
                        id="password"
                        name="confirm_password"
                        aria-describedby="password"
                        placeholder="Enter confirm password"
                        type={passwordType.confirm_password}
                        className="form-control"
                        value={userData?.confirm_password}
                        onChange={(e) => setUserData({ ...userData, confirm_password: e.target.value })}
                        onKeyUp={(e) => e.keyCode == 13 && Submit()}

                      />
                      <span className="input-group-text cursor-pointer" onClick={() => setPasswordType({ ...passwordType, confirm_password: passwordType.confirm_password === "password" ? "text" : "password" })}><i className={`ti ti-eye${passwordType.confirm_password == "password" ? "-off" : ""}`}></i></span>
                    </div>

                  </div>
                  <div className="mb-6">
                    <label className="form-label"  >Profile Image</label>
                    <label htmlFor="selectFile" className='cursor-pointer'>
                      <img src={imageUrl ? imageUrl : '/assets/image/upload-image.png'} className='upload-image' />
                    </label>
                    <input type='file' id="selectFile" className='d-none' onChange={(e) => selectFile(e)} />
                  </div>
                  <button className="btn btn-primary w-100" onClick={() => Submit()}>{submitLoader && <i className="fa fa-refresh fa-spin me-2"></i>} <span className="ml-2">Submit</span></button>
                  <div className="divider my-6">
                    <div className="divider-text">or</div>
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <span className="cursor-pointer" onClick={() => router.push('login')}>
                      <p className="mb-0 text-primary">Sign in instead</p>
                    </span>
                  </div>
                
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
