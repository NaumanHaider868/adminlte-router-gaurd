import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

function SideBar() {
    const Navigate = useNavigate();
    const handleLogOut = (e) => {
        e.preventDefault();
        axios.post('https://foodapis.techenablers.info/api/logout')
            .then((res) => {
                localStorage.clear('token');
                localStorage.clear('login');
                Navigate('/')
            })
    }
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="../../index3.html" className="brand-link">
                    <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">AdminLTE 3</span>
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
                                <Link to='/admin' className="nav-link">
                                    <i className="nav-icon fas fa-user"></i>
                                    <p>Admin</p>
                                </Link>
                            </li>


                            <li className="nav-item">
                                <Link to='/orders' className="nav-link">
                                    <i className="nav-icon fas fa-home"></i>
                                    <p>Orders</p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to='/shops' className="nav-link">
                                    <i className="nav-icon fas fa-address-card"></i>
                                    <p>
                                        Shops
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/owner' className="nav-link">
                                    <i className="nav-icon fas fa-phone-alt"></i>
                                    <p>
                                        Owner
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/customer' className="nav-link">
                                    <i className="nav-icon fas fa-users"></i>
                                    <p>
                                        Customers
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/coupons' className="nav-link">
                                    {/* <i class="nav-icon fas fa-phone-alt"></i> */}
                                    <i className="nav-icon fas fa-venus-double"></i>
                                    <p>
                                        Coupons
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/deliveryman' className="nav-link">
                                    {/* <i class="nav-icon fas fa-phone-alt"></i> */}
                                    <i class="nav-icon fab fa-first-order"></i>
                                    <p>
                                        Deliverymans
                                    </p>
                                </Link>
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