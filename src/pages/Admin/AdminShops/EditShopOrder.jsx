import React, { useEffect, useState } from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

function EditShopOrder() {
    const [alert, setAlert] = useState([]);
    const [order, setOrder] = useState([]);
    const [orderItem, setOrderItem] = useState([])

    const [customer_name, setCustomerName] = useState('');
    const [customer_phone, setCustomerPhone] = useState('');
    const [delivery_charges, setDeliveryCharges] = useState('');
    const [delivery_man_name, setDeliveryManName] = useState('');
    const [delivery_man_phone, setDeliveryManPhone] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [total, setTotal] = useState('')
    const [customer_id, setCustomerId] = useState();
    const [item_id, setItemId] = useState();


    const param = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`/shops/${param.id}/orders/${param.id1}`)
            .then((res) => {
                console.log(res.data.data)
                // setOrder(res.data.data.order)
                setOrderItem(res.data.data.orderItems)
                setCustomerName(res.data.data.order.customer_name)
                setCustomerPhone(res.data.data.order.customer_phone)
                setDeliveryCharges(res.data.data.order.delivery_charges)
                setDeliveryManName(res.data.data.order.delivery_man_name)
                setDeliveryManPhone(res.data.data.order.delivery_man_phone)
                setLocation(res.data.data.order.location)
                setStatus(res.data.data.order.status)
                setCustomerId(res.data.data.order.customer_id)
                setTotal(res.data.data.order.total)

                setItemId(res.data.data.order.id)
            })
    }, [])

    const submitEdit = (e) => {
        e.preventDefault();
        const payload = {
            customer_name: customer_name,
            location: location,
            status: status,
            total: total,
            customer_id: customer_id,

            // cook_time: cook_time,
            // description: description,
            // image: image,
            // name: name,
            // price: price,
            // total_amount: total_amount,
            // id: shop_id,
            shop_id: param.id,
            item_id: item_id,
            payment_mode: '500',
            delivery_fee: delivery_charges,
            items: orderItem

        }
        console.log(payload)
        api.post(`/orders/${param.id1}`, payload)
            .then((res) => {
                console.log(res, 'post')
                setCustomerName('');
                setLocation('');
                setStatus('');
                setTotal('');
                navigate(`/shoporder/${param.id}`)
                toast.success(res.data.messages[0])
            }).catch(res => {
                console.log(res.response.data.errors)
                setAlert(res.response.data.errors);
                const alertMessage = document.querySelector('#alert-message');
                if (alertMessage) {
                    alertMessage.style.display = 'block';
                    setTimeout(() => {
                        alertMessage.style.display = 'none';
                    }, 3000);
                }
            })
    }

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
                                    <h1 className='pl-1'>Edit Shop Order</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li onClick={handleBack} className="breadcrumb-item"><a href="#">Admin Shop Order</a></li>
                                        <li className="breadcrumb-item active">Edit Shop Order</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='content'>
                        <div className='container-fluid'>
                            <div class="card card-dark">
                                <div class="card-header">
                                    <h3 class="card-title">Quick Example</h3>
                                </div>
                                <div className='alert alert-danger' id='alert-message'>
                                    {
                                        alert.map((err, index) => {
                                            return (
                                                <div className='valid'>
                                                    <p className='valid-p alert-danger' key={index}>{err}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <form>
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Customer Name</label>
                                                    <input type="text" className="form-control" value={customer_name} placeholder="Customer Name" onChange={(e) => setCustomerName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Location</label>
                                                    <input type="text" className="form-control" value={location} placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Customer Number</label>
                                                    <input type="text" className="form-control" value={customer_phone} placeholder="Customer Number" onChange={(e) => setLocation(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Delivery Man Name</label>
                                                    <input type="text" className="form-control" value={delivery_man_name} placeholder="Delivery Man Name" onChange={(e) => setLocation(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Delivery Man Phone</label>
                                                    <input type="text" className="form-control" value={delivery_man_phone} placeholder="Delivery Man Phone" onChange={(e) => setLocation(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Status</label>
                                                    <select className='form-control' value={status} onChange={(e) => setStatus(e.target.value)}>
                                                        <option value="New">New</option>
                                                        <option value="InProccess">InProccess</option>
                                                        <option value="Packed">Packed</option>
                                                        <option value="Onway">Onway</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Delivery Charges</label>
                                                    <input type="text" className="form-control" value={delivery_charges} placeholder="Delivery Charges" onChange={(e) => setLocation(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Total</label>
                                                    <input type="text" className="form-control" value={total} name='total' placeholder="Total" onChange={(e) => setTotal(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card">
                                                    {/* <div className='card-header'>
                                                        <h1 className='card-title'>Order Items</h1>
                                                    </div> */}
                                                    <div className="card-body">

                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Price</th>
                                                                    <th scope="col">cook time</th>
                                                                    <th scope='col'>Description</th>
                                                                    <th scope="col">qty</th>
                                                                    <th scope="col">total amount</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {orderItem.map((item, i) => {
                                                                    return (
                                                                        <>
                                                                            <tr key={i}>
                                                                                <td>{item.name}</td>
                                                                                <td>{item.description}</td>
                                                                                <td>{item.cook_time}</td>
                                                                                <td>{item.qty}</td>
                                                                                <td>{item.price}</td>
                                                                                <td>{item.total_amount}</td>
                                                                            </tr>
                                                                        </>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>


                                                    </div>

                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                    <div className="card-footer" style={{ background: '#fff' }}>
                                        <button type="submit" className="btn btn-success" onClick={(e) => submitEdit(e)}>Update</button>
                                    </div>
                                </form>

                            </div>


                        </div>
                    </section>

                </div>
                <Footer />
            </div>
        </>
    )
}

export default EditShopOrder