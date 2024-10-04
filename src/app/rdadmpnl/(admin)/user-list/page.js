"use client"
import React, { use, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/flatpickr.css"
import Pagination from "react-js-pagination";
import Loader from '../../../../components/include/Loader'
import { useAuthContext } from '../../../../context/auth'
import Table_Loader from '../../../../components/include/TableLoader'
import { fetchApi } from '../../../../utils/frondend'
import { chk_otp, convert_date, trunc, validate_string } from '../../../../utils/common'
import Swal from 'sweetalert2';
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal } from 'react-bootstrap'
import Link from 'next/link'
import { userTableData } from '@/utils/tempData'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Select from 'react-select'
const moment = require('moment')
moment.suppressDeprecationWarnings = true

export default function UserList() {
    const { setAuthTkn, setPageLoader } = useAuthContext()
    const [order, setOrder] = useState(1)
    const [orderClm, setOrderClm] = useState(0)
    const [search, setSearch] = useState("")
    const [searchLdr, setSearchLdr] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [userList, setUserList] = useState([])
    const [status, setStatus] = useState("")
    const [verify, setVerify] = useState("")
    const [refCode, setRefCode] = useState("")
    const [userIndex, setUserIndex] = useState(-1)
    const [userActivationLdr, setUserActivationLdr] = useState(false)
    const [userVerificationIndex, setUserVerificationIndex] = useState(-1)
    const [userVerificationLdr, setUserVerificationLdr] = useState(false)
    const [changePassMdl, setChangePassMdl] = useState(false)
    const [userPass, setUserPass] = useState({
        adminPass: "",
        userNewPass: "",
        otp: "",
        loder: false
    })
    const [validLine, setvalidLine] = useState(false)
    const [msg, setMsg] = useState("")
    const [pwdType, setPwdType] = useState({ admin: "password", user: "password" })
    const [userId, setUserId] = useState("")
    const [addClientIndex, setAddClientIndex] = useState(-1)
    const [addClientLoader, setAddClientLoader] = useState(false)
    const verify_Options = [{ label: 'All', value: '' }, { label: 'Active', value: '1' }, { label: 'Deactive', value: '0' }];
    let date = moment(new Date()).subtract(process.env.FILTER_MONTH, "month")
    const [dateRange, setDateRange] = useState([date['_d'], date['_i']])
    let _dateRange = [
        Math.floor(new Date(moment(moment(dateRange[0]).format('MM/DD/YYYY')).add(0, 'h').add(0, 'm').add(0, 's')).getTime() / 1000),
        Math.floor(new Date(moment(moment(dateRange[1]).format('MM/DD/YYYY')).add(23, 'h').add(59, 'm').add(59, 's')).getTime() / 1000)
    ]

    const getuserList = async () => {
        if (!searchLdr) {
            setSearchLdr(true)
            const sponserbonusBody = JSON.stringify({
                page: page - 1,
                order,
                orderColumn: orderClm,
                startDate: _dateRange[0],
                endDate: _dateRange[1],
                search,
                status,
                verify,
                refCode
            })
            const response = { statusCode: 200, data: { data: userTableData, total: 5 } } //await fetchApi("user/user-list", sponserbonusBody, "GET")
            setPageLoader(false)
            if (response.statusCode == 200) {
                setSearchLdr(false)
                setUserList(response.data.data)
                setTotalPage(response.data.total)
            } else {
                setSearchLdr(false)
                if (response.data.message == "Unauthorized" || response.data.message == "Logout") {
                    setAuthTkn(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            }
        }
    }

    const searchList = () => {
        if (!dateRange[0] || !dateRange[1]) {
            toast.error("Please select both start and end dates.")
            return false
        }
        if (page > 1) {
            setPage(1)
        } else {
            getuserList()
        }
    }

    useEffect(() => { getuserList() }, [page, order, orderClm])

    const userActivation = (status, userId, userName, i) => {
        if (!userActivationLdr) {
            Swal.fire({
                title: 'Are you sure?',
                text: `You want to ${status == 1 ? "active" : status == 0 ? "deactive" : "block"} user ${userName}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#448ec5',
                confirmButtonText: 'Yes',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setUserActivationLdr(true)
                    setUserIndex(i)
                    const ActivationData = JSON.stringify({
                        status: status,
                        userId: userId,
                    })
                    const response = await fetchApi("user/user-activation", ActivationData);
                    setUserActivationLdr(false)
                    setUserIndex(-1)
                    if (response.statusCode == 200) {
                        toast.success(response.data.message)
                        getuserList()
                    } else {
                        if (response.data.message == "Unauthorized" || response.data.message == "Logout") {
                            setAuthTkn(response.data.message)
                        } else {
                            toast.error(response.data.message)
                        }
                    }
                }
            })
        }
    }

    const userVerificarion = (userId, userName, i) => {
        if (!userVerificationLdr) {
            Swal.fire({
                title: 'Are you sure?',
                text: `You want to verify user ${userName}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#448ec5',
                confirmButtonText: 'Yes',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setUserVerificationLdr(true)
                    setUserVerificationIndex(i)
                    const ActivationData = JSON.stringify({
                        userId,
                    })
                    const response = await fetchApi("user/user-verification", ActivationData);
                    setUserVerificationLdr(false)
                    setUserVerificationIndex(-1)
                    if (response.statusCode == 200) {
                        toast.success(response.data.message)
                        getuserList()
                    } else {
                        if (response.data.message == "Unauthorized" || response.data.message == "Logout") {
                            setAuthTkn(response.data.message)
                        } else {
                            toast.error(response.data.message)
                        }
                    }
                }
            })
        }
    }

    const closeChangePassMdl = () => {
        setChangePassMdl(false)
        setUserPass({ adminPass: "", userNewPass: "", otp: "" })
        setPwdType({ admin: "password", user: "password" })
    }
    const chkPassword = (password) => {
        setvalidLine(true)
        let v = password
        let digit = /[0-9]/
        let lower = /[a-z]/
        let cap = /[A-Z]/
        let spchar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        if (v == "" || v == undefined) {
            $("#er1").addClass("text-danger").removeClass("text-success")
            $("#er2").addClass("text-danger").removeClass("text-success")
            $("#er3").addClass("text-danger").removeClass("text-success")
            $("#er4").addClass("text-danger").removeClass("text-success")
            $("#er5").addClass("text-danger").removeClass("text-success")
        } else {
            var c = v.length;
            $("#er1")
                .addClass(v.match(digit) ? "text-success" : "text-danger")
                .removeClass(v.match(digit) ? "text-danger" : "text-success")
            $("#er2")
                .addClass(v.match(lower) ? "text-success" : "text-danger")
                .removeClass(v.match(lower) ? "text-danger" : "text-success")
            $("#er3")
                .addClass(v.match(spchar) ? "text-success" : "text-danger")
                .removeClass(v.match(spchar) ? "text-danger" : "text-success")
            $("#er4")
                .addClass(c < 8 || c > 30 ? "text-danger" : "text-success")
                .removeClass(c < 8 || c > 30 ? "text-success" : "text-danger")
            $("#er5")
                .addClass(v.match(cap) ? "text-success" : "text-danger")
                .removeClass(v.match(cap) ? "text-danger" : "text-success")
            if (
                $("#er5").hasClass("text-success") &&
                $("#er2").hasClass("text-success") &&
                $("#er3").hasClass("text-success") &&
                $("#er4").hasClass("text-success") &&
                $("#er1").hasClass("text-success")
            ) {
                setMsg("");
            } else {
                setMsg(
                    "Password should contain 8 - 32 character,contains capital, lowercase, number and special character"
                );
            }
        }
    }
    const setType = (t) => {
        if (t == "admin") {
            pwdType.admin == "password" ? setPwdType({ ...pwdType, admin: "text" }) : setPwdType({ ...pwdType, admin: "password" });
        }
        if (t == "user") {
            pwdType.user == "password" ? setPwdType({ ...pwdType, user: "text" }) : setPwdType({ ...pwdType, user: "password" });
        }
    }
    const changeUserPassword = async () => {
        if (!userPass.loder) {
            try {
                validate_string(userPass.adminPass, "admin password")
                validate_string(userPass.userNewPass, "user's new password")
                if (msg) {
                    toast.error(msg)
                    return false
                }
                chk_otp(userPass.otp)
            } catch (e) {
                toast.error(e)
                return false
            }
            setUserPass({ ...userPass, loder: true })
            const passwordData = JSON.stringify({
                adminPass: userPass.adminPass,
                userPassword: userPass.userNewPass,
                otp: userPass.otp,
                userId
            })
            const response = await fetchApi("user/change-user-password", passwordData);
            setUserPass({ ...userPass, loder: false })
            if (response.statusCode == 200) {
                toast.success(response.data.message)
                getuserList()
                closeChangePassMdl()
            } else {
                if (response.data.message == "Unauthorized" || response.data.message == "Logout") {
                    setAuthTkn(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            }
        }
    }

    const addClient = async (userId, index) => {
        if (!addClientLoader) {
            Swal.fire({
                title: 'Are you sure?',
                text: `You want to add client.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#448ec5',
                confirmButtonText: 'Yes',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setAddClientIndex(index)
                    setAddClientLoader(true)
                    const response = await fetchApi("user/add-client", JSON.stringify({ userId }))
                    setAddClientLoader(false)
                    setAddClientIndex(-1)
                    if (response.statusCode == 200) {
                        toast.success(response.data.message)
                        getuserList()
                    } else {
                        if (response.data.message == "Unauthorized" || response.data.message == "Logout") {
                            setAuthTkn(response.data.message)
                        } else {
                            toast.error(response.data.message)
                        }
                    }
                }
            })
        }
    }

    return (
        <>




            <div class="container-xxl flex-grow-1 container-p-y">
                <div class="card">
                    <h5 class="card-header">Table Basic</h5>

                    <div className='row card-body'>
                        <div className='col-xl-3 col-lg-4 col-md-6 col-12 custom'>
                            <div className="form-group">
                                <label>Date</label>
                                <div className="cust-form-control h-45">
                                    <Flatpickr
                                        className='form-control'
                                        options={{
                                            defaultDate: [dateRange[0], dateRange[1]],
                                            altInput: true,
                                            altFormat: "j, M Y",
                                            dateFormat: "Y-m-d",
                                            showMonths: 1,
                                            mode: "range",
                                        }}
                                        onChange={(update) => {
                                            setDateRange([update[0], update[1] || ""])
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-3 col-lg-4 col-md-6 col-12'>
                            <div className="form-group">
                                <label>Status</label>
                                {/* <div className="cust-input">
                                    <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">All</option>
                                        <option value="1">Active</option>
                                        <option value="0">Deactive</option>
                                        <option value="2">Block</option>
                                    </select>
                                </div> */}

                                <div className='cust-input'>
                                    <Select options={verify_Options}
                                        value={verify_Options.find(option => option.value === verify)}
                                        onChange={(selectedOption) => { setVerify(selectedOption.value); }} />
                                </div>
                            </div>
                        </div>
                        {/* <div className='col-xl-3 col-lg-4 col-md-6 col-12'>
                            <div className="form-group">
                                <label>Verify</label>
                                <div className="cust-input">
                                    <select className="form-control" value={verify} onChange={(e) => setVerify(e.target.value)}>
                                        <option value="">All</option>
                                        <option value="1">Verify</option>
                                        <option value="0">Not Verify</option>
                                    </select>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className='col-xl-3 col-lg-4 col-md-6 col-12'>
                            <label>Referral Code</label>
                            <div className='cust-input'>
                                <input placeholder='Search...' className="form-control" value={refCode} onChange={(e) => setRefCode(e.target.value)} />
                            </div>
                        </div> */}
                        <div className='col-xl-3 col-lg-4 col-md-6 col-12'>
                            <label>Username/Wallet Address</label>
                            <div className='cust-input'>
                                <input placeholder='Search...' className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>
                        <div className='col-xl-1 col-lg-4 col-md-6 col-12 align-self-end d-flex'>
                            <div className="form-group text-center">
                                <button className="btn btn-primary waves-effect  waves-light" onClick={() => { searchList() }}>{searchLdr ? <Loader /> : ""} Search</button>
                            </div>
                        </div>
                    </div>

                    <div class="table-responsive text-nowrap card-body">
                        {/* <table  className="table table-sm datatable-invoice border-top dataTable no-footer dtr-column">
        							<thead>
        								<tr>
        									<th scope="col" className="c-pointer text-center text-nowrap cursor-pointer" onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(0) }}>
        										<div className='d-flex justify-content-center'>
        											<div>#</div>
        											<div className="sort-icons-position">
        												<i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 0 ? `text-primary` : "text-muted"} `}></i>
        												<i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 0 ? `text-primary` : "text-muted"} `}></i>
        											</div>
        										</div>
        									</th>
        									<th scope="col" className="c-pointer text-center text-nowrap cursor-pointer" onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(1) }}>
        										<div className='d-flex justify-content-center'>
        											<div>Username</div>
        											<div className="sort-icons-position">
        												<i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 1 ? `text-primary` : "text-muted"} `}></i>
        												<i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 1 ? `text-primary` : "text-muted"} `}></i>
        											</div>
        										</div>
        									</th>
        									<th scope="col" className="c-pointer text-center text-nowrap cursor-pointer" onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(2) }}>
        										<div className='d-flex justify-content-center'>
        											<div>Name</div>
        											<div className="sort-icons-position">
        												<i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
        												<i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
        											</div>
        										</div>
        									</th>
        									<th scope="col" className="c-pointer text-center text-nowrap cursor-pointer" onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(14) }}>
        										<div className='d-flex justify-content-center'>
        											<div>Wallet Address</div>
        											<div className="sort-icons-position">
        												<i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 14 ? `text-primary` : "text-muted"} `}></i>
        												<i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 14 ? `text-primary` : "text-muted"} `}></i>
        											</div>
        										</div>
        									</th>

        									<th scope="col" className="c-pointer text-center text-nowrap cursor-pointer">
        										Membership Status
        									</th>
        									<th scope="col" className="c-pointer text-center text-nowrap cursor-pointer">
        										Referral Code
        									</th>
        									<th scope="col" className="c-pointer text-center text-nowrap cursor-pointer">
        										Sponser
        									</th>


        									<th scope="col" className="c-pointer text-center text-nowrap cursor-pointer">
        										Action
        									</th>
        								</tr>
        							</thead>
        							<tbody>
        								{userList && !searchLdr ? userList.map((data, index) => {
        									return (
        										<tr key={index}>
        											<td className='text-center text-nowrap'>{data.num}</td>
        											<td className='text-center text-nowrap'>{data.userName}</td>
        											<td className='text-center text-nowrap'>{data.name}</td>
        											<td className='text-center text-nowrap'>
        												{data.walletAddress ?
        													<Link className='text-primary' target='_blank' href={process.env.EXPLORER_URL + 'address/' + data.walletAddress}>{trunc(data.walletAddress)}</Link>
        													: "-"}
        											</td> 
        											<td className='text-center text-nowrap'>
        												<img src={process.env.IMAGE_PREVIEW + "/images/" + data.subscriptionName + ".svg"} alt="nft-image" className="membership-image" />
        												&nbsp;
        												{data.subscriptionName} {data.isLifeTime == 1 ? "Life time" : ""} Membership
        											</td>
        											<td className='text-center text-nowrap'> {data.referralCode} </td>
        											<td className='text-center text-nowrap'> {data.sponserName} </td>


        											<td className='text-start text-nowrap'>
        												<div className='d-flex justify-content-start'>
        													<button className="mr-2 btn-sm btn btn-purple waves-effect  waves-light"
        														onClick={() => { setChangePassMdl(true), setUserId(data.userId) }}>
        														<i className='fas fa-user-lock' />
        													</button>
        													<Dropdown className='custom-dropdown mr-2'>
        														<Dropdown.Toggle className='btn-sm' variant={data.isActive === 0 ? "warning " : data.isActive === 1 ? "success" : data.isActive === 2 ? "danger" : ""} id="dropdown-basic">
        															{userIndex == index && userActivationLdr ? <Loader /> : ''}
        															{data.isActive === 0 ? "Deactive" : data.isActive === 1 ? "Active" : data.isActive === 2 ? "Block" : ""}
        														</Dropdown.Toggle>
        														<Dropdown.Menu>
        															{data.isActive != 0 ? <Dropdown.Item onClick={() => { userActivation(0, data.userId, data.userName, index) }}>Deactive</Dropdown.Item> : ""}
        															{data.isActive != 1 ? <Dropdown.Item onClick={() => { userActivation(1, data.userId, data.userName, index) }}>Active</Dropdown.Item> : ""}
        															{data.isActive != 2 ? <Dropdown.Item onClick={() => { userActivation(2, data.userId, data.userName, index) }}>Block</Dropdown.Item> : ""}
        														</Dropdown.Menu>
        													</Dropdown>
        													{data.isVerify == 0 ?
        														<button className="mr-2 btn-sm btn btn-info waves-effect  waves-light" onClick={() => { userVerificarion(data.userId, data.userName, index) }}>  {userVerificationIndex == index && userVerificationLdr ? <Loader /> : ''} Verify</button>
        														: ""}
        													{data.isClient == 0 ? <button className="mr-2 btn-sm btn btn-blue waves-effect waves-light" onClick={() => addClient(data.userId, index)}>{index == addClientIndex && addClientLoader ? <Loader /> : ""} Add Client</button> : ""}

        												</div>
        											</td>
        										</tr>)
        								}) : ""}
        								{
        									searchLdr ? <tr>
        										<td colSpan={20} className="text-center table-loader">
        											<Table_Loader />
        										</td>
        									</tr>
        										: !searchLdr && !userList.length ?
        											<tr>
        												<td className="text-center" colSpan={20}>
        													<img src="/assets/images/no-data.png" className='nodata-found' alt="no data" />
        												</td>
        											</tr> : ''
        								}
        							</tbody>
        						</table> */}
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>
                                        <div className='d-flex'>
                                            <div>#</div>
                                            <div className="sort-icons-position">
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex'>
                                            <div>Project</div>
                                            <div className="sort-icons-position">
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex'>
                                            <div>Client</div>
                                            <div className="sort-icons-position">
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex'>
                                            <div>Users</div>
                                            <div className="sort-icons-position">
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex'>
                                            <div>Status</div>
                                            <div className="sort-icons-position">
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th  >
                                        <div  >
                                            <div>Actions</div>

                                        </div>
                                    </th>


                                </tr>
                            </thead>
                            <tbody class="table-border-bottom-0">
                                {userList && !searchLdr ? userList.map((data, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <span class="fw-medium">{data.num}</span>
                                            </td>
                                            <td>
                                                <i class="ti ti-brand-angular ti-md text-danger me-4"></i>
                                                <span class="fw-medium">{data.userName}</span>
                                            </td>
                                            <td>{data.referralCode}</td>
                                            <td>
                                                {data.sponserName}
                                            </td>
                                            <td><span class={`badge bg-label-${data.isActive == 1 ? 'success' : data.isActive == 0 ? 'danger' : 'danger'} me-1`}>{data.isActive == 1 ? 'Active' : data.isActive == 0 ? 'Inactive' : 'Block'}</span></td>
                                            <td>
                                                <div className='  actionBox'>
                                                    <button className="mr-2 btn-sm btn btn-purple waves-effect  waves-light"
                                                        onClick={() => { setChangePassMdl(true), setUserId(data.userId) }}>
                                                        <i className='fas fa-user-lock' />
                                                    </button>
                                                    <Dropdown className='custom-dropdown mr-2'>
                                                        <Dropdown.Toggle className='btn-sm' variant={data.isActive === 0 ? "danger " : data.isActive === 1 ? "success" : data.isActive === 2 ? "danger" : ""} id="dropdown-basic">
                                                            {userIndex == index && userActivationLdr ? <Loader /> : ''}
                                                            {data.isActive === 0 ? "Deactive" : data.isActive === 1 ? "Active" : data.isActive === 2 ? "Block" : ""}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {data.isActive != 0 ? <Dropdown.Item onClick={() => { userActivation(0, data.userId, data.userName, index) }}>Deactive</Dropdown.Item> : ""}
                                                            {data.isActive != 1 ? <Dropdown.Item onClick={() => { userActivation(1, data.userId, data.userName, index) }}>Active</Dropdown.Item> : ""}
                                                            {data.isActive != 2 ? <Dropdown.Item onClick={() => { userActivation(2, data.userId, data.userName, index) }}>Block</Dropdown.Item> : ""}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    {data.isVerify == 0 ?
                                                        <button className="mr-2 btn-sm btn btn-info waves-effect  waves-light" onClick={() => { userVerificarion(data.userId, data.userName, index) }}>  {userVerificationIndex == index && userVerificationLdr ? <Loader /> : ''} Verify</button>
                                                        : ""}
                                                    {data.isClient == 0 ? <button className="mr-2 btn-sm btn btn-blue waves-effect waves-light" onClick={() => addClient(data.userId, index)}>{index == addClientIndex && addClientLoader ? <Loader /> : ""} Add Client</button> : ""}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }) : ""}

                                {
                                    searchLdr ? <tr>
                                        <td colSpan={6} className="text-center table-loader">
                                            <Table_Loader />
                                        </td>
                                    </tr>
                                        : !searchLdr && !userList.length ?
                                            <tr>
                                                <td className="text-center" colSpan={6}>
                                                    <img src="/assets/images/not_found.svg" className='nodata-found' alt="no data" />
                                                </td>
                                            </tr> : ''
                                }
                            </tbody>
                        </table>
                        {userList.length > 0 && !searchLdr ? (
                            <div className="col-12 pagination-box text-center position-relative justify-content-center d-flex ">

                                <Pagination
                                    activePage={page}
                                    itemsCountPerPage={10}
                                    totalItemsCount={50}
                                    pageRangeDisplayed={5}
                                    onChange={(p) => { setPage(p) }}
                                    activeclassName={'active'}
                                />
                            </div>
                        ) : ""}
                    </div>
                    <Modal show={changePassMdl} centered onHide={() => { closeChangePassMdl() }}>
                        <Modal.Header className="modal-header d-flex align-items-baseline">
                            <h5 className="modal-title fw-bold fs-18 text-primary"> Change User Password</h5>
                            <div><button className='btn btn-primary btn-sm' onClick={() => { closeChangePassMdl() }}><i className='fa fa-close'></i></button></div>

                        </Modal.Header>
                        <Modal.Body className='px-3'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className="form-group">
                                        <label className="form-label">Admin Password</label>
                                        <div className="input-group">
                                            <input type={pwdType.admin} placeholder="Enter admin password" className="form-control" value={userPass.adminPass} onChange={(e) => setUserPass({ ...userPass, adminPass: e.target.value })} onKeyUp={(e) => e.keyCode == 13 && changeUserPassword()} />
                                            <span className="input-group-text"><i className={`fa fa-eye${pwdType.admin === "password" ? '-slash' : ""}`} onClick={() => setType("admin")}></i></span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-12'>
                                    <div className="form-group">
                                        <label className="form-label">User's New Password</label>
                                        <div className="input-group">
                                            <input type={pwdType.user} placeholder="Enter user's new password" className="form-control" value={userPass.userNewPass} onChange={(e) => { setUserPass({ ...userPass, userNewPass: e.target.value }), chkPassword(e.target.value) }} onKeyUp={(e) => e.keyCode == 13 && changeUserPassword()} />
                                            <span className="input-group-text"><i className={`fa fa-eye${pwdType.user === "password" ? '-slash' : ""}`} onClick={() => setType("user")}></i></span>
                                        </div>
                                        {validLine ? <div className='row'>
                                            <div className='col-6'>
                                                <div id="er1" className="pass-valid fs-14">1 Number </div>
                                                <div id="er2" className="pass-valid fs-14"> 1 Lowercase</div>
                                                <div id="er4" className="pass-valid fs-14">Min 8 - 30 Max Character</div>
                                            </div>
                                            <div className='col-6'>
                                                <div id="er5" className="pass-valid fs-14">1 Uppercase  </div>
                                                <div id="er3" className="pass-valid fs-14">1 Special Character</div><br />
                                            </div>
                                        </div> : ""}
                                    </div>
                                </div>

                                <div className='col-12 '>
                                    <div className="form-group ">
                                        <label>2FA OTP</label>
                                        <input placeholder="Enter 2FA OTP" type="text" className="form-control" value={userPass.otp} onChange={(e) => { setUserPass({ ...userPass, otp: e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1") }) }} onKeyUp={(e) => e.keyCode == 13 && changeUserPassword()} maxLength={6} />
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="mr-2 btn-sm btn btn-primary waves-effect  waves-light" onClick={() => { changeUserPassword() }}>  {userPass.loder ? <Loader /> : ''} Submit</button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </div>

        </>
    )
}