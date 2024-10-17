'use client'; 
import { useRouter } from 'next/navigation'
import { useRef, useState } from "react" 
import toast from 'react-hot-toast';
import {validate_string, chk_email } from "@/utils/common";  
import ReCAPTCHA from "react-google-recaptcha"; 
import { fetchApi } from "@/utils/frondend";
import { useAuthContext } from "@/context/auth";
import { setCookie } from "cookies-next";
export default function LoginaPage() { 
  const { setAuthTkn } = useAuthContext();
  const router = useRouter() 
  const [email, setEmail] = useState("") 
  const [submitLoader, setSubmitLoader] = useState(false)  
  const reRef = useRef()

  const submit = async () => {
    try {
      toast.dismiss()
      if (!submitLoader) {
        try {
          validate_string(email, "Email")
          chk_email(email) 
        } catch (e) {
          toast.error(e)
          return false
        }
        setSubmitLoader(true)
        const repchaToken = await reRef.current.executeAsync();
        const param = JSON.stringify({ email: email,repchaToken  })
        const response = await fetchApi("auth/forgot-password", param, "POST")
        setSubmitLoader(false)
        if (response.statusCode === 200) {  
          setCookie("mltknauth", response.data.accessToken)
          router.push("reset-password")
        } else {
          
          if (response.data.message == "Unauthorized") {
            setAuthTkn(response.data.message)
          } else {
            console.log("first error", response.data.message)
            toast.error(response.data.message)
          }
        }
      }
    } catch (e) {
      console.log(e)
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
              <h4 className="mb-1">Forgot Password? 👋</h4>  
                  <div className="mb-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input placeholder="Enter email" type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} onKeyUp={(e) => e.keyCode == 13 && login()} />
                  </div> 
                  <div className="my-8">
                    <div className="d-flex justify-content-between">
                    <span className="cursor-pointer" onClick={()=>  router.push(process.env.ADMFLDR + '/')}>
                        <p className="mb-0">Back To Login?</p>
                      </span>
                    </div>
                  </div>
                  <button className="btn btn-primary w-100" onClick={() => submit()}>{submitLoader && <i className="fa fa-refresh fa-spin me-2"></i>} <span className="ml-2">Submit</span></button>
                 
               
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
