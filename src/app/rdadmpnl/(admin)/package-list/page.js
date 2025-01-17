"use client"
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/flatpickr.css"
import Pagination from "react-js-pagination";
import Loader from '../../../../components/include/Loader'
import { useAuthContext } from '../../../../context/auth'
import Table_Loader from '../../../../components/include/TableLoader'
import { fetchApi, fetchApi_with_upload } from '../../../../utils/frondend'
import { convert_date, validate_input_number, validate_input_number_in_range, validate_string, validateFile } from '../../../../utils/common'
import Select from 'react-select'
import Modal from 'react-bootstrap/Modal';
const moment = require('moment')
moment.suppressDeprecationWarnings = true

export default function PackageList() {
    const { setAuthTkn, setPageLoader } = useAuthContext()
    const [order, setOrder] = useState(1)
    const [orderClm, setOrderClm] = useState(0)
    const [search, setSearch] = useState("")
    const [searchLdr, setSearchLdr] = useState(false)
    const [page, setPage] = useState(1)
    const [recordCount, setRecordCount] = useState(0)
    const [packageList, setPackageList] = useState([])
    const [status, setStatus] = useState("")
    const [show, setShow] = useState(false);
    const [image, setImage] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [submitLoader, setSubmitLoader] = useState(false)
    const [packageData, setPackageData] = useState({
        name: "",
        amount: "",
        rewarType: "",
        locationUrl: "",
        packageId: "",
        isUpdate: false,
        status:0
    })


    const handleClose = () => {
        setShow(false)
        setPackageData({})
        setImageUrl("")
    };
    const handleShow = () => setShow(true);
    const handleUpdate = (data) => {
        console.log(data)
        setPackageData({ name: data.packageName, amount: data.price, rewarType: data.reward_type, id: data.id, isUpdate: true, imgUrlForUpdate: data.packageImg,status:data.status })
        setImageUrl(`${process.env.IMG_URL}${data.packageImg}`)
        handleShow()
    }
    const verify_Options = [{ label: 'All', value: '' }, { label: 'Active', value: '1' }, { label: 'Deactive', value: '0' }, { label: 'Block', value: '2' }];
    let date = moment(new Date()).subtract(process.env.FILTER_MONTH, "month")
    const [dateRange, setDateRange] = useState([date['_d'], date['_i']])
    let _dateRange = [
        Math.floor(new Date(moment(moment(dateRange[0]).format('MM/DD/YYYY')).add(0, 'h').add(0, 'm').add(0, 's')).getTime() / 1000),
        Math.floor(new Date(moment(moment(dateRange[1]).format('MM/DD/YYYY')).add(23, 'h').add(59, 'm').add(59, 's')).getTime() / 1000)
    ]

    const getPackageList = async () => {
        if (!searchLdr) {
            setSearchLdr(true)
            const sponserbonusBody = JSON.stringify({
                page: page - 1,
                order,
                status,
                orderColumn: orderClm,
                startDate: _dateRange[0],
                endDate: _dateRange[1],
                search,
            })
            const response = await fetchApi("package/package-list", sponserbonusBody, "GET")
            setPageLoader(false)
            if (response.statusCode == 200) {
                setSearchLdr(false)
                setPackageList(response.data.data)
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
            getPackageList()
        }
    }
    const submitPackage = async () => { 
        try {
            if (!submitLoader) {
                try {
                    validate_string(packageData.name, 'Package name')
                    validate_input_number(packageData.amount, 'Package amount')
                    validate_input_number_in_range(packageData.rewarType, 'Reward type') 
                    validate_input_number_in_range(packageData.status, 'Status') 
                } catch (e) {
                    toast.error(e)
                    return
                }
                if (!imageUrl) {
                    toast.error("Upload image")
                    return
                }
                setSubmitLoader(true)
                const formData = new FormData()
                const bodyData = { name: packageData.name, amount: packageData.amount, rewarType: packageData.rewarType, status: packageData.status }
                if (packageData.isUpdate) bodyData.id = packageData.id

                if (packageData.isUpdate) {
                    if (image != "") {
                        formData.append('image', image)
                        bodyData.imageUrl = packageData.imgUrlForUpdate
                    } else {
                        bodyData.isImage = 0
                        bodyData.imageUrl = imageUrl
                    }
                } else {
                    formData.append('image', image)
                }
                formData.append('data', JSON.stringify(bodyData))
                const response = await fetchApi_with_upload(`package/add-update-package`, formData)
                setSubmitLoader(false)
                if (response.statusCode == 200) {
                    toast.success(response.data.message)
                    handleClose()
                    setPackageData({
                        name: "",
                        amount: "",
                        rewarType: "",
                        locationUrl: "",
                        isUpdate: false
                    })
                    setImage("")
                    setImageUrl("")
                    getPackageList()
                } else {
                    if (response.data.message == "Unauthorized") {
                        setAuthTkn(response.data.message)
                    } else {
                        toast.error(response.data.message)
                    }
                }
            }
        } catch (error) {
            toast.error(error)
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
    useEffect(() => { getPackageList() }, [page, order, orderClm])


    return (
        <>
            <Toaster position="top-right" />
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">Package List</h5>
                    <div className={`row card-body`}>
                        <div className='col-xl-3 col-lg-4 col-md-6 col-12 custom pb-3'>
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
                        <div className='col-xl-3 col-lg-4 col-md-6 col-12  pb-3'>
                            <div className="form-group">
                                <label>Status</label>

                                <div className='cust-input'>
                                    <Select options={verify_Options}
                                        value={verify_Options.find(option => option.value === status)}
                                        onChange={(selectedOption) => { setStatus(selectedOption.value); }} />
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-3 col-lg-4 col-md-6 col-12  pb-3'>
                            <label>Package Name</label>
                            <div className='cust-input'>
                                <input placeholder='Search...' className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>
                        <div className='col-xl-3 col-lg-4 col-md-6 col-12 align-self-end buttonsGroup   pb-3'>
                            <div className="form-group text-center">
                                <button className="btn btn-primary waves-effect  waves-light" onClick={() => { searchList() }}>{searchLdr ? <Loader /> : ""} Search</button>
                            </div>
                            <div className="form-group text-center">
                                <button className="btn btn-primary waves-effect  waves-light" onClick={handleShow}>{searchLdr ? <Loader /> : ""} Add Package</button>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive text-nowrap card-body">

                        <table className="table">
                            <thead className={(packageList && packageList.length > 0) && !searchLdr ? "" : "d-none"}>
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
                                        <div className='d-flex'>
                                            <div >Image</div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(1) }}>
                                            <div  >Package Name</div>
                                            <div className="sort-icons-position" >
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 1 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 1 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(2) }}>
                                            <div  >Amount</div>
                                            <div className="sort-icons-position" >
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 2 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>

                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(3) }}>
                                            <div >Status</div>
                                            <div className="sort-icons-position" >
                                                <i className={`fa fa-sort-down position-absolute ${order === 1 && orderClm == 3 ? `text-primary` : "text-muted"} `}></i>
                                                <i className={`fa fa-sort-up position-absolute ${order === 0 && orderClm == 3 ? `text-primary` : "text-muted"} `}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex cursor-pointer' onClick={() => { setOrder(order == 0 ? 1 : 0); setOrderClm(4) }}>
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
                            <tbody >
                                {(packageList && packageList.length > 0) && !searchLdr ? packageList.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <span className="fw-medium">{data.num}</span>
                                            </td>
                                            <td>
                                                <span className="packageImage"><img src={process.env.IMG_URL + data.packageImg} alt={data.packageName} /></span>
                                            </td>
                                            <td>
                                                <span className="fw-medium">{data.packageName
                                                }</span>
                                            </td>
                                            <td>{data.price}</td>
                                            <td><span className={`badge bg-label-${data.status == 1 ? 'success' : data.status == 0 ? 'danger' : 'dark'} me-1`}>{data.status == 1 ? 'Active' : data.status == 0 ? 'Deactive' : 'Block'}</span></td>
                                            <td>{data.date > 0 ? convert_date(data.date) : "-"}</td>
                                            <td>
                                                <div className='actionBox'>
                                                    <button className='btn btn-primary btn-sm' onClick={() => handleUpdate(data)}>Edit</button>
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
                        {packageList.length > 0 && !searchLdr ? (
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
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{packageData.isUpdate ? 'Update' : 'Add'} Package</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row modalForm">
                            <div className="col-12">
                                <label className="form-label">Package name</label>
                                <input type="text" className="form-control" value={packageData.name} placeholder="Enter package name" onChange={(e) => setPackageData({ ...packageData, name: e.target.value })} />

                            </div>
                            <div className="col-12">
                                <label className="form-label">Amount</label>
                                <input type="text" className="form-control" value={packageData.amount} placeholder="Enter amount" onChange={(e) => setPackageData({ ...packageData, amount: e.target.value })} />

                            </div>
                            <div className="col-12">
                                <label className="form-label">Reward Type</label>
                                <input type="text" className="form-control" value={packageData.rewarType} placeholder="Enter location url" onChange={(e) => setPackageData({ ...packageData, rewarType: e.target.value })} />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Status</label>
                                <div className="statusRadioGroup">
                                    <span> <input onClick={()=>setPackageData({...packageData, status: 1})} checked={packageData.status == 1} className="form-check-input mt-0" type="radio" value="" aria-label="Radio button for following text input" /> Active </span>
                                    <span> <input onClick={()=>setPackageData({...packageData, status: 0})} checked={packageData.status == 0} className="form-check-input mt-0" type="radio" value="" aria-label="Radio button for following text input" /> Deactive </span>
                                </div>

                            </div>
                            <div className="col-12">
                                <label htmlFor="selectFile" className='cursor-pointer'>
                                    <img src={imageUrl ? imageUrl : '/assets/image/upload-image.png'} className='upload-image' />
                                </label>
                                <input type='file' id="selectFile" className='d-none' onChange={(e) => selectFile(e)} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-secondary' onClick={handleClose}>
                            Close
                        </button>
                        <button className='btn btn-primary' onClick={submitPackage}>{submitLoader ? <i className='fa fa-refresh fa-spin '></i> : ""}
                            Submit
                        </button>
                    </Modal.Footer>
                </Modal>

            </div>

        </>
    )
}