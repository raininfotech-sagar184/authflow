"use client"
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2';
import { fetchApi } from '../../../../utils/frondend'
import { useAuthContext } from '../../../../context/auth'
import { chk_otp, chk_password, validate_string } from '../../../../utils/common';
import Loader, { ButtonSpinner } from '../../../../components/include/Loader';
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import $ from "jquery";
import CopyToClipboard from 'react-copy-to-clipboard';
const Dashboard = () => {
    const { setAuthTkn, setPageLoader } = useAuthContext();
    const [twofaOtp2, setTwofaOtp2] = useState("");
    const [changePwdLdr, setChangePwdLdr] = useState(false);
    const [twoFaScreen, setTwoFacScreen] = useState(false)
    const [deactive, setDeactive] = useState(false)
    const [twoOpen, setTwoOpen] = useState(false)
    const [configData, setConfigData] = useState({})
    const [authenticated, setAuthenticated] = useState(false)
    const [qrcode, setQrCode] = useState("")
    const [secretKey, setSecretKey] = useState("")
    const [otp, setOtp] = useState("")
    const [twoFaDataLoader, setTwoFaDataLoader] = useState(false)
    const [twofaLoader, setTwofaLoader] = useState(false)
    const [showPwd, setShowPwd] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [fields, setFields] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const router = useRouter()
    const logout = async () => {
        const data = await signOut({ redirect: false, callbackUrl: '/' + process.env.ADMFLDR })
        router.push('/' + process.env.ADMFLDR)
    }

    const checkPass = (pass) => {
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

        }
    };
    const ClickOnEye = (field) => {
        setShowPwd({ ...showPwd, [field]: !showPwd[field] })
    }
    const RemovePasswordValidationAndValue = () => {
        setShowPwd({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",

        });
        setTwofaOtp2("")
        setFields({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

        return null
    }
    const handleChangePwdSubmit = () => {

        if (!changePwdLdr) {
            try {
                validate_string(fields.currentPassword, "current password")
                chk_password(fields.currentPassword)
                validate_string(fields.newPassword, "new password")
                chk_password(fields.newPassword)
                validate_string(fields.confirmPassword, "confirm password")
                if (fields.newPassword !== fields.confirmPassword) {
                    throw `New password and confirm password doesn't match`
                }
                chk_otp(twofaOtp2)
            } catch (e) {
                console.log(e)
                toast.error(e)
                return false
            }

            Swal.fire({
                title: 'Are you sure?',
                text: `You want to change password.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#448ec5',
                confirmButtonText: 'Yes',
            }).then(async (result) => {
                if (result.isConfirmed) {

                    setChangePwdLdr(true)
                    let bodyData = {
                        currentPassword: fields.currentPassword,
                        newPassword: fields.newPassword,
                        otp: twofaOtp2
                    };
                    const add_user = await fetchApi("user/configuration/change-password", JSON.stringify(bodyData));
                    setChangePwdLdr(false)
                    if (add_user?.statusCode == 200) {
                        toast.success(add_user?.data?.message);
                        RemovePasswordValidationAndValue()
                        logout()
                    } else {
                        if (add_user.data.message == "Unauthorized") {
                            setAuthTkn(add_user.data.message);
                        } else {
                            toast.error(add_user.data.message);
                        }
                    }
                }
            })


        }
    };
    const getQRCode = async (value) => { 
        if (configData.twoOpen == false && qrcode == "") {
            const param = { status: twoOpen ? 0 : 1 }
            const response = await fetchApi("user/configuration/generate-twofa-secrate", JSON.stringify({ params: param }), "GET")
            if (response.statusCode === 200) {
                setTwoOpen(value)
                setQrCode(response.data.data.qrcode)
                setSecretKey(response.data.data.secretKey)
                setTwoFacScreen(true);
            }
            else {
                if (response.data.message == "Unauthorized") {
                    setAuthTkn(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            }
        }

        else {
            setTwoOpen(value)
            if (configData.twoOpen == false) {
                value == true ? setTwoFacScreen(true) : setTwoFacScreen(false)
            } else {

                value == true ? setDeactive(false) : setDeactive(true)
            }
        }
    }

    const setTwoFa = async () => {
        toast.dismiss()
        if (!twofaLoader) {
            try {
                chk_otp(otp)
            } catch (e) {
                toast.error(e)
                return false
            }
            setTwofaLoader(true)
            const param = { otp: otp, status: twoOpen ? 1 : 0 }
            const response = await fetchApi("user/configuration/set-twofa-secrate", JSON.stringify(param))
            setTwofaLoader(false)
            if (response.statusCode === 200) {
                setOtp("")
                setDeactive(false)
                setTwoFacScreen(false)
                setQrCode("")
                config()
                toast.success(response.data.message)
            } else {
                if (response.data.message == "Unauthorized") {
                    setAuthTkn(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            }
        }
    }
    const config = async () => {
        setTwoFaDataLoader(true)

        try {
            toast.dismiss()
            const param = { a: 0 }
            const response = await fetchApi("user/configuration/get-config-data", JSON.stringify({ params: param }), "GET")
            if (response?.statusCode === 200) { 
                setTwoOpen(response?.data?.twoOpen ? true : false)
                setAuthenticated(response?.data?.twoOpen ? true : false)
                setConfigData(response.data)
                setPageLoader(false)
            } else {
                if (response.data.message == "Unauthorized") {
                    setAuthTkn(response?.data.message)
                } else {
                    toast.error(response?.data.message)
                }
            }
            setTwoFaDataLoader(false)
        } catch (e) {
            setTwoFaDataLoader(false)
            toast.error(e)
            return
        }
    }

    useEffect(() => {
        config()
        setPageLoader(false)
    }, [])
    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row g-6">
                    {/* <!-- View sales --> */}
                    <div className="col-xl-5">
                        <div className="card">
                            <div className="d-flex align-items-end row">
                                <div className="col-12">
                                    <div className="card-body text-nowrap configuration-card-body">
                                        <h3 className="card-title mb-0">Change Password</h3>
                                        <div className="mt-4 mb-4 configuration-card">
                                            <div className='d-flex flex-column '>

                                                <div className="mb-2"  >
                                                    <div>
                                                        <label className="col-form-label">Current Password</label>
                                                    </div>
                                                    <div className={`inputContainer form-group d-flex w-100`}>
                                                        <div className="input-group">
                                                            <input
                                                                type={showPwd["currentPassword"] ? "text" : "password"}
                                                                name="currentPassword"
                                                                value={fields["currentPassword"]}
                                                                onChange={(e) => setFields({ ...fields, currentPassword: e.target.value })}
                                                                placeholder={"Current password"}
                                                                className="form-control"
                                                                onKeyUp={(e) => e.keyCode == 13 && handleChangePwdSubmit()}
                                                            />
                                                            <span className="input-group-text cursor-pointer" onClick={() => ClickOnEye("currentPassword")}>
                                                                <i className={`${`hideShow cursor-pointer ti ti-eye${showPwd["currentPassword"] ? "" : "-off"} fs-4`}`}></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-2"  >
                                                    <div>
                                                        <label className="col-form-label">New Password</label>
                                                    </div>
                                                    <div className={`inputContainer form-group d-flex w-100 validationBox`}>

                                                        <div className="input-group">

                                                            <input
                                                                type={showPwd["newPassword"] ? "text" : "password"}
                                                                name="newPassword"
                                                                value={fields["newPassword"]}
                                                                onChange={(e) => { setFields({ ...fields, newPassword: e.target.value }) }}
                                                                placeholder={"New password"}
                                                                className="form-control"
                                                                onKeyUp={(e) => { checkPass(e.target.value), e.keyCode == 13 && handleChangePwdSubmit() }}
                                                            />
                                                            <span className="input-group-text cursor-pointer" onClick={() => ClickOnEye("newPassword")}>
                                                                <i className={`${`hideShow  ti ti-eye${showPwd["newPassword"] ? "" : "-off"} fs-4`}`}></i>
                                                            </span>

                                                        </div>
                                                        <span className='password-validation-span mt-3' >
                                                            <span><i className='fa fa-circle-xmark' id='er1'></i> 1 Number</span>
                                                            <span><i className='fa fa-circle-xmark' id='er5'></i> 1 Uppercase</span>
                                                            <span><i className='fa fa-circle-xmark' id='er2'></i> 1 Lowercase</span>
                                                            <span><i className='fa fa-circle-xmark' id='er3'></i> 1 Special Character</span>
                                                            <span><i className='fa fa-circle-xmark' id='er4'></i> Min 8 - 32 Max Character</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mb-2"  >
                                                    <div>
                                                        <label className="col-form-label">Confirm Password</label>
                                                    </div>
                                                    <div className={`inputContainer form-group d-flex w-100`}>

                                                        <div className="input-group">

                                                            <input

                                                                type={showPwd["confirmPassword"] ? "text" : "password"}
                                                                name="confirmPassword"
                                                                value={fields["confirmPassword"]}
                                                                onChange={(e) => setFields({ ...fields, confirmPassword: e.target.value })}
                                                                placeholder={"Confirm password"}
                                                                className="form-control"
                                                                onKeyUp={(e) => e.keyCode == 13 && handleChangePwdSubmit()}

                                                            />
                                                            <span className="input-group-text cursor-pointer" onClick={() => ClickOnEye("confirmPassword")}>
                                                                <i className={`${`hideShow  ti ti-eye${showPwd["confirmPassword"] ? "" : "-off"} fs-4`}`}></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-2"  >
                                                    <div>
                                                        <label className="col-form-label"  >Google authenticator OTP</label>
                                                    </div>
                                                    <div className="form-group  ">
                                                        <input placeholder="Enter google authenticator OTP" type="text" className="form-control" value={twofaOtp2} onChange={(e) => { setTwofaOtp2(e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1")) }} onKeyUp={(e) => e.keyCode == 13 && handleChangePwdSubmit()} maxLength={6} />
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-end'>
                                                    <button type="button" className="btn btn-primary" onClick={() => handleChangePwdSubmit()}>
                                                        {changePwdLdr && <Loader />}  Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <!-- View sales --> */}

                    {/* <!-- Statistics --> */}
                    <div className="col-xl-7 col-md-12">
                        <div className="card">
                            <div className="d-flex align-items-end row">
                                <div className="col-12">
                                    <div className="card-body text-nowrap configuration-card-body"> 
                                        <div className="pf-column-container"> 
                                            <div className="pf-column-content">
                                                <div className='pf-content'>
                                                    <div className='pf-frame '>
                                                    

                                                        <div className='pf-frame-header d-flex justify-content-between ga-header'>

                                                            <span className={`twoFaStatus ${authenticated ? "twoFaStatusOn" : "twoFaStatusOff"}`}   ><i className={`fa fa-circle me-1 ${authenticated ? "twoFaStatusOnBlink " : ""}`}></i> {authenticated ? "Activated" : 'Deactivated'}</span>

                                                            <span className="pr-2">   <h3 className="card-title mb-0">Google Authentication</h3></span>
                                                            <span>
                                                                <span className="twofaSection">
                                                                    {twoFaDataLoader
                                                                        ? <ButtonSpinner show={twoFaDataLoader} />
                                                                        : <label className={twoOpen == 1 ? "" : "togggleOff "}  >

                                                                            <span className="switchery switchery-small"  ><small  ></small></span>
                                                                            <input type="checkbox" onChange={(e) => getQRCode(twoOpen == true ? false : true)} defaultChecked={twoOpen === true ? true : false} data-plugin="switchery" data-color="#ff7aa3" className='d-none' data-switchery="true" />

                                                                        </label>}
                                                                </span>  
                                                            </span>
                                                            </div>
                                                        {twoFaScreen ?
                                                            <div className="text-center ">
                                                                <p className="mt-2 mb-2 ">Scan this QR code in the Google Authenticator app.</p>
                                                                <img src={qrcode} className="qrCodeImg" />
                                                                <p className=' mt-3'> If you are unable to scan the QR code, please enter this code manually into the app.</p>
                                                                <div className='d-flex   align-items-center'>



                                                                    <div className="input-group mt-3">
                                                                        <input
                                                                            type={'text'}
                                                                            name="secretKey"
                                                                            className="form-control readOnlyInput"
                                                                            value={secretKey}
                                                                            readOnly

                                                                        />
                                                                        <span className="input-group-text cursor-pointer">
                                                                            <CopyToClipboard text={secretKey} onCopy={() => { toast.success('Copied to clipboard') }}>
                                                                                <i className='fa fa-copy'></i>
                                                                            </CopyToClipboard>
                                                                        </span>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                            : ""
                                                        }
                                                        {deactive || twoFaScreen ? (
                                                            <div  >

                                                                <div className=" mt-3">
                                                                    {!deactive ? "" : <label htmlFor="" className="form-label">Deactive Google Authentication</label>}

                                                                    <input
                                                                        name="otp"
                                                                        placeholder={'Enter OTP'}
                                                                        className="form-control"
                                                                        value={otp}
                                                                        autoComplete="false"
                                                                        onChange={(e) => setOtp(e.target.value = e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1"))}
                                                                        onKeyUp={(e) => e.keyCode == 13 && setTwoFa()}
                                                                        maxLength={6}
                                                                    />

                                                                </div>
                                                                <div className="text-end mt-2">
                                                                    <button className="btn btn-primary" disabled={twofaLoader} onClick={() => setTwoFa()}>{twofaLoader ? <i className="fa fa-refresh fa-spin mx-1"></i> : ""} Submit</button>
                                                                </div>
                                                            </div>
                                                        ) : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>




        </>
    )
}

export default Dashboard