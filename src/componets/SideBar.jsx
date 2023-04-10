import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SideBar() {
    const Navigate = useNavigate();
    const handleLogOut = (e) => {
        e.preventDefault();
        axios.post('https://foodapis.techenablers.info/api/logout')
            .then((res) => {
                localStorage.clear('token');
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
                                <a className="nav-link">
                                    {/* <i className="nav-icon fas fa-th"></i> */}
                                    <i class="nav-icon fas fa-home"></i>
                                    <p>
                                        Home
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    <i className="nav-icon fas fa-address-card"></i>
                                    <p>
                                        About
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    <i class="nav-icon fas fa-phone-alt"></i>
                                    <p>
                                        Content
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item" onClick={handleLogOut}>
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