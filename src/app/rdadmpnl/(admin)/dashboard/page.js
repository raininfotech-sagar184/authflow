import React from 'react'

const Dashboard = () => {
  return (
     <> 

    {/* <!-- Layout wrapper --> */}
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* <!-- Menu --> */}

        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
          <div className="app-brand demo">
            <a href="index.html" className="app-brand-link">
              <span className="app-brand-logo demo">
                <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                    fill="#7367F0" />
                  <path
                    opacity="0.06"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                    fill="#161616" />
                  <path
                    opacity="0.06"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                    fill="#161616" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                    fill="#7367F0" />
                </svg>
              </span>
              <span className="app-brand-text demo menu-text fw-bold">Vuexy</span>
            </a>

            <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto">
              <i className="ti menu-toggle-icon d-none d-xl-block align-middle"></i>
              <i className="ti ti-x d-block d-xl-none ti-md align-middle"></i>
            </a>
          </div>

          <div className="menu-inner-shadow"></div>

          <ul className="menu-inner py-1">
            {/* <!-- Dashboards --> */}
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-smart-home"></i>
                <div data-i18n="Dashboards">Dashboards</div>
                <div className="badge bg-danger rounded-pill ms-auto">5</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="index.html" className="menu-link">
                    <div data-i18n="Analytics">Analytics</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="dashboards-crm.html" className="menu-link">
                    <div data-i18n="CRM">CRM</div>
                  </a>
                </li>
                <li className="menu-item active">
                  <a href="app-ecommerce-dashboard.html" className="menu-link">
                    <div data-i18n="eCommerce">eCommerce</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="app-logistics-dashboard.html" className="menu-link">
                    <div data-i18n="Logistics">Logistics</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="app-academy-dashboard.html" className="menu-link">
                    <div data-i18n="Academy">Academy</div>
                  </a>
                </li>
              </ul>
            </li>

            {/* <!-- Layouts --> */}
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-layout-sidebar"></i>
                <div data-i18n="Layouts">Layouts</div>
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="layouts-collapsed-menu.html" className="menu-link">
                    <div data-i18n="Collapsed menu">Collapsed menu</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-content-navbar.html" className="menu-link">
                    <div data-i18n="Content navbar">Content navbar</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-content-navbar-with-sidebar.html" className="menu-link">
                    <div data-i18n="Content nav + Sidebar">Content nav + Sidebar</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="../horizontal-menu-template" className="menu-link" target="_blank">
                    <div data-i18n="Horizontal">Horizontal</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-without-menu.html" className="menu-link">
                    <div data-i18n="Without menu">Without menu</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-without-navbar.html" className="menu-link">
                    <div data-i18n="Without navbar">Without navbar</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-fluid.html" className="menu-link">
                    <div data-i18n="Fluid">Fluid</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-container.html" className="menu-link">
                    <div data-i18n="Container">Container</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-blank.html" className="menu-link">
                    <div data-i18n="Blank">Blank</div>
                  </a>
                </li>
              </ul>
            </li>

            {/* <!-- Front Pages --> */}
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-files"></i>
                <div data-i18n="Front Pages">Front Pages</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="../front-pages/landing-page.html" className="menu-link" target="_blank">
                    <div data-i18n="Landing">Landing</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="../front-pages/pricing-page.html" className="menu-link" target="_blank">
                    <div data-i18n="Pricing">Pricing</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="../front-pages/payment-page.html" className="menu-link" target="_blank">
                    <div data-i18n="Payment">Payment</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="../front-pages/checkout-page.html" className="menu-link" target="_blank">
                    <div data-i18n="Checkout">Checkout</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="../front-pages/help-center-landing.html" className="menu-link" target="_blank">
                    <div data-i18n="Help Center">Help Center</div>
                  </a>
                </li>
              </ul>
            </li>

            {/* <!-- Apps & Pages --> */}
            <li className="menu-header small">
              <span className="menu-header-text" data-i18n="Apps & Pages">Apps &amp; Pages</span>
            </li>
            <li className="menu-item">
              <a href="app-email.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-mail"></i>
                <div data-i18n="Email">Email</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-chat.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-messages"></i>
                <div data-i18n="Chat">Chat</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-calendar.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-calendar"></i>
                <div data-i18n="Calendar">Calendar</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-kanban.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-layout-kanban"></i>
                <div data-i18n="Kanban">Kanban</div>
              </a>
            </li>
            {/* <!-- e-commerce-app menu start --> */}
            <li className="menu-item active open">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-shopping-cart"></i>
                <div data-i18n="eCommerce">eCommerce</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item active">
                  <a href="app-ecommerce-dashboard.html" className="menu-link">
                    <div data-i18n="Dashboard">Dashboard</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="Products">Products</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="app-ecommerce-product-list.html" className="menu-link">
                        <div data-i18n="Product List">Product List</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="app-ecommerce-product-add.html" className="menu-link">
                        <div data-i18n="Add Product">Add Product</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="app-ecommerce-category-list.html" className="menu-link">
                        <div data-i18n="Category List">Category List</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="Order">Order</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="app-ecommerce-order-list.html" className="menu-link">
                        <div data-i18n="Order List">Order List</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="app-ecommerce-order-details.html" className="menu-link">
                        <div data-i18n="Order Details">Order Details</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="Customer">Customer</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="app-ecommerce-customer-all.html" className="menu-link">
                        <div data-i18n="All Customers">All Customers</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="javascript:void(0);" className="menu-link menu-toggle">
                        <div data-i18n="Customer Details">Customer Details</div>
                      </a>
                      <ul className="menu-sub">
                        <li className="menu-item">
                          <a href="app-ecommerce-customer-details-overview.html" className="menu-link">
                            <div data-i18n="Overview">Overview</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="app-ecommerce-customer-details-security.html" className="menu-link">
                            <div data-i18n="Security">Security</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="app-ecommerce-customer-details-billing.html" className="menu-link">
                            <div data-i18n="Address & Billing">Address & Billing</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="app-ecommerce-customer-details-notifications.html" className="menu-link">
                            <div data-i18n="Notifications">Notifications</div>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="app-ecommerce-manage-reviews.html" className="menu-link">
                    <div data-i18n="Manage Reviews">Manage Reviews</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="app-ecommerce-referral.html" className="menu-link">
                    <div data-i18n="Referrals">Referrals</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="Settings">Settings</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="app-ecommerce-settings-detail.html" className="menu-link">
                        <div data-i18n="Store Details">Store Details</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="app-ecommerce-settings-payments.html" className="menu-link">
                        <div data-i18n="Payments">Payments</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="app-ecommerce-settings-checkout.html" className="menu-link">
                        <div data-i18n="Checkout">Checkout</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="app-ecommerce-settings-shipping.html" className="menu-link">
                        <div data-i18n="Shipping & Delivery">Shipping & Delivery</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="app-ecommerce-settings-locations.html" className="menu-link">
                        <div data-i18n="Locations">Locations</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="app-ecommerce-settings-notifications.html" className="menu-link">
                        <div data-i18n="Notifications">Notifications</div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            {/* <!-- e-commerce-app menu end --> */}
            {/* <!-- Academy menu start --> */}
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-book"></i>
                <div data-i18n="Academy">Academy</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="app-academy-dashboard.html" className="menu-link">
                    <div data-i18n="Dashboard">Dashboard</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="app-academy-course.html" className="menu-link">
                    <div data-i18n="My Course">My Course</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="app-academy-course-details.html" className="menu-link">
                    <div data-i18n="Course Details">Course Details</div>
                  </a>
                </li>
              </ul>
            </li>
            {/* <!-- Academy menu end --> */}
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-truck"></i>
                <div data-i18n="Logistics">Logistics</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="app-logistics-dashboard.html" className="menu-link">
                    <div data-i18n="Dashboard">Dashboard</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="app-logistics-fleet.html" className="menu-link">
                    <div data-i18n="Fleet">Fleet</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-file-dollar"></i>
                <div data-i18n="Invoice">Invoice</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="app-invoice-list.html" className="menu-link">
                    <div data-i18n="List">List</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="app-invoice-preview.html" className="menu-link">
                    <div data-i18n="Preview">Preview</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="app-invoice-edit.html" className="menu-link">
                    <div data-i18n="Edit">Edit</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="app-invoice-add.html" className="menu-link">
                    <div data-i18n="Add">Add</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-users"></i>
                <div data-i18n="Users">Users</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="app-user-list.html" className="menu-link">
                    <div data-i18n="List">List</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="View">View</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="app-user-view-account.html" className="menu-link">
                        <div data-i18n="Account">Account</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="app-user-view-security.html" className="menu-link">
                        <div data-i18n="Security">Security</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="app-user-view-billing.html" className="menu-link">
                        <div data-i18n="Billing & Plans">Billing & Plans</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="app-user-view-notifications.html" className="menu-link">
                        <div data-i18n="Notifications">Notifications</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="app-user-view-connections.html" className="menu-link">
                        <div data-i18n="Connections">Connections</div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-settings"></i>
                <div data-i18n="Roles & Permissions">Roles & Permissions</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="app-access-roles.html" className="menu-link">
                    <div data-i18n="Roles">Roles</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="app-access-permission.html" className="menu-link">
                    <div data-i18n="Permission">Permission</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-file"></i>
                <div data-i18n="Pages">Pages</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="User Profile">User Profile</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="pages-profile-user.html" className="menu-link">
                        <div data-i18n="Profile">Profile</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="pages-profile-teams.html" className="menu-link">
                        <div data-i18n="Teams">Teams</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="pages-profile-projects.html" className="menu-link">
                        <div data-i18n="Projects">Projects</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="pages-profile-connections.html" className="menu-link">
                        <div data-i18n="Connections">Connections</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="Account Settings">Account Settings</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="pages-account-settings-account.html" className="menu-link">
                        <div data-i18n="Account">Account</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="pages-account-settings-security.html" className="menu-link">
                        <div data-i18n="Security">Security</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="pages-account-settings-billing.html" className="menu-link">
                        <div data-i18n="Billing & Plans">Billing & Plans</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="pages-account-settings-notifications.html" className="menu-link">
                        <div data-i18n="Notifications">Notifications</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="pages-account-settings-connections.html" className="menu-link">
                        <div data-i18n="Connections">Connections</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="pages-faq.html" className="menu-link">
                    <div data-i18n="FAQ">FAQ</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="pages-pricing.html" className="menu-link">
                    <div data-i18n="Pricing">Pricing</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="Misc">Misc</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="pages-misc-error.html" className="menu-link" target="_blank">
                        <div data-i18n="Error">Error</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="pages-misc-under-maintenance.html" className="menu-link" target="_blank">
                        <div data-i18n="Under Maintenance">Under Maintenance</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="pages-misc-comingsoon.html" className="menu-link" target="_blank">
                        <div data-i18n="Coming Soon">Coming Soon</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="pages-misc-not-authorized.html" className="menu-link" target="_blank">
                        <div data-i18n="Not Authorized">Not Authorized</div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-lock"></i>
                <div data-i18n="Authentications">Authentications</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="Login">Login</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="auth-login-basic.html" className="menu-link" target="_blank">
                        <div data-i18n="Basic">Basic</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="auth-login-cover.html" className="menu-link" target="_blank">
                        <div data-i18n="Cover">Cover</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="Register">Register</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="auth-register-basic.html" className="menu-link" target="_blank">
                        <div data-i18n="Basic">Basic</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="auth-register-cover.html" className="menu-link" target="_blank">
                        <div data-i18n="Cover">Cover</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="auth-register-multisteps.html" className="menu-link" target="_blank">
                        <div data-i18n="Multi-steps">Multi-steps</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="Verify Email">Verify Email</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="auth-verify-email-basic.html" className="menu-link" target="_blank">
                        <div data-i18n="Basic">Basic</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="auth-verify-email-cover.html" className="menu-link" target="_blank">
                        <div data-i18n="Cover">Cover</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="Reset Password">Reset Password</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="auth-reset-password-basic.html" className="menu-link" target="_blank">
                        <div data-i18n="Basic">Basic</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="auth-reset-password-cover.html" className="menu-link" target="_blank">
                        <div data-i18n="Cover">Cover</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="Forgot Password">Forgot Password</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="auth-forgot-password-basic.html" className="menu-link" target="_blank">
                        <div data-i18n="Basic">Basic</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="auth-forgot-password-cover.html" className="menu-link" target="_blank">
                        <div data-i18n="Cover">Cover</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="Two Steps">Two Steps</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="auth-two-steps-basic.html" className="menu-link" target="_blank">
                        <div data-i18n="Basic">Basic</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="auth-two-steps-cover.html" className="menu-link" target="_blank">
                        <div data-i18n="Cover">Cover</div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-forms"></i>
                <div data-i18n="Wizard Examples">Wizard Examples</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="wizard-ex-checkout.html" className="menu-link">
                    <div data-i18n="Checkout">Checkout</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="wizard-ex-property-listing.html" className="menu-link">
                    <div data-i18n="Property Listing">Property Listing</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="wizard-ex-create-deal.html" className="menu-link">
                    <div data-i18n="Create Deal">Create Deal</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="modal-examples.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-square"></i>
                <div data-i18n="Modal Examples">Modal Examples</div>
              </a>
            </li>

            {/* <!-- Components --> */}
            <li className="menu-header small">
              <span className="menu-header-text" data-i18n="Components">Components</span>
            </li>
            {/* <!-- Cards --> */}
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-id"></i>
                <div data-i18n="Cards">Cards</div>
                <div className="badge bg-primary rounded-pill ms-auto">5</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="cards-basic.html" className="menu-link">
                    <div data-i18n="Basic">Basic</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="cards-advance.html" className="menu-link">
                    <div data-i18n="Advance">Advance</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="cards-statistics.html" className="menu-link">
                    <div data-i18n="Statistics">Statistics</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="cards-analytics.html" className="menu-link">
                    <div data-i18n="Analytics">Analytics</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="cards-actions.html" className="menu-link">
                    <div data-i18n="Actions">Actions</div>
                  </a>
                </li>
              </ul>
            </li>
            {/* <!-- User interface --> */}
            <li className="menu-item">
              <a href="javascript:void(0)" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-color-swatch"></i>
                <div data-i18n="User interface">User interface</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="ui-accordion.html" className="menu-link">
                    <div data-i18n="Accordion">Accordion</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-alerts.html" className="menu-link">
                    <div data-i18n="Alerts">Alerts</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-badges.html" className="menu-link">
                    <div data-i18n="Badges">Badges</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-buttons.html" className="menu-link">
                    <div data-i18n="Buttons">Buttons</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-carousel.html" className="menu-link">
                    <div data-i18n="Carousel">Carousel</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-collapse.html" className="menu-link">
                    <div data-i18n="Collapse">Collapse</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-dropdowns.html" className="menu-link">
                    <div data-i18n="Dropdowns">Dropdowns</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-footer.html" className="menu-link">
                    <div data-i18n="Footer">Footer</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-list-groups.html" className="menu-link">
                    <div data-i18n="List Groups">List groups</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-modals.html" className="menu-link">
                    <div data-i18n="Modals">Modals</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-navbar.html" className="menu-link">
                    <div data-i18n="Navbar">Navbar</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-offcanvas.html" className="menu-link">
                    <div data-i18n="Offcanvas">Offcanvas</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-pagination-breadcrumbs.html" className="menu-link">
                    <div data-i18n="Pagination & Breadcrumbs">Pagination &amp; Breadcrumbs</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-progress.html" className="menu-link">
                    <div data-i18n="Progress">Progress</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-spinners.html" className="menu-link">
                    <div data-i18n="Spinners">Spinners</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-tabs-pills.html" className="menu-link">
                    <div data-i18n="Tabs & Pills">Tabs &amp; Pills</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-toasts.html" className="menu-link">
                    <div data-i18n="Toasts">Toasts</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-tooltips-popovers.html" className="menu-link">
                    <div data-i18n="Tooltips & Popovers">Tooltips &amp; Popovers</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-typography.html" className="menu-link">
                    <div data-i18n="Typography">Typography</div>
                  </a>
                </li>
              </ul>
            </li>

            {/* <!-- Extended components --> */}
            <li className="menu-item">
              <a href="javascript:void(0)" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-components"></i>
                <div data-i18n="Extended UI">Extended UI</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="extended-ui-avatar.html" className="menu-link">
                    <div data-i18n="Avatar">Avatar</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="extended-ui-blockui.html" className="menu-link">
                    <div data-i18n="BlockUI">BlockUI</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="extended-ui-drag-and-drop.html" className="menu-link">
                    <div data-i18n="Drag & Drop">Drag &amp; Drop</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="extended-ui-media-player.html" className="menu-link">
                    <div data-i18n="Media Player">Media Player</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="extended-ui-perfect-scrollbar.html" className="menu-link">
                    <div data-i18n="Perfect Scrollbar">Perfect Scrollbar</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="extended-ui-star-ratings.html" className="menu-link">
                    <div data-i18n="Star Ratings">Star Ratings</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="extended-ui-sweetalert2.html" className="menu-link">
                    <div data-i18n="SweetAlert2">SweetAlert2</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="extended-ui-text-divider.html" className="menu-link">
                    <div data-i18n="Text Divider">Text Divider</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="javascript:void(0);" className="menu-link menu-toggle">
                    <div data-i18n="Timeline">Timeline</div>
                  </a>
                  <ul className="menu-sub">
                    <li className="menu-item">
                      <a href="extended-ui-timeline-basic.html" className="menu-link">
                        <div data-i18n="Basic">Basic</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="extended-ui-timeline-fullscreen.html" className="menu-link">
                        <div data-i18n="Fullscreen">Fullscreen</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="extended-ui-tour.html" className="menu-link">
                    <div data-i18n="Tour">Tour</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="extended-ui-treeview.html" className="menu-link">
                    <div data-i18n="Treeview">Treeview</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="extended-ui-misc.html" className="menu-link">
                    <div data-i18n="Miscellaneous">Miscellaneous</div>
                  </a>
                </li>
              </ul>
            </li>

            {/* <!-- Icons --> */}
            <li className="menu-item">
              <a href="javascript:void(0)" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-brand-tabler"></i>
                <div data-i18n="Icons">Icons</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="icons-tabler.html" className="menu-link">
                    <div data-i18n="Tabler">Tabler</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="icons-font-awesome.html" className="menu-link">
                    <div data-i18n="Fontawesome">Fontawesome</div>
                  </a>
                </li>
              </ul>
            </li>

            {/* <!-- Forms & Tables --> */}
            <li className="menu-header small">
              <span className="menu-header-text" data-i18n="Forms & Tables">Forms &amp; Tables</span>
            </li>
            {/* <!-- Forms --> */}
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-toggle-left"></i>
                <div data-i18n="Form Elements">Form Elements</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="forms-basic-inputs.html" className="menu-link">
                    <div data-i18n="Basic Inputs">Basic Inputs</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="forms-input-groups.html" className="menu-link">
                    <div data-i18n="Input groups">Input groups</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="forms-custom-options.html" className="menu-link">
                    <div data-i18n="Custom Options">Custom Options</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="forms-editors.html" className="menu-link">
                    <div data-i18n="Editors">Editors</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="forms-file-upload.html" className="menu-link">
                    <div data-i18n="File Upload">File Upload</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="forms-pickers.html" className="menu-link">
                    <div data-i18n="Pickers">Pickers</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="forms-selects.html" className="menu-link">
                    <div data-i18n="Select & Tags">Select &amp; Tags</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="forms-sliders.html" className="menu-link">
                    <div data-i18n="Sliders">Sliders</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="forms-switches.html" className="menu-link">
                    <div data-i18n="Switches">Switches</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="forms-extras.html" className="menu-link">
                    <div data-i18n="Extras">Extras</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-layout-navbar"></i>
                <div data-i18n="Form Layouts">Form Layouts</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="form-layouts-vertical.html" className="menu-link">
                    <div data-i18n="Vertical Form">Vertical Form</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="form-layouts-horizontal.html" className="menu-link">
                    <div data-i18n="Horizontal Form">Horizontal Form</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="form-layouts-sticky.html" className="menu-link">
                    <div data-i18n="Sticky Actions">Sticky Actions</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-text-wrap-disabled"></i>
                <div data-i18n="Form Wizard">Form Wizard</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="form-wizard-numbered.html" className="menu-link">
                    <div data-i18n="Numbered">Numbered</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="form-wizard-icons.html" className="menu-link">
                    <div data-i18n="Icons">Icons</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="form-validation.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-checkbox"></i>
                <div data-i18n="Form Validation">Form Validation</div>
              </a>
            </li>
            {/* <!-- Tables --> */}
            <li className="menu-item">
              <a href="tables-basic.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-table"></i>
                <div data-i18n="Tables">Tables</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-layout-grid"></i>
                <div data-i18n="Datatables">Datatables</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="tables-datatables-basic.html" className="menu-link">
                    <div data-i18n="Basic">Basic</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="tables-datatables-advanced.html" className="menu-link">
                    <div data-i18n="Advanced">Advanced</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="tables-datatables-extensions.html" className="menu-link">
                    <div data-i18n="Extensions">Extensions</div>
                  </a>
                </li>
              </ul>
            </li>

            {/* <!-- Charts & Maps --> */}
            <li className="menu-header small">
              <span className="menu-header-text" data-i18n="Charts & Maps">Charts &amp; Maps</span>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-chart-pie"></i>
                <div data-i18n="Charts">Charts</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="charts-apex.html" className="menu-link">
                    <div data-i18n="Apex Charts">Apex Charts</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="charts-chartjs.html" className="menu-link">
                    <div data-i18n="ChartJS">ChartJS</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="maps-leaflet.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-map"></i>
                <div data-i18n="Leaflet Maps">Leaflet Maps</div>
              </a>
            </li>

            {/* <!-- Misc --> */}
            <li className="menu-header small">
              <span className="menu-header-text" data-i18n="Misc">Misc</span>
            </li>
            <li className="menu-item">
              <a href="https://pixinvent.ticksy.com/" target="_blank" className="menu-link">
                <i className="menu-icon tf-icons ti ti-lifebuoy"></i>
                <div data-i18n="Support">Support</div>
              </a>
            </li>
            <li className="menu-item">
              <a
                href="https://demos.pixinvent.com/vuexy-html-admin-template/documentation/"
                target="_blank"
                className="menu-link">
                <i className="menu-icon tf-icons ti ti-file-description"></i>
                <div data-i18n="Documentation">Documentation</div>
              </a>
            </li>
          </ul>
        </aside>
        {/* <!-- / Menu --> */}

        {/* <!-- Layout container --> */}
        <div className="layout-page">
          {/* <!-- Navbar --> */}

          <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar">
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                <i className="ti ti-menu-2 ti-md"></i>
              </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              {/* <!-- Search --> */}
              <div className="navbar-nav align-items-center">
                <div className="nav-item navbar-search-wrapper mb-0">
                  <a className="nav-item nav-link search-toggler d-flex align-items-center px-0" href="javascript:void(0);">
                    <i className="ti ti-search ti-md me-2 me-lg-4 ti-lg"></i>
                    <span className="d-none d-md-inline-block text-muted fw-normal">Search (Ctrl+/)</span>
                  </a>
                </div>
              </div>
              {/* <!-- /Search --> */}

              <ul className="navbar-nav flex-row align-items-center ms-auto">
                {/* <!-- Language --> */}
                <li className="nav-item dropdown-language dropdown">
                  <a
                    className="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow"
                    href="javascript:void(0);"
                    data-bs-toggle="dropdown">
                    <i className="ti ti-language rounded-circle ti-md"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);" data-language="en" data-text-direction="ltr">
                        <span>English</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);" data-language="fr" data-text-direction="ltr">
                        <span>French</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);" data-language="ar" data-text-direction="rtl">
                        <span>Arabic</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);" data-language="de" data-text-direction="ltr">
                        <span>German</span>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* <!--/ Language --> */}

                {/* <!-- Style Switcher --> */}
                <li className="nav-item dropdown-style-switcher dropdown">
                  <a
                    className="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow"
                    href="javascript:void(0);"
                    data-bs-toggle="dropdown">
                    <i className="ti ti-md"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);" data-theme="light">
                        <span className="align-middle"><i className="ti ti-sun ti-md me-3"></i>Light</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);" data-theme="dark">
                        <span className="align-middle"><i className="ti ti-moon-stars ti-md me-3"></i>Dark</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);" data-theme="system">
                        <span className="align-middle"
                          ><i className="ti ti-device-desktop-analytics ti-md me-3"></i>System</span
                        >
                      </a>
                    </li>
                  </ul>
                </li>
                {/* <!-- / Style Switcher--> */}

                {/* <!-- Quick links  --> */}
                <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown">
                  <a
                    className="nav-link btn btn-text-secondary btn-icon rounded-pill btn-icon dropdown-toggle hide-arrow"
                    href="javascript:void(0);"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false">
                    <i className="ti ti-layout-grid-add ti-md"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end p-0">
                    <div className="dropdown-menu-header border-bottom">
                      <div className="dropdown-header d-flex align-items-center py-3">
                        <h6 className="mb-0 me-auto">Shortcuts</h6>
                        <a
                          href="javascript:void(0)"
                          className="btn btn-text-secondary rounded-pill btn-icon dropdown-shortcuts-add"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Add shortcuts"
                          ><i className="ti ti-plus text-heading"></i
                        ></a>
                      </div>
                    </div>
                    <div className="dropdown-shortcuts-list scrollable-container">
                      <div className="row row-bordered overflow-visible g-0">
                        <div className="dropdown-shortcuts-item col">
                          <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                            <i className="ti ti-calendar ti-26px text-heading"></i>
                          </span>
                          <a href="app-calendar.html" className="stretched-link">Calendar</a>
                          <small>Appointments</small>
                        </div>
                        <div className="dropdown-shortcuts-item col">
                          <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                            <i className="ti ti-file-dollar ti-26px text-heading"></i>
                          </span>
                          <a href="app-invoice-list.html" className="stretched-link">Invoice App</a>
                          <small>Manage Accounts</small>
                        </div>
                      </div>
                      <div className="row row-bordered overflow-visible g-0">
                        <div className="dropdown-shortcuts-item col">
                          <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                            <i className="ti ti-user ti-26px text-heading"></i>
                          </span>
                          <a href="app-user-list.html" className="stretched-link">User App</a>
                          <small>Manage Users</small>
                        </div>
                        <div className="dropdown-shortcuts-item col">
                          <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                            <i className="ti ti-users ti-26px text-heading"></i>
                          </span>
                          <a href="app-access-roles.html" className="stretched-link">Role Management</a>
                          <small>Permission</small>
                        </div>
                      </div>
                      <div className="row row-bordered overflow-visible g-0">
                        <div className="dropdown-shortcuts-item col">
                          <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                            <i className="ti ti-device-desktop-analytics ti-26px text-heading"></i>
                          </span>
                          <a href="index.html" className="stretched-link">Dashboard</a>
                          <small>User Dashboard</small>
                        </div>
                        <div className="dropdown-shortcuts-item col">
                          <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                            <i className="ti ti-settings ti-26px text-heading"></i>
                          </span>
                          <a href="pages-account-settings-account.html" className="stretched-link">Setting</a>
                          <small>Account Settings</small>
                        </div>
                      </div>
                      <div className="row row-bordered overflow-visible g-0">
                        <div className="dropdown-shortcuts-item col">
                          <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                            <i className="ti ti-help ti-26px text-heading"></i>
                          </span>
                          <a href="pages-faq.html" className="stretched-link">FAQs</a>
                          <small>FAQs & Articles</small>
                        </div>
                        <div className="dropdown-shortcuts-item col">
                          <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                            <i className="ti ti-square ti-26px text-heading"></i>
                          </span>
                          <a href="modal-examples.html" className="stretched-link">Modals</a>
                          <small>Useful Popups</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                {/* <!-- Quick links --> */}

                {/* <!-- Notification --> */}
                <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
                  <a
                    className="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow"
                    href="javascript:void(0);"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false">
                    <span className="position-relative">
                      <i className="ti ti-bell ti-md"></i>
                      <span className="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
                    </span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end p-0">
                    <li className="dropdown-menu-header border-bottom">
                      <div className="dropdown-header d-flex align-items-center py-3">
                        <h6 className="mb-0 me-auto">Notification</h6>
                        <div className="d-flex align-items-center h6 mb-0">
                          <span className="badge bg-label-primary me-2">8 New</span>
                          <a
                            href="javascript:void(0)"
                            className="btn btn-text-secondary rounded-pill btn-icon dropdown-notifications-all"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Mark all as read"
                            ><i className="ti ti-mail-opened text-heading"></i
                          ></a>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown-notifications-list scrollable-container">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item list-group-item-action dropdown-notifications-item">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <img src="../../assets/img/avatars/1.png" alt className="rounded-circle" />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="small mb-1">Congratulation Lettie 🎉</h6>
                              <small className="mb-1 d-block text-body">Won the monthly best seller gold badge</small>
                              <small className="text-muted">1h ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="javascript:void(0)" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span
                              ></a>
                              <a href="javascript:void(0)" className="dropdown-notifications-archive"
                                ><span className="ti ti-x"></span
                              ></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <span className="avatar-initial rounded-circle bg-label-danger">CF</span>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">Charles Franklin</h6>
                              <small className="mb-1 d-block text-body">Accepted your connection</small>
                              <small className="text-muted">12hr ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="javascript:void(0)" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span
                              ></a>
                              <a href="javascript:void(0)" className="dropdown-notifications-archive"
                                ><span className="ti ti-x"></span
                              ></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <img src="../../assets/img/avatars/2.png" alt className="rounded-circle" />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">New Message ✉️</h6>
                              <small className="mb-1 d-block text-body">You have new message from Natalie</small>
                              <small className="text-muted">1h ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="javascript:void(0)" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span
                              ></a>
                              <a href="javascript:void(0)" className="dropdown-notifications-archive"
                                ><span className="ti ti-x"></span
                              ></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <span className="avatar-initial rounded-circle bg-label-success"
                                  ><i className="ti ti-shopping-cart"></i
                                ></span>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">Whoo! You have new order 🛒</h6>
                              <small className="mb-1 d-block text-body">ACME Inc. made new order $1,154</small>
                              <small className="text-muted">1 day ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="javascript:void(0)" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span
                              ></a>
                              <a href="javascript:void(0)" className="dropdown-notifications-archive"
                                ><span className="ti ti-x"></span
                              ></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <img src="../../assets/img/avatars/9.png" alt className="rounded-circle" />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">Application has been approved 🚀</h6>
                              <small className="mb-1 d-block text-body"
                                >Your ABC project application has been approved.</small
                              >
                              <small className="text-muted">2 days ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="javascript:void(0)" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span
                              ></a>
                              <a href="javascript:void(0)" className="dropdown-notifications-archive"
                                ><span className="ti ti-x"></span
                              ></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <span className="avatar-initial rounded-circle bg-label-success"
                                  ><i className="ti ti-chart-pie"></i
                                ></span>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">Monthly report is generated</h6>
                              <small className="mb-1 d-block text-body">July monthly financial report is generated </small>
                              <small className="text-muted">3 days ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="javascript:void(0)" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span
                              ></a>
                              <a href="javascript:void(0)" className="dropdown-notifications-archive"
                                ><span className="ti ti-x"></span
                              ></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <img src="../../assets/img/avatars/5.png" alt className="rounded-circle" />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">Send connection request</h6>
                              <small className="mb-1 d-block text-body">Peter sent you connection request</small>
                              <small className="text-muted">4 days ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="javascript:void(0)" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span
                              ></a>
                              <a href="javascript:void(0)" className="dropdown-notifications-archive"
                                ><span className="ti ti-x"></span
                              ></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <img src="../../assets/img/avatars/6.png" alt className="rounded-circle" />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">New message from Jane</h6>
                              <small className="mb-1 d-block text-body">Your have new message from Jane</small>
                              <small className="text-muted">5 days ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="javascript:void(0)" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span
                              ></a>
                              <a href="javascript:void(0)" className="dropdown-notifications-archive"
                                ><span className="ti ti-x"></span
                              ></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <span className="avatar-initial rounded-circle bg-label-warning"
                                  ><i className="ti ti-alert-triangle"></i
                                ></span>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">CPU is running high</h6>
                              <small className="mb-1 d-block text-body"
                                >CPU Utilization Percent is currently at 88.63%,</small
                              >
                              <small className="text-muted">5 days ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="javascript:void(0)" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span
                              ></a>
                              <a href="javascript:void(0)" className="dropdown-notifications-archive"
                                ><span className="ti ti-x"></span
                              ></a>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li className="border-top">
                      <div className="d-grid p-4">
                        <a className="btn btn-primary btn-sm d-flex" href="javascript:void(0);">
                          <small className="align-middle">View all notifications</small>
                        </a>
                      </div>
                    </li>
                  </ul>
                </li>
                {/* <!--/ Notification --> */}

                {/* <!-- User --> */}
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <a
                    className="nav-link dropdown-toggle hide-arrow p-0"
                    href="javascript:void(0);"
                    data-bs-toggle="dropdown">
                    <div className="avatar avatar-online">
                      <img src="../../assets/img/avatars/1.png" alt className="rounded-circle" />
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item mt-0" href="pages-account-settings-account.html">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <div className="avatar avatar-online">
                              <img src="../../assets/img/avatars/1.png" alt className="rounded-circle" />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">John Doe</h6>
                            <small className="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider my-1 mx-n2"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="pages-profile-user.html">
                        <i className="ti ti-user me-3 ti-md"></i><span className="align-middle">My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="pages-account-settings-account.html">
                        <i className="ti ti-settings me-3 ti-md"></i><span className="align-middle">Settings</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="pages-account-settings-billing.html">
                        <span className="d-flex align-items-center align-middle">
                          <i className="flex-shrink-0 ti ti-file-dollar me-3 ti-md"></i
                          ><span className="flex-grow-1 align-middle">Billing</span>
                          <span className="flex-shrink-0 badge bg-danger d-flex align-items-center justify-content-center"
                            >4</span
                          >
                        </span>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider my-1 mx-n2"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="pages-pricing.html">
                        <i className="ti ti-currency-dollar me-3 ti-md"></i><span className="align-middle">Pricing</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="pages-faq.html">
                        <i className="ti ti-question-mark me-3 ti-md"></i><span className="align-middle">FAQ</span>
                      </a>
                    </li>
                    <li>
                      <div className="d-grid px-2 pt-2 pb-1">
                        <a className="btn btn-sm btn-danger d-flex" href="auth-login-cover.html" target="_blank">
                          <small className="align-middle">Logout</small>
                          <i className="ti ti-logout ms-2 ti-14px"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </li>
                {/* <!--/ User --> */}
              </ul>
            </div>

            {/* <!-- Search Small Screens --> */}
            <div className="navbar-search-wrapper search-input-wrapper d-none">
              <input
                type="text"
                className="form-control search-input container-xxl border-0"
                placeholder="Search..."
                aria-label="Search..." />
              <i className="ti ti-x search-toggler cursor-pointer"></i>
            </div>
          </nav>

          {/* <!-- / Navbar --> */}

          {/* <!-- Content wrapper --> */}
          <div className="content-wrapper">
            {/* <!-- Content --> */}

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
            {/* <!-- / Content --> */}

            {/* <!-- Footer --> */}
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl">
                <div
                  className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                  <div className="text-body">
                    ©
                    <script>
                      document.write(new Date().getFullYear());
                    </script>
                    , made with ❤️ by <a href="https://pixinvent.com" target="_blank" className="footer-link">Pixinvent</a>
                  </div>
                  <div className="d-none d-lg-inline-block">
                    <a href="https://themeforest.net/licenses/standard" className="footer-link me-4" target="_blank"
                      >License</a
                    >
                    <a href="https://1.envato.market/pixinvent_portfolio" target="_blank" className="footer-link me-4"
                      >More Themes</a
                    >

                    <a
                      href="https://demos.pixinvent.com/vuexy-html-admin-template/documentation/"
                      target="_blank"
                      className="footer-link me-4"
                      >Documentation</a
                    >

                    <a href="https://pixinvent.ticksy.com/" target="_blank" className="footer-link d-none d-sm-inline-block"
                      >Support</a
                    >
                  </div>
                </div>
              </div>
            </footer>
            {/* <!-- / Footer --> */}

            <div className="content-backdrop fade"></div>
          </div>
          {/* <!-- Content wrapper --> */}
        </div>
        {/* <!-- / Layout page --> */}
      </div>

      {/* <!-- Overlay --> */}
      <div className="layout-overlay layout-menu-toggle"></div>

      {/* <!-- Drag Target Area To SlideIn Menu On Small Screens --> */}
      <div className="drag-target"></div>
    </div>
   

     </>
  )
}

export default Dashboard