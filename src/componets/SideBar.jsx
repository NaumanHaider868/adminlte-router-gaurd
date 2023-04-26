import React from 'react'
import axios from 'axios'
import { Link, useNavigate, NavLink } from 'react-router-dom';

function SideBar() {
    const navigate = useNavigate();
    const handleLogOut = (e) => {
        e.preventDefault();
        axios.post('https://foodapis.techenablers.info/api/logout')
            .then((res) => {
                localStorage.removeItem('token');
                localStorage.removeItem('login');
                navigate('/')
            })
    }
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a className="brand-link">
                    <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">Food Delivery APIs</span>
                </a>

                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Alexander Pierce</a>
                        </div>
                    </div>

                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <NavLink to='/admin' className="nav-link">
                                    <i className="nav-icon fas fa-user"></i>
                                    <p>Admin</p>
                                </NavLink>
                            </li>


                            <li className="nav-item">
                                <NavLink to='/orders' className="nav-link">
                                    <i className="nav-icon fas fa-home"></i>
                                    <p>Orders</p>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to='/shops' className="nav-link">
                                    <i className="nav-icon fas fa-address-card"></i>
                                    <p>
                                        Shops
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/owner' className="nav-link">
                                    <i className="nav-icon fas fa-phone-alt"></i>
                                    <p>
                                        Owner
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/customer' className="nav-link">
                                    <i className="nav-icon fas fa-users"></i>
                                    <p>
                                        Customers
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/coupons' className="nav-link">
                                    {/* <i class="nav-icon fas fa-phone-alt"></i> */}
                                    <i className="nav-icon fas fa-venus-double"></i>
                                    <p>
                                        Coupons
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/deliveryman' className="nav-link">
                                    {/* <i class="nav-icon fas fa-phone-alt"></i> */}
                                    <i class="nav-icon fab fa-first-order"></i>
                                    <p>
                                        Deliverymans
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item" onClick={handleLogOut} style={{cursor:'pointer'}}>
                                <a className="nav-link">
                                    <i class="nav-icon fa-solid fa-arrow-right"></i>
                                    <p>
                                        Logout
                                    </p>
                                </a>
                            </li>

                        </ul>
                    </nav>
                </div>
            </aside>
            <aside className="control-sidebar control-sidebar-dark">
            </aside>
        </div>
    )
}

export default SideBar