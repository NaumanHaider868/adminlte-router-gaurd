import React, { useState, useEffect } from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/ApiUrl'
import ClipLoader from 'react-spinners/ClipLoader';


function ViewDeliveryMan() {
    const param = useParams();
    const [deliveryman, setDeliveryMen] = useState([]);
    const [delivery_man_meta, setDeliveryMenMeta] = useState()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        api.get(`/deliverymens/${param.id}`)
            .then((res) => {
                console.log(res.data, 'daa')
                setDeliveryMen(res.data.data.deliveryMens);
                setDeliveryMenMeta(res.data.data.delivery_man_meta.phone)
            }).finally(() => {
                setIsLoading(false)
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
                                <h1>Delivery Man Details</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <Link to='/deliveryman'>
                                <p className='btn btn-success'><i class="fa fa-arrow-left left_a"></i>&nbsp;&nbsp;Back to Delivery Man</p>
                            </Link>

                            <>
                                <p className='para_bold'>Order #300112</p>
                                {isLoading ? (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                        <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                    </div>
                                ) :
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
                                }

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