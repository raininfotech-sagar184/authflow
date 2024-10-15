"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
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
        isUpdate: false
    })


    const handleClose = () =>{ 
        setShow(false)
        setPackageData({})
        setImageUrl("")
    };
    const handleShow = () => setShow(true);
    const handleUpdate = (data) => {
        console.log(data)  
        setPackageData({ name: data.packageName, amount: data.price, rewarType: data.reward_type,  id: data.id,isUpdate: true,imgUrlForUpdate: data.packageImg }) 
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
    const submitPackage = async () => {
        console.log(imageUrl)
        try {
            if (!submitLoader) {
                try {
                    validate_string(packageData.name, 'Package name')
                    validate_input_number(packageData.amount, 'Package amount')
                    validate_input_number_in_range(packageData.rewarType, 'Reward type')

                    
                    // validate_string(packageData.packageId, 'packageId') 
                  
                } catch (e) {
                    toast.error(e)
                    return
                }
               if (!imageUrl ) {
                        toast.error("Upload image")
                        return
                    }
                setSubmitLoader(true)
                const formData = new FormData()
                const bodyData = { name: packageData.name, amount: packageData.amount, rewarType: packageData.rewarType }
                if (packageData.isUpdate) bodyData.id = packageData.id
              
                if (packageData.isUpdate) {
                    if (image != "") {
                        formData.append('image', image)
                        bodyData.imageUrl = packageData.imgUrlForUpdate 
                    }else{
                        bodyData.isImage = 0
                        bodyData.imageUrl = imageUrl
                    }
                }else{
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
                    getuserList()
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
    useEffect(() => { getuserList() }, [page, order, orderClm])

 
    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">Package List</h5>

                    <div className='row card-body'>
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
                                        value={verify_Options.find(option => option.value === verify)}
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
                            <thead>
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
                                            <div  >Reward Type</div>
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
                            <tbody className="table-border-bottom-0">
                                {userList && !searchLdr ? userList.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <span className="fw-medium">{data.num}</span>
                                            </td>
                                            <td>
                                                <span className="packageImage"><img src={process.env.IMG_URL+data.packageImg} alt={data.packageName} /></span>
                                            </td>
                                            <td>
                                                <span className="fw-medium">{data.packageName
                                                }</span>
                                            </td>
                                            <td>{data.price}</td>

                                            <td><span className={`badge bg-label-${data.reward_type == 1 ? 'success' : data.reward_type == 0 ? 'danger' : 'dark'} me-1`}>{data.reward_type == 1 ? 'Active' : data.reward_type == 0 ? 'Deactive' : 'Block'}</span></td>
                                            <td onClick={() => console.log(data)}>{data.date > 0 ? convert_date(data.date) : "-"}</td>
                                            <td>
                                                <div className='actionBox'>
                                                    <button className='btn btn-primary btn-sm' onClick={() => handleUpdate(data)}>Edit</button>
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
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{packageData.isUpdate ? 'Update':'Add'} Package</Modal.Title>
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