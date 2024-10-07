"use client"
import React, {   useEffect, useState } from 'react'
import toast  from 'react-hot-toast'
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/flatpickr.css"
import Pagination from "react-js-pagination";
import Loader from '../../../../components/include/Loader'
import { useAuthContext } from '../../../../context/auth'
import Table_Loader from '../../../../components/include/TableLoader'
import { fetchApi } from '../../../../utils/frondend'
import {   convert_date } from '../../../../utils/common'
import Swal from 'sweetalert2';
import Dropdown from 'react-bootstrap/Dropdown'; 
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
    const [recordCount, setRecordCount] = useState(0)
    const [userList, setUserList] = useState([])
    const [status, setStatus] = useState("")
    const [verify, setVerify] = useState("")  
    const verify_Options = [{ label: 'All', value: '' }, { label: 'Active', value: '1' }, { label: 'Deactive', value: '0' },{ label: 'Block', value: '2' }];
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
            })
            const response = await fetchApi("package/package-list", sponserbonusBody, "GET")
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

 

 
 
 

    

    return (
        <> 
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">Package List</h5>

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

                                <div className='cust-input'>
                                    <Select options={verify_Options}
                                        value={verify_Options.find(option => option.value === verify)}
                                        onChange={(selectedOption) => { setStatus(selectedOption.value); }} />
                                </div>
                            </div>
                        </div> 
                         
                        <div className='col-xl-3 col-lg-4 col-md-6 col-12'>
                            <label>Package Name</label>
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
                            <thead>
                                <tr>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(0)}}>
                                            <div  >#</div>
                                            <div className="sort-icons-position" onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(0)}}>
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 0 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 0 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(1)}}>
                                            <div  >Package Name</div>
                                            <div className="sort-icons-position" >
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 1 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 1 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(2)}}>
                                            <div  >Amount</div>
                                            <div className="sort-icons-position" >
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                   
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(3)}}>
                                            <div  >Reward Type</div>
                                            <div className="sort-icons-position" >
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 3 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 3 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(4)}}>
                                            <div >Created On</div>
                                            <div className="sort-icons-position" >
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 4 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 4 ? `text-primary` : "text-muted"} `}></i>
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
                            <tbody className="table-border-bottom-0">
                                {userList && !searchLdr ? userList.map((data, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <span className="fw-medium">{data.num}</span>
                                            </td>
                                            <td> 
                                                <span className="fw-medium">{data.packageName
                                                }</span>
                                            </td>
                                            <td>{data.price}</td>
                                            
                                            <td><span className={`badge bg-label-${data.reward_type == 1 ? 'success' : data.reward_type == 0 ? 'danger' : 'dark'} me-1`}>{data.reward_type == 1 ? 'Active' : data.reward_type == 0 ? 'Deactive' : 'Block'}</span></td>
                                             <td onClick={()=>console.log(data)}>{data.date>0? convert_date(data.date):"-"}</td>
                                            <td>
                                                <div className='actionBox'> 
                                                    <button className='btn btn-primary btn-sm'>Edit</button>
                                                  </div>
                                            </td>
                                        </tr>
                                    )
                                }) : ""}

                                {
                                    searchLdr ? <tr>
                                        <td colSpan={7} className="text-center table-loader">
                                            <Table_Loader />
                                        </td>
                                    </tr>
                                        : !searchLdr && !userList.length ?
                                            <tr>
                                                <td className="text-center" colSpan={7}>
                                                    <img src="/assets/image/not_found.svg" className='nodata-found' alt="no data" />
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