import React, { useState, useEffect } from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { useParams, Link } from 'react-router-dom'
import axios from '../../services/ApiUrl'


function ViewDeliveryMan() {
    const param = useParams();
    const [deliveryman, setDeliveryMen] = useState([]);
    const [delivery_man_meta, setDeliveryMenMeta] = useState()

    useEffect(() => {
        axios.get(`/deliverymens/${param.id}`)
            .then((res) => {
                console.log(res.data.data.delivery_man)
                setDeliveryMen(res.data.data.delivery_man);
                setDeliveryMenMeta(res.data.data.delivery_man_meta.phone)
            })
    },[])
    return (
        <div className='wrapper'>
            <Navbar />
            <SideBar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Delivery Man Details</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <Link to='/deliveryman'>
                                <p className='btn btn-success'><i class="fa fa-arrow-left left_a"></i>&nbsp;&nbsp;Back to Customers</p>
                            </Link>

                            <>
                                <p className='para_bold'>Order #300112</p>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='row'>
                                            <div className='col-md-6'>

                                                <label className='label_1'>User Name</label>
                                                <p className='p_1'>{deliveryman.email}</p>
                                                <label className='label_1'>First Name</label>
                                                <p className='p_1'>{deliveryman.first_name}</p>
                                                <label className='label_1'>Last Name</label>
                                                <p className='p_1'>{deliveryman.last_name}</p>
                                                <label className='label_1'>Phone</label>
                                                <p className='p_1'>{delivery_man_meta}</p>

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

export default ViewDeliveryMan