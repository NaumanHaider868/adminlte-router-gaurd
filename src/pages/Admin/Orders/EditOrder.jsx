import React, { useEffect, useState } from 'react'
import Navbar from '../../../componets/Navbar';
import SideBar from '../../../componets/SideBar';
import Footer from '../../../componets/Footer';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/ApiUrl'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../componets/Spinner';
import ClipLoader from 'react-spinners/ClipLoader';

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
    const [shopId, setShopId] = useState('');
    const [total, setTotal] = useState('');
    const [isLoadingTwo, setIsLoadingTwo] = useState(false)
    const [alert, setAlert] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        api.get(`/orders/${param.id}`)
            .then((res) => {
                console.log(res.data.data, 'edit')
                setOrderItem(res.data.data.orderItems)
                setCustomerName(res.data.data.order.customer_name);
                setLocation(res.data.data.order.location);
                setStatus(res.data.data.order.status);
                setTotal(res.data.data.order.total);
                setShopId(res.data.data.order.shop_id)


                setCookTime(res.data.data.orderItems[0].cook_time);
                setDescription(res.data.data.orderItems[0].description);
                setImage(res.data.data.orderItems[0].image);
                setName(res.data.data.orderItems[0].name);
                setPrice(res.data.data.orderItems[0].price);
                setTotalAmount(res.data.data.orderItems[0].total_amount);

            }).finally(() => {
                setIsLoading(false)
            })
    }, []);

    const submitEdit = (e) => {
        setIsLoadingTwo(true)
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
            delivery_fee: '0',
            items: orderItem

        }
        api.post(`/orders/${param.id}`, payload)
            .then((res) => {
                // alert(res.data.messages)
                setCustomerName('');
                setLocation('');
                setStatus('');
                setTotal('');
                navigate('/orders')
                toast.success(res.data.messages[0])
                console.log(res.data.messages, 'orders')

            }).catch(res => {
                setAlert(res.response.data.errors);
                document.querySelector('#alert-message').style.display = 'block';
                setTimeout(() => {
                    document.querySelector('#alert-message').style.display = 'none';
                }, 3000);
            }).finally(() => {
                setIsLoadingTwo(false)
            })
    }

    return (
        <div>
            {/* <ToastContainer/> */}
            <Navbar />
            <SideBar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className='pl-1'>Edit Order</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/orders' className="breadcrumb-item"><a href="#">Admin Orders</a></Link>
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
                            {isLoading ? (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                    <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                </div>
                            )
                                :
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
                                                    <label>Total</label>
                                                    <input type="text" className="form-control" value={total} placeholder="Total" onChange={(e) => setTotal(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card">
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



                                    </div>
                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <div className="card-footer" style={{ background: '#fff' }}>
                                                <button type="submit" className="btn btn-success" onClick={(e) => submitEdit(e)}>
                                                    {isLoadingTwo ? (
                                                        <Spinner />
                                                    ) : (
                                                        'Update'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            }


                        </div>


                    </div>
                </section>

            </div>
            <Footer />
        </div>
    )
}

export default EditOrder