import React from 'react'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link} from 'react-router-dom'

function ViewCoupon() {
    const [coupon, setCoupon] = useState([])
    const navigate = useNavigate();
    const param = useParams();

    useEffect(() => {
        axios.get(`https://foodapis.techenablers.info/api/admin/coupons/${param.id}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        }).then((res) => {
            console.log(res.data.data.coupon, 'coupn view')
            setCoupon(res.data.data.coupon)
        })
    }, [])
    return (
        <div className='wrapper'>
            <Navbar />
            <SideBar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Order Details</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <Link to='/coupons'>
                                <p className='btn btn_search_1' style={{ background: '#343a40', color: '#fff' }}><i class="fa fa-arrow-left left_a"></i>&nbsp;&nbsp;Back to Coupon</p>
                            </Link>

                            <>
                                <p className='para_bold'>Order #300112</p>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='row'>
                                            <div className='col-md-6'>

                                                <label className='label_1'>Code</label>
                                                <p className='p_1'>{coupon.code}</p>
                                                <label className='label_1'>Description</label>
                                                <p className='p_1'>{coupon.description}</p>
                                                <label className='label_1'>General</label>
                                                <p className='p_1'>{coupon.general}</p>

                                            </div>
                                            <div className='col-md-6'>
                                                <label className='label_1'>Discount</label>
                                                <p className='p_1'>{coupon.discount}</p>
                                                <label className='label_1'>Discount Type</label>
                                                <p className='p_1'>{coupon.discount_type}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>


                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default ViewCoupon