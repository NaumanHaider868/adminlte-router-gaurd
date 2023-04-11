import React, { useEffect, useState } from 'react'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
function EditOrder() {
    const navigate = useNavigate();
    const param = useParams();
    const [orderItem, setOrderItem] = useState([]);
    const [customer_name, setCustomerName] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [cook_time, setCookTime] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [total_amount, setTotalAmount] = useState('');
    const [shopId ,setShopId] = useState('');
    const [variation_id,setVariationId] = useState();
    const [tax , setTax] = useState('');
    const [total, setTotal] = useState('');

    useEffect(() => {
        axios.get(`https://foodapis.techenablers.info/api/admin/orders/${param.id}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data.data, 'edit')
                setOrderItem(res.data.data.orderItems)
                setCustomerName(res.data.data.order.customer_name);
                setLocation(res.data.data.order.location);
                setStatus(res.data.data.order.status);
                setTotal(res.data.data.order.total);
                setShopId(res.data.data.order.shop_id)
                setTax(res.data.data.order.tax)


                setCookTime(res.data.data.orderItems[0].cook_time);
                setDescription(res.data.data.orderItems[0].description);
                setImage(res.data.data.orderItems[0].image);
                setName(res.data.data.orderItems[0].name);
                setPrice(res.data.data.orderItems[0].price);
                setTotalAmount(res.data.data.orderItems[0].total_amount);
                setVariationId(res.data.data.orderItems[0].variation_id)

            })
    }, []);

    const submitEdit = (e) => {
        e.preventDefault();
        const payload = {
            customer_name: customer_name,
            location: location,
            status: status,
            total: total,

            cook_time: cook_time,
            description: description,
            image: image,
            name: name,
            price: price,
            total_amount: total_amount,
            shop_id: shopId,
            payment_mode: '500',
            delivery_fee : '0',
            items: orderItem

        }
        axios.post(`https://foodapis.techenablers.info/api/admin/orders/${param.id}`, payload, {
            headers: {
                Authorization: 'Bearer' + localStorage.getItem('token')
            }
        })
            .then((res) => {
                setCustomerName('');
                setLocation('');
                setStatus('');
                setTotal('');
                navigate('/orders')
            })
    }

    return (
        <div>
            <Navbar />
            <SideBar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Edit Order</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Edit Order</li>
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

                            <form>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Name</label>
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
                                                {/* <label>Status</label> */}
                                                {/* <input type="text" className="" value={status} placeholder="Status" onChange={(e) => setStatus(e.target.value)} /> */}
                                                <label for="cars">Status</label>
                                                <select className='form-control' name="cars" id="cars" value={status} onChange={(e) => setStatus(e.target.value)}>
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
                                                <label>Total</label>
                                                <input type="text" className="form-control" value={total} placeholder="Total" onChange={(e) => setTotal(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                {/* <div className='car-header'>
                                                    <h1 className='card-title'>Order Items</h1>
                                                </div> */}
                                                <div className="card-body">

                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Price</th>
                                                                <th scope="col">cook time</th>
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
                                                                        <td>{item.price}</td>
                                                                        <td>{item.cook_time}</td>
                                                                        <td>{item.qty}</td>
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


                                    <div className="card-footer" style={{ background: '#fff' }}>
                                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#343a40', borderColor: '#343a40' }} onClick={(e) => submitEdit(e)}>Submit</button>
                                    </div>
                                </div>
                            </form>

                        </div>


                    </div>
                </section>

            </div>
            <Footer />
        </div>
    )
}

export default EditOrder