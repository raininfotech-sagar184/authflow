'use client'

import React from 'react'

const Dashboard = () => {
    return (
        <> 
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row g-6">
                    {/* <!-- View sales --> */}
                    <div className="col-xl-4">
                        <div className="card">
                            <div className="d-flex align-items-end row">
                                <div className="col-7">
                                    <div className="card-body text-nowrap">
                                        <h5 className="card-title mb-0">Congratulations John! 🎉</h5>
                                        <p className="mb-2">Best seller of the month</p>
                                        <h4 className="text-primary mb-1">$48.9k</h4>
                                        <a href="javascript:;" className="btn btn-primary">View Sales</a>
                                    </div>
                                </div>
                                <div className="col-5 text-center text-sm-left">
                                    <div className="card-body pb-0 px-0 px-md-4">
                                        <img
                                            src="../../assets/img/illustrations/card-advance-sale.png"
                                            height="140"
                                            alt="view sales" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- View sales --> */}

                    {/* <!-- Statistics --> */}
                    <div className="col-xl-8 col-md-12">
                        <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                                <h5 className="card-title mb-0">Statistics</h5>
                                <small className="text-muted">Updated 1 month ago</small>
                            </div>
                            <div className="card-body d-flex align-items-end">
                                <div className="w-100">
                                    <div className="row gy-3">
                                        <div className="col-md-3 col-6">
                                            <div className="d-flex align-items-center">
                                                <div className="badge rounded bg-label-primary me-4 p-2">
                                                    <i className="ti ti-chart-pie-2 ti-lg"></i>
                                                </div>
                                                <div className="card-info">
                                                    <h5 className="mb-0">230k</h5>
                                                    <small>Sales</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className="d-flex align-items-center">
                                                <div className="badge rounded bg-label-info me-4 p-2"><i className="ti ti-users ti-lg"></i></div>
                                                <div className="card-info">
                                                    <h5 className="mb-0">8.549k</h5>
                                                    <small>Customers</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className="d-flex align-items-center">
                                                <div className="badge rounded bg-label-danger me-4 p-2">
                                                    <i className="ti ti-shopping-cart ti-lg"></i>
                                                </div>
                                                <div className="card-info">
                                                    <h5 className="mb-0">1.423k</h5>
                                                    <small>Products</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className="d-flex align-items-center">
                                                <div className="badge rounded bg-label-success me-4 p-2">
                                                    <i className="ti ti-currency-dollar ti-lg"></i>
                                                </div>
                                                <div className="card-info">
                                                    <h5 className="mb-0">$9745</h5>
                                                    <small>Revenue</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--/ Statistics --> */}

                    <div className="col-xxl-4 col-12">
                        <div className="row g-6">
                            {/* <!-- Profit last month --> */}
                            <div className="col-xl-6 col-sm-6">
                                <div className="card h-100">
                                    <div className="card-header pb-0">
                                        <h5 className="card-title mb-1">Profit</h5>
                                        <p className="card-subtitle">Last Month</p>
                                    </div>
                                    <div className="card-body">
                                        <div id="profitLastMonth"></div>
                                        <div className="d-flex justify-content-between align-items-center mt-3 gap-3">
                                            <h4 className="mb-0">624k</h4>
                                            <small className="text-success">+8.24%</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!--/ Profit last month --> */}

                            {/* <!-- Expenses --> */}
                            <div className="col-xl-6 col-sm-6">
                                <div className="card h-100">
                                    <div className="card-header pb-2">
                                        <h5 className="card-title mb-1">82.5k</h5>
                                        <p className="card-subtitle">Expenses</p>
                                    </div>
                                    <div className="card-body">
                                        <div id="expensesChart"></div>
                                        <div className="mt-3 text-center">
                                            <small className="text-muted mt-3">$21k Expenses more than last month</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!--/ Expenses --> */}

                            {/* <!-- Generated Leads --> */}
                            <div className="col-xl-12">
                                <div className="card h-100">
                                    <div className="card-body d-flex justify-content-between">
                                        <div className="d-flex flex-column">
                                            <div className="card-title mb-auto">
                                                <h5 className="mb-0 text-nowrap">Generated Leads</h5>
                                                <p className="mb-0">Monthly Report</p>
                                            </div>
                                            <div className="chart-statistics">
                                                <h3 className="card-title mb-0">4,350</h3>
                                                <p className="text-success text-nowrap mb-0"><i className="ti ti-chevron-up me-1"></i> 15.8%</p>
                                            </div>
                                        </div>
                                        <div id="generatedLeadsChart"></div>
                                    </div>
                                </div>
                            </div>
                            {/* <!--/ Generated Leads --> */}
                        </div>
                    </div>

                    {/* <!-- Revenue Report --> */}
                    <div className="col-xxl-8">
                        <div className="card h-100">
                            <div className="card-body p-0">
                                <div className="row row-bordered g-0">
                                    <div className="col-md-8 position-relative p-6">
                                        <div className="card-header d-inline-block p-0 text-wrap position-absolute">
                                            <h5 className="m-0 card-title">Revenue Report</h5>
                                        </div>
                                        <div id="totalRevenueChart" className="mt-n1"></div>
                                    </div>
                                    <div className="col-md-4 p-4">
                                        <div className="text-center mt-5">
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-sm btn-label-primary dropdown-toggle"
                                                    type="button"
                                                    id="budgetId"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <script>
                                                        document.write(new Date().getFullYear());
                                                    </script>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="budgetId">
                                                    <a className="dropdown-item prev-year1" href="javascript:void(0);">
                                                        <script>
                                                            document.write(new Date().getFullYear() - 1);
                                                        </script>
                                                    </a>
                                                    <a className="dropdown-item prev-year2" href="javascript:void(0);">
                                                        <script>
                                                            document.write(new Date().getFullYear() - 2);
                                                        </script>
                                                    </a>
                                                    <a className="dropdown-item prev-year3" href="javascript:void(0);">
                                                        <script>
                                                            document.write(new Date().getFullYear() - 3);
                                                        </script>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="text-center pt-8 mb-0">$25,825</h3>
                                        <p className="mb-8 text-center"><span className="fw-medium text-heading">Budget: </span>56,800</p>
                                        <div className="px-3">
                                            <div id="budgetChart"></div>
                                        </div>
                                        <div className="text-center mt-8">
                                            <button type="button" className="btn btn-primary">Increase Button</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--/ Revenue Report --> */}

                    {/* <!-- Earning Reports --> */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                                <div className="card-title mb-0">
                                    <h5 className="mb-1">Earning Reports</h5>
                                    <p className="card-subtitle">Weekly Earnings Overview</p>
                                </div>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-text-secondary rounded-pill text-muted border-0 p-2 me-n1"
                                        type="button"
                                        id="earningReports"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        <i className="ti ti-dots-vertical ti-md text-muted"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="earningReports">
                                        <a className="dropdown-item" href="javascript:void(0);">Download</a>
                                        <a className="dropdown-item" href="javascript:void(0);">Refresh</a>
                                        <a className="dropdown-item" href="javascript:void(0);">Share</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pb-0">
                                <ul className="p-0 m-0">
                                    <li className="d-flex align-items-center mb-5">
                                        <div className="me-4">
                                            <span className="badge bg-label-primary rounded p-1_5"
                                            ><i className="ti ti-chart-pie-2 ti-md"></i
                                            ></span>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Net Profit</h6>
                                                <small className="text-body">12.4k Sales</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-4">
                                                <small>$1,619</small>
                                                <div className="d-flex align-items-center gap-1">
                                                    <i className="ti ti-chevron-up text-success"></i>
                                                    <small className="text-muted">18.6%</small>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center mb-5">
                                        <div className="me-4">
                                            <span className="badge bg-label-success rounded p-1_5"
                                            ><i className="ti ti-currency-dollar ti-md"></i
                                            ></span>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Total Income</h6>
                                                <small className="text-body">Sales, Affiliation</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-4">
                                                <small>$3,571</small>
                                                <div className="d-flex align-items-center gap-1">
                                                    <i className="ti ti-chevron-up text-success"></i>
                                                    <small className="text-muted">39.6%</small>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center mb-5">
                                        <div className="me-4">
                                            <span className="badge bg-label-secondary text-body rounded p-1_5"
                                            ><i className="ti ti-credit-card ti-md"></i
                                            ></span>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Total Expenses</h6>
                                                <small className="text-body">ADVT, Marketing</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-4">
                                                <small>$430</small>
                                                <div className="d-flex align-items-center gap-1">
                                                    <i className="ti ti-chevron-up text-success"></i>
                                                    <small className="text-muted">52.8%</small>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div id="reportBarChart"></div>
                            </div>
                        </div>
                    </div>
                    {/* <!--/ Earning Reports --> */}

                    {/* <!-- Popular Product --> */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                                <div className="card-title m-0 me-2">
                                    <h5 className="mb-1">Popular Products</h5>
                                    <p className="card-subtitle">Total 10.4k Visitors</p>
                                </div>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-text-secondary rounded-pill text-muted border-0 p-2 me-n1"
                                        type="button"
                                        id="popularProduct"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        <i className="ti ti-dots-vertical ti-md text-muted"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="popularProduct">
                                        <a className="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
                                        <a className="dropdown-item" href="javascript:void(0);">Last Month</a>
                                        <a className="dropdown-item" href="javascript:void(0);">Last Year</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <ul className="p-0 m-0">
                                    <li className="d-flex mb-6">
                                        <div className="me-4">
                                            <img src="../../assets/img/products/iphone.png" alt="User" className="rounded" width="46" />
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Apple iPhone 13</h6>
                                                <small className="text-body d-block">Item: #FXZ-4567</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <p className="mb-0">$999.29</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-6">
                                        <div className="me-4">
                                            <img
                                                src="../../assets/img/products/nike-air-jordan.png"
                                                alt="User"
                                                className="rounded"
                                                width="46" />
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Nike Air Jordan</h6>
                                                <small className="text-body d-block">Item: #FXZ-3456</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <p className="mb-0">$72.40</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-6">
                                        <div className="me-4">
                                            <img src="../../assets/img/products/headphones.png" alt="User" className="rounded" width="46" />
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Beats Studio 2</h6>
                                                <small className="text-body d-block">Item: #FXZ-9485</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <p className="mb-0">$99</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-6">
                                        <div className="me-4">
                                            <img
                                                src="../../assets/img/products/apple-watch.png"
                                                alt="User"
                                                className="rounded"
                                                width="46" />
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Apple Watch Series 7</h6>
                                                <small className="text-body d-block">Item: #FXZ-2345</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <p className="mb-0">$249.99</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-6">
                                        <div className="me-4">
                                            <img
                                                src="../../assets/img/products/amazon-echo.png"
                                                alt="User"
                                                className="rounded"
                                                width="46" />
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Amazon Echo Dot</h6>
                                                <small className="text-body d-block">Item: #FXZ-8959</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <p className="mb-0">$79.40</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex">
                                        <div className="me-4">
                                            <img
                                                src="../../assets/img/products/play-station.png"
                                                alt="User"
                                                className="rounded"
                                                width="46" />
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Play Station Console</h6>
                                                <small className="text-body d-block">Item: #FXZ-7892</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <p className="mb-0">$129.48</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <!--/ Popular Product --> */}

                    {/* <!-- Sales by Countries tabs--> */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card h-100">
                            <div className="card-header d-flex align-items-center justify-content-between">
                                <div className="card-title mb-0">
                                    <h5 className="mb-1">Orders by Countries</h5>
                                    <p className="card-subtitle">62 deliveries in progress</p>
                                </div>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-text-secondary rounded-pill text-muted border-0 p-2 me-n1"
                                        type="button"
                                        id="salesByCountryTabs"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        <i className="ti ti-dots-vertical ti-md text-muted"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="salesByCountryTabs">
                                        <a className="dropdown-item" href="javascript:void(0);">Select All</a>
                                        <a className="dropdown-item" href="javascript:void(0);">Refresh</a>
                                        <a className="dropdown-item" href="javascript:void(0);">Share</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="nav-align-top">
                                    <ul className="nav nav-tabs nav-fill rounded-0 timeline-indicator-advanced" role="tablist">
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link active"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#navs-justified-new"
                                                aria-controls="navs-justified-new"
                                                aria-selected="true">
                                                New
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#navs-justified-link-preparing"
                                                aria-controls="navs-justified-link-preparing"
                                                aria-selected="false">
                                                Preparing
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#navs-justified-link-shipping"
                                                aria-controls="navs-justified-link-shipping"
                                                aria-selected="false">
                                                Shipping
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content border-0 mx-1">
                                        <div className="tab-pane fade show active" id="navs-justified-new" role="tabpanel">
                                            <ul className="timeline mb-0">
                                                <li className="timeline-item ps-6 border-left-dashed">
                                                    <span
                                                        className="timeline-indicator-advanced timeline-indicator-success border-0 shadow-none">
                                                        <i className="ti ti-circle-check"></i>
                                                    </span>
                                                    <div className="timeline-event ps-1">
                                                        <div className="timeline-header">
                                                            <small className="text-success text-uppercase">sender</small>
                                                        </div>
                                                        <h6 className="my-50">Myrtle Ullrich</h6>
                                                        <p className="text-body mb-0">101 Boulder, California(CA), 95959</p>
                                                    </div>
                                                </li>
                                                <li className="timeline-item ps-6 border-transparent">
                                                    <span
                                                        className="timeline-indicator-advanced timeline-indicator-primary border-0 shadow-none">
                                                        <i className="ti ti-map-pin"></i>
                                                    </span>
                                                    <div className="timeline-event ps-1">
                                                        <div className="timeline-header">
                                                            <small className="text-primary text-uppercase">Receiver</small>
                                                        </div>
                                                        <h6 className="my-50">Barry Schowalter</h6>
                                                        <p className="text-body mb-0">939 Orange, California(CA), 92118</p>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="border-1 border-light border-top border-dashed my-4"></div>
                                            <ul className="timeline mb-0">
                                                <li className="timeline-item ps-6 border-left-dashed">
                                                    <span
                                                        className="timeline-indicator-advanced timeline-indicator-success border-0 shadow-none">
                                                        <i className="ti ti-circle-check"></i>
                                                    </span>
                                                    <div className="timeline-event ps-1">
                                                        <div className="timeline-header">
                                                            <small className="text-success text-uppercase">sender</small>
                                                        </div>
                                                        <h6 className="my-50">Veronica Herman</h6>
                                                        <p className="text-body mb-0">162 Windsor, California(CA), 95492</p>
                                                    </div>
                                                </li>
                                                <li className="timeline-item ps-6 border-transparent">
                                                    <span
                                                        className="timeline-indicator-advanced timeline-indicator-primary border-0 shadow-none">
                                                        <i className="ti ti-map-pin"></i>
                                                    </span>
                                                    <div className="timeline-event ps-1">
                                                        <div className="timeline-header">
                                                            <small className="text-primary text-uppercase">Receiver</small>
                                                        </div>
                                                        <h6 className="my-50">Helen Jacobs</h6>
                                                        <p className="text-body mb-0">487 Sunset, California(CA), 94043</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane fade" id="navs-justified-link-preparing" role="tabpanel">
                                            <ul className="timeline mb-0">
                                                <li className="timeline-item ps-6 border-left-dashed">
                                                    <span
                                                        className="timeline-indicator-advanced timeline-indicator-success border-0 shadow-none">
                                                        <i className="ti ti-circle-check"></i>
                                                    </span>
                                                    <div className="timeline-event ps-1">
                                                        <div className="timeline-header">
                                                            <small className="text-success text-uppercase">sender</small>
                                                        </div>
                                                        <h6 className="my-50">Barry Schowalter</h6>
                                                        <p className="text-body mb-0">939 Orange, California(CA), 92118</p>
                                                    </div>
                                                </li>
                                                <li className="timeline-item ps-6 border-transparent border-left-dashed">
                                                    <span
                                                        className="timeline-indicator-advanced timeline-indicator-primary border-0 shadow-none">
                                                        <i className="ti ti-map-pin"></i>
                                                    </span>
                                                    <div className="timeline-event ps-1">
                                                        <div className="timeline-header">
                                                            <small className="text-primary text-uppercase">Receiver</small>
                                                        </div>
                                                        <h6 className="my-50">Myrtle Ullrich</h6>
                                                        <p className="text-body mb-0">101 Boulder, California(CA), 95959</p>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="border-1 border-light border-top border-dashed my-4"></div>
                                            <ul className="timeline mb-0">
                                                <li className="timeline-item ps-6 border-left-dashed">
                                                    <span
                                                        className="timeline-indicator-advanced timeline-indicator-success border-0 shadow-none">
                                                        <i className="ti ti-circle-check"></i>
                                                    </span>
                                                    <div className="timeline-event ps-1">
                                                        <div className="timeline-header">
                                                            <small className="text-success text-uppercase">sender</small>
                                                        </div>
                                                        <h6 className="my-50">Veronica Herman</h6>
                                                        <p className="text-body mb-0">162 Windsor, California(CA), 95492</p>
                                                    </div>
                                                </li>
                                                <li className="timeline-item ps-6 border-transparent">
                                                    <span
                                                        className="timeline-indicator-advanced timeline-indicator-primary border-0 shadow-none">
                                                        <i className="ti ti-map-pin"></i>
                                                    </span>
                                                    <div className="timeline-event ps-1">
                                                        <div className="timeline-header">
                                                            <small className="text-primary text-uppercase">Receiver</small>
                                                        </div>
                                                        <h6 className="my-50">Helen Jacobs</h6>
                                                        <p className="text-body mb-0">487 Sunset, California(CA), 94043</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane fade" id="navs-justified-link-shipping" role="tabpanel">
                                            <ul className="timeline mb-0">
                                                <li className="timeline-item ps-6 border-left-dashed">
                                                    <span
                                                        className="timeline-indicator-advanced timeline-indicator-success border-0 shadow-none">
                                                        <i className="ti ti-circle-check"></i>
                                                    </span>
                                                    <div className="timeline-event ps-1">
                                                        <div className="timeline-header">
                                                            <small className="text-success text-uppercase">sender</small>
                                                        </div>
                                                        <h6 className="my-50">Veronica Herman</h6>
                                                        <p className="text-body mb-0">101 Boulder, California(CA), 95959</p>
                                                    </div>
                                                </li>
                                                <li className="timeline-item ps-6 border-transparent">
                                                    <span
                                                        className="timeline-indicator-advanced timeline-indicator-primary border-0 shadow-none">
                                                        <i className="ti ti-map-pin"></i>
                                                    </span>
                                                    <div className="timeline-event ps-1">
                                                        <div className="timeline-header">
                                                            <small className="text-primary text-uppercase">Receiver</small>
                                                        </div>
                                                        <h6 className="my-50">Barry Schowalter</h6>
                                                        <p className="text-body mb-0">939 Orange, California(CA), 92118</p>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="border-1 border-light border-top border-dashed my-4"></div>
                                            <ul className="timeline mb-0">
                                                <li className="timeline-item ps-6 border-left-dashed">
                                                    <span
                                                        className="timeline-indicator-advanced timeline-indicator-success border-0 shadow-none">
                                                        <i className="ti ti-circle-check"></i>
                                                    </span>
                                                    <div className="timeline-event ps-1">
                                                        <div className="timeline-header">
                                                            <small className="text-success text-uppercase">sender</small>
                                                        </div>
                                                        <h6 className="my-50">Myrtle Ullrich</h6>
                                                        <p className="text-body mb-0">162 Windsor, California(CA), 95492</p>
                                                    </div>
                                                </li>
                                                <li className="timeline-item ps-6 border-transparent">
                                                    <span
                                                        className="timeline-indicator-advanced timeline-indicator-primary border-0 shadow-none">
                                                        <i className="ti ti-map-pin"></i>
                                                    </span>
                                                    <div className="timeline-event ps-1">
                                                        <div className="timeline-header">
                                                            <small className="text-primary text-uppercase">Receiver</small>
                                                        </div>
                                                        <h6 className="my-50">Helen Jacobs</h6>
                                                        <p className="text-body mb-0">487 Sunset, California(CA), 94043</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--/ Sales by Countries tabs --> */}

                    {/* <!-- Transactions --> */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                                <div className="card-title m-0 me-2">
                                    <h5 className="mb-1">Transactions</h5>
                                    <p className="card-subtitle">Total 58 Transactions done in this Month</p>
                                </div>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-text-secondary rounded-pill text-muted border-0 p-2 me-n1"
                                        type="button"
                                        id="transactionID"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        <i className="ti ti-dots-vertical ti-md text-muted"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="transactionID">
                                        <a className="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
                                        <a className="dropdown-item" href="javascript:void(0);">Last Month</a>
                                        <a className="dropdown-item" href="javascript:void(0);">Last Year</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <ul className="p-0 m-0">
                                    <li className="d-flex mb-3 pb-1 align-items-center">
                                        <div className="badge bg-label-primary me-4 rounded p-1_5">
                                            <i className="ti ti-wallet ti-md"></i>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Wallet</h6>
                                                <small className="text-body d-block">Starbucks</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <h6 className="mb-0 text-danger">-$75</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-3 pb-1 align-items-center">
                                        <div className="badge bg-label-success me-4 rounded p-1_5">
                                            <i className="ti ti-browser-check ti-md"></i>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Bank Transfer</h6>
                                                <small className="text-body d-block">Add Money</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <h6 className="mb-0 text-success">+$480</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-3 pb-1 align-items-center">
                                        <div className="badge bg-label-danger me-4 rounded p-1_5">
                                            <i className="ti ti-brand-paypal ti-md"></i>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Paypal</h6>
                                                <small className="text-body d-block">Client Payment</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <h6 className="mb-0 text-success">+$268</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-3 pb-1 align-items-center">
                                        <div className="badge bg-label-secondary me-4 rounded p-1_5">
                                            <i className="ti ti-credit-card ti-md"></i>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Master Card</h6>
                                                <small className="text-body d-block">Ordered iPhone 13</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <h6 className="mb-0 text-danger">-$699</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-3 pb-1 align-items-center">
                                        <div className="badge bg-label-info me-4 rounded p-1_5">
                                            <i className="ti ti-currency-dollar ti-md"></i>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Bank Transactions</h6>
                                                <small className="text-body d-block">Refund</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <h6 className="mb-0 text-success">+$98</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-3 pb-1 align-items-center">
                                        <div className="badge bg-label-danger me-4 rounded p-1_5">
                                            <i className="ti ti-brand-paypal ti-md"></i>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Paypal</h6>
                                                <small className="text-body d-block">Client Payment</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <h6 className="mb-0 text-success">+$126</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="badge bg-label-success me-4 rounded p-1_5">
                                            <i className="ti ti-building-bank ti-md"></i>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Bank Transfer</h6>
                                                <small className="text-body d-block">Pay Office Rent</small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <h6 className="mb-0 text-danger">-$1290</h6>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <!--/ Transactions --> */}

                    {/* <!-- Invoice table --> */}
                    <div className="col-xxl-8">
                        <div className="card">
                            <div className="card-datatable table-responsive">
                                <table className="table table-sm datatable-invoice border-top">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th>#</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                            <th>Issued Date</th>
                                            <th>Invoice Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Invoice table --> */}
                </div>
            </div>




        </>
    )
}

export default Dashboard