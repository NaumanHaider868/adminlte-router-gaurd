import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [userName,setUserName] = useState('');
    const [image,setImage] = useState()
    // const match = useRouteMatch('/viewshoporder/:id1/:id2');
    // const id1 = match?.params.id1;
    // const id2 = match?.params.id2;
    // console.log("location", location);
    const handleLogOut = (e) => {
        e.preventDefault();
        axios.post('https://foodapis.techenablers.info/api/logout')
            .then((res) => {
                localStorage.removeItem('token');
                localStorage.removeItem('login');
                navigate('/')
                // console.log(res)
                toast.success(res.data.messages[0])
            })
    }
    useEffect(()=>{
        axios.get('https://foodapis.techenablers.info/api/user/profile', {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
            }
        })
        .then((res)=>{
            console.log(res.data.data.usermeta.image,'sidebarimage')
            // console.log
            setUserName(res.data.data.user.username)
            setImage(res.data.data.usermeta.image)
        })
    },[])
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
                            <img src={image} className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">{userName}</a>
                        </div>
                    </div>

                    {/* <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div> */}

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <NavLink to='/admin' className={"nav-link " + (location.pathname === "/admin" || location.pathname === "/viewcategories" || location.pathname === "/addcategorie" || location.pathname === "/viewitems" || location.pathname === "/additem" ? 'active' : '')}>
                                    <i className="nav-icon fas fa-user"></i>
                                    <p>Admin</p>
                                </NavLink>
                            </li>


                            <li className="nav-item">
                                <NavLink to='/orders' className={"nav-link " + (location.pathname.startsWith("/vieworder/") || location.pathname.startsWith("/editorder/") ? 'active' : '')}>
                                    <i className="nav-icon fas fa-home"></i>
                                    <p>Orders</p>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to='/shops' className={"nav-link " + (location.pathname.startsWith("/editshop/") || location.pathname.startsWith("/shoporder/") || location.pathname === '/addshop' || location.pathname.startsWith("/viewshoporder/") || location.pathname.startsWith("/editshoporder/") ? 'active' : '')}>
                                    <i className="nav-icon fas fa-address-card"></i>
                                    <p>
                                        Shops
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/owner' className={"nav-link " + (location.pathname.startsWith("/viewowner/") || location.pathname.startsWith("/editowner/") || location.pathname === '/addowner' ? 'active' : '')}>
                                    <i className="nav-icon fas fa-phone-alt"></i>
                                    <p>
                                        Owner
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/customer' className={"nav-link " + (location.pathname.startsWith("/editcustomer/") || location.pathname.startsWith("/viewcustomer/") || location.pathname.startsWith("/customerorders/")  ? 'active' : '')}>
                                    <i className="nav-icon fas fa-users"></i>
                                    <p>
                                        Customers
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/coupons' className={"nav-link " + (location.pathname === "/addcoupon" || location.pathname.startsWith("/editcoupon/") || location.pathname.startsWith("/viewcoupon/") ? 'active' : '')}>
                                    {/* <i class="nav-icon fas fa-phone-alt"></i> */}
                                    <i className="nav-icon fas fa-venus-double"></i>
                                    <p>
                                        Coupons
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/categorie' className={'nav-link ' + (location.pathname === '/addcategories' ? 'active' : '')}>
                                    {/* <i class="nav-icon fas fa-phone-alt"></i> */}
                                    <i className="nav-icon fa fa-asterisk"></i>
                                    <p>
                                        Categories
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                {/* <NavLink to='/item' className={"nav-link " + (location.pathname === '/additems') ? 'active' : ''}> */}
                                <NavLink to='/item' className={"nav-link " + (location.pathname === '/additems' ? 'active' : '')}>

                                    {/* <i class="nav-icon fas fa-phone-alt"></i> */}
                                    <i className="nav-icon fa fa-sitemap"></i>
                                    <p>
                                        Items
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/deliveryman' className={"nav-link " + (location.pathname === '/adddeliverymen' || location.pathname.startsWith("/editdeliveryman/") || location.pathname.startsWith("/viewdeliveryman/") || location.pathname.startsWith("/deliverymanorders/") ? 'active' : '')}>
                                    {/* <i class="nav-icon fas fa-phone-alt"></i> */}
                                    <i class="nav-icon fab fa-first-order"></i>
                                    <p>
                                        Deliverymans
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/profile' className='nav-link'>
                                    {/* <i class="nav-icon fas fa-phone-alt"></i> */}
                                    <i class="nav-icon fa fa-user-circle"></i>
                                    <p>
                                        Profile
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item" onClick={handleLogOut} style={{ cursor: 'pointer' }}>
                                <a className="nav-link">
                                    <i class="nav-icon fa fa-sign-out"></i>
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