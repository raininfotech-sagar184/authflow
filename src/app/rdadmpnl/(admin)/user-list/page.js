"use client"
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/flatpickr.css"
import Pagination from "react-js-pagination";
import Loader from '../../../../components/include/Loader'
import { useAuthContext } from '../../../../context/auth'
import Table_Loader from '../../../../components/include/TableLoader'
import { fetchApi } from '../../../../utils/frondend'
import { convert_date } from '../../../../utils/common'
import Swal from 'sweetalert2';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from 'react-select'
import { useSession, signIn, signOut } from "next-auth/react";
const moment = require('moment')
moment.suppressDeprecationWarnings = true

export default function UserList() {
    const { data: session } = useSession();
    const { setAuthTkn, setPageLoader } = useAuthContext()
    const [order, setOrder] = useState(1)
    const [orderClm, setOrderClm] = useState(0)
    const [search, setSearch] = useState("")
    const [searchLdr, setSearchLdr] = useState(false)
    const [page, setPage] = useState(1)
    const [recordCount, setRecordCount] = useState(0)
    const [userList, setUserList] = useState([])
    const [status, setStatus] = useState("")
    const [verify, setVerify] = useState("")
    const [userIndex, setUserIndex] = useState(-1)
    const [userActivationLdr, setUserActivationLdr] = useState(false)
    const [userVerificationIndex, setUserVerificationIndex] = useState(-1)
    const [userVerificationLdr, setUserVerificationLdr] = useState(false)
    const verify_Options = [{ label: 'All', value: '' }, { label: 'Active', value: '1' }, { label: 'Deactive', value: '0' }, { label: 'Block', value: '2' }];
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
                verify
            })
            const response = await fetchApi("user/user-list", sponserbonusBody, "GET")
            setPageLoader(false)
            if (response.statusCode == 200) {
                setSearchLdr(false)
                setUserList(response.data.data)
                setRecordCount(response.data.total)
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

    return (
        <>
            <Toaster position="top-right" />
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header" >User List</h5>

                    <div className={`row card-body`}>
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
                            <div className="form-group" onClick={() => console.log(status)}>
                                <label>Status</label>

                                <div className='cust-input'>
                                    <Select options={verify_Options}
                                        value={verify_Options.find(option => option.value == status)}
                                        onChange={(selectedOption) => { setStatus(selectedOption.value); }} />
                                </div>
                            </div>
                        </div>

                        <div className='col-xl-3 col-lg-4 col-md-6 col-12'>
                            <label>Username/Email</label>
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

                    <div className="table-responsive text-nowrap card-body">

                        <table className="table"> 
                            <thead className={(userList && userList.length > 0) && !searchLdr ? "" : "d-none"}>
                                <tr>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(0) }}>
                                            <div  >#</div>
                                            <div className="sort-icons-position" onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(0) }}>
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 0 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 0 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(1) }}>
                                            <div  >User Name</div>
                                            <div className="sort-icons-position" >
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 1 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 1 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(2) }}>
                                            <div  >Email</div>
                                            <div className="sort-icons-position" >
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(3) }}>
                                            <div  >Status</div>
                                            <div className="sort-icons-position" >
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 3 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 3 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(4) }}>
                                            <div  >KYC Status</div>
                                            <div className="sort-icons-position" >
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 4 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 4 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(5) }}>
                                            <div  >Varried</div>
                                            <div className="sort-icons-position" >
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 5 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 5 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(6) }}>
                                            <div >Created On</div>
                                            <div className="sort-icons-position" >
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 6 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 6 ? `text-primary` : "text-muted"} `}></i>
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
                            <tbody >
                                {(userList && userList.length > 0) && !searchLdr   ? userList.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <span className="fw-medium">{data?.num}</span>
                                            </td>
                                            <td>
                                                <span className="fw-medium">{data?.userName}</span>
                                            </td>
                                            <td>{data?.email}</td>
                                            <td>
                                                <Dropdown className='custom-dropdown mr-2'>
                                                    <Dropdown.Toggle className='btn-sm' variant={data.status === 0 ? "danger " : data.status === 1 ? "success" : data.status === 2 ? "secondary" : ""} id="dropdown-basic">
                                                        {userIndex == index && userActivationLdr ? <Loader /> : ''}
                                                        {data.status === 0 ? "Deactive" : data.status === 1 ? "Active" : data.status === 2 ? "Block" : ""}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {data.status != 0 ? <Dropdown.Item onClick={() => { userActivation(0, data.id, data.userName, index) }}>Deactive</Dropdown.Item> : ""}
                                                        {data.status != 1 ? <Dropdown.Item onClick={() => { userActivation(1, data.id, data.userName, index) }}>Active</Dropdown.Item> : ""}
                                                        {data.status != 2 ? <Dropdown.Item onClick={() => { userActivation(2, data.id, data.userName, index) }}>Block</Dropdown.Item> : ""}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>

                                            <td><span className={`badge bg-label-${data?.kyc_status == 2 ? 'success' : data?.kyc_status == 0 ? 'dark' : 'danger'} me-1`}>{data?.kyc_status == 2 ? 'Varified' : data?.kyc_status == 0 ? 'Not applied' : 'Rejected'}</span></td>
                                            <td><span className={`badge bg-label-${data?.verify == 1 ? 'success' : 'danger'} me-1`}>{data?.verify == 1 ? 'Yes' : 'No'}</span></td>
                                            <td >{data?.date > 0 ? convert_date(data?.date) : "-"}</td>
                                            <td>
                                                <div className='  actionBox'>
                                                    {data.verify == 0 ?
                                                        <button className="mr-2 btn-sm btn btn-info waves-effect  waves-light" onClick={() => { userVerificarion(data.id, data.userName, index) }}>  {userVerificationIndex == index && userVerificationLdr ? <Loader /> : ''} Verify</button>
                                                        : ""}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }) : <>
                                    <tr>
                                        {searchLdr ? <>

                                            <td colSpan={8} className="text-center table-loader">
                                                <Table_Loader />
                                            </td>
                                        </> : <>
                                            <td className="text-center" colSpan={8}>
                                                <img src="/assets/image/not_found.svg" className='nodata-found' alt="no data" />
                                            </td>
                                        </>}

                                    </tr> 
                                    </>}


                            </tbody>
                        </table>
                        {userList.length > 0 && !searchLdr ? (
                            <div className="col-12 pagination-box text-center position-relative justify-content-center d-flex ">
                                <Pagination
                                    activePage={page}
                                    itemsCountPerPage={10}
                                    totalItemsCount={recordCount}
                                    pageRangeDisplayed={5}
                                    onChange={(p) => { setPage(p) }}
                                    activeclassName={'active'}
                                />
                            </div>
                        ) : ""}
                    </div>

                </div>

            </div>

        </>
    )
}