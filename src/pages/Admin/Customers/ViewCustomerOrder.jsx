import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';

function ViewCustomerOrder() {
    const [isLoading, setIsLoading] = useState(false);
    const [order, setOrder] = useState([])
    const [orderItems, setOrderItems] = useState([])
    const param = useParams();
    const history = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        api.get(`/orders/${param.id}`)
            .then((res) => {
                console.log(res.data.data)
                setOrder(res.data.data.order)
                setOrderItems(res.data.data.orderItems)
            }).finally(() => {
                setIsLoading(false)
            })
    }, [])
    const goback = () => {
        history(-1)
    }
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
                            <p onClick={goback} className='btn btn-success'><i class="fa fa-arrow-left left_a"></i>&nbsp;&nbsp;Back to Orders</p>

                            <>
                                <p className='para_bold'>Order #300112</p>
                                <div className='row'>
                                    {isLoading ? (
                                        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                            <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                        </div>
                                    ) :
                                        <div className='col-md-6'>
                                            <div className='row'>
                                                <div className='col-md-6'>

                                                    <label className='label_1'>Customer Name</label>
                                                    <p className='p_1'>{order.customer_name}</p>
                                                    <label className='label_1'>Customer Phone</label>
                                                    <p className='p_1'>{order.customer_phone}</p>
                                                    <label className='label_1'>Delivery Address</label>
                                                    <p className='p_1'><a href='#'>{order.location}</a></p>

                                                </div>
                                                <div className='col-md-6'>
                                                    <label className='label_1'>Delivery Man Name</label>
                                                    <p className='p_1'>{order.delivery_man_name}</p>
                                                    <label className='label_1'>Delivery Man Phone</label>
                                                    <p className='p_1'>{order.delivery_man_name}</p>
                                                </div>
                                            </div><br /><br />
                                            <b className='bara_bold'>Order Details</b><br /><br />
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item</th>
                                                        <th scope="col">Price</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {/* {orderItems.map((item, i) => {
                                                        return (
                                                            <>
                                                                <tr key={i}>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.price}</td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })} */}
                                                    <tr>
                                                        <td><b>Sub-Total</b></td>
                                                        <td>{order.sub_total}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>Tax</b></td>
                                                        <td>{order.tax}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>Delivery Charges</b></td>
                                                        <td>{order.delivery_charges}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>Total</b></td>
                                                        <td>{order.total}</td>
                                                    </tr>


                                                </tbody>
                                            </table>
                                        </div>
                                    }

                                </div>
                            </>


                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div >
    )
}

export default ViewCustomerOrder