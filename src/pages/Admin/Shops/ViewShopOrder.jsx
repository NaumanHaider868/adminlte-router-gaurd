import React, { useState, useEffect } from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';

function ViewShopOrder() {
    const [order, setOrder] = useState([]);
    const [orderItems, setOrderItems] = useState([])
    const param = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        api.get(`/shops/${param.id}/orders/${param.id1}`)
            .then((res) => {
                console.log(res.data.data, 'view shop order')
                setOrder(res.data.data.order)
                setOrderItems(res.data.data.orderItems)
            }).finally(() => {
                setIsLoading(false)
            })
    }, [])
    const handleBack = () => {
        navigate(`/shoporder/${param.id}`)
    }
    return (
        <>
            <div className='wrapper'>
                <Navbar />
                <SideBar />
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Shop Order Details</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="content">
                        <div className="card">
                            <div className="card-body">
                                <p className='btn btn-success' onClick={handleBack}><i class="fa fa-arrow-left left_a"></i>&nbsp;&nbsp;Back to Orders</p>

                                <>
                                    <p className='para_bold'>Order #300112</p>
                                    <div className='row'>
                                        {isLoading ? (
                                            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                                <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                            </div>) :
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
                                                        <p className='p_1'>{order.customer_phone}</p>
                                                        <label className='label_1'>Status</label>
                                                        <p className='p_1'>{order.status}</p>
                                                    </div>
                                                </div>
                                                <p className='para_bold'>Order Items</p>
                                                <table className="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <th scope="col"><b>Item</b></th>
                                                            <th scope="col"><b>Price</b></th>
                                                        </tr>
                                                        {orderItems.map((item, i) => {
                                                            return (
                                                                <>
                                                                    <tr key={i}>
                                                                        <td>{item.name}</td>
                                                                        <td>{item.price}</td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })}
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
        </>
    )
}

export default ViewShopOrder