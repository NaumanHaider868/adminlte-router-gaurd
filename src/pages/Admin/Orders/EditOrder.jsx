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

import Button from 'react-bootstrap/Button';
import InputMask from 'react-input-mask';
import Modal from 'react-bootstrap/Modal';

function EditOrder() {
    const navigate = useNavigate();
    const param = useParams();
    const [customer_name, setCustomerName] = useState('');
    const [customer_phone, setCustomerPhone] = useState();
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState();
    const [shop_id, setShopId] = useState()
    const [delivery_time, setDeliveryTime] = useState()

    const [customer_id, setCustomerId] = useState()

    //orderItems
    const [orderItem, setOrderItem] = useState([]);
    const [total, setTotal] = useState();
    const [order_id, setOrderId] = useState();
    const [shopQty, setShopQty] = useState();


    const [isLoadingTwo, setIsLoadingTwo] = useState(false)
    const [alert, setAlert] = useState([]);

    const [delivery_man_phone, setDeliveryManPhone] = useState();
    const [delivery_man_name, setDeliveryManName] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [delivery_charges, setDeliveryCharges] = useState()
    const [other_details, setOtherDetails] = useState()

    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); setVariations([]) };
    const handleShow = () => { setShow(true); setVariations([]) };

    const [showItem, setShowItem] = useState(false);
    const handleCloseItem = () => setShowItem(false);

    // edit orderItems

    const [orderItemObj, setOrderItemObj] = useState([]);
    const [shopOrder, setShopOrder] = useState([])
    const [shopOrderId, setShopOrderId] = useState()
    const [variations, setVariations] = useState([])
    const [variation_id, setVariationId] = useState()
    const [variation_price, setVariationPrice] = useState()


    useEffect(() => {
        getEditOrder()
    }, []);
    const getEditOrder = () => {
        setIsLoading(true)
        api.get(`/orders/${param.id}`)
            .then((res) => {
                console.log(res.data.data, 'edit');

                //Delivery Man
                setVariations([])
                setDeliveryManPhone(res.data.data.order.delivery_man_phone);
                setDeliveryManName(res.data.data.order.delivery_man_name);
                setCustomerId(res.data.data.order.customer_id)
                // order
                setCustomerName(res.data.data.order.customer_name)
                setCustomerPhone(res.data.data.order.customer_phone)
                setStatus(res.data.data.order.status);
                setLocation(res.data.data.order.location)
                setShopId(res.data.data.order.shop_id)
                setDeliveryCharges(res.data.data.order.delivery_charges)
                setDeliveryTime(res.data.data.order.delivery_time)

                // orderItems
                setOrderItem(res.data.data.orderItems);
                setTotal(res.data.data.order.total)
                setShopOrder(res.data.data.shopItems)
                //setVariationId(res.data.data.orderItems.variation_id)
                setOrderId(res.data.data.order.id)

                // setItemId(res.data.data.orderItems.item_id)
                // console.log(res.data.data.order.order_id,'shopId')

            }).finally(() => {
                setIsLoading(false)
            })
    }
    const submitEdit = (e) => {
        setIsLoadingTwo(true)
        e.preventDefault();
        const payload = {
            status: status,
            location: location,
            payment_mode: 'card',
            delivery_fee: delivery_charges,
            customer_name: customer_name,
            customer_phone: customer_phone,
            customer_id: customer_id,
            shop_id: shop_id,
            other_details: other_details,
            //items: orderItem

        }
        api.post(`/orders/${param.id}`, payload)
            .then((res) => {
                navigate('/orders')
                toast.success(res.data.messages[0])

            }).catch(res => {
                console.log(res.response.data.errors)
                setAlert(res.response.data.errors);
                document.querySelector('#alert-message').style.display = 'block';
                setTimeout(() => {
                    document.querySelector('#alert-message').style.display = 'none';
                }, 3000);
            }).finally(() => {
                setIsLoadingTwo(false)
            })
    }

    const handleShowItem = (id) => {
        api.get(`/orderitems/${id}`)
            .then((res) => {
                setShowItem(true);
                setOrderItemObj(res.data.data.orderItem)
            })
    }
    const handleChage = (e, type) => {
        if (type === "items_name") {
            orderItemObj.items_name = e.target.value
        } else if (type === "items_price") {
            orderItemObj.items_price = e.target.value
        } else if (type === "qty") {
            orderItemObj.qty = e.target.value
        } else if (type === "items_cooktime") {
            orderItemObj.items_cooktime = e.target.value
        } else if (type === "amount") {
            orderItemObj.amount = e.target.value
        }

    }
    const postItem = () => {
        api.post(`/orderitems`, orderItemObj)
            .then((res) => {
                console.log(res, 'postitem')
            })
    }
    const deleteItem = (id) => {
        setIsLoading(true)
        api.delete(`/orderitems/${id}`)
            .then((res) => {
                getEditOrder();
                toast.success(res.data.messages[0])
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const getShopId = (e) => {
        console.log(e.target.value)
        setShopOrderId(e.target.value);
        api.get(`/items/${shopOrderId}/variations`)
            .then((res) => {
                // console.log(res.data.data.variations, 'res')
                setVariations(res.data.data.variations)
                setVariationPrice(res.data.data.variations.price)
            })
    };
    let shopPayload = {
        item_id: shopOrderId,
        order_id: order_id,
        qty: shopQty,
        variation_id: variation_id,
        price: variation_price,
    }
    const addShop = () => {
        api.post(`/orderitems`, shopPayload)
            .then((res) => {
                // console.log(res, 'addshop')
                toast.success(res.data.messages[0])
                getEditOrder()
            })
    }
    const handleCheck = (e) => {

        const selectedValue = e.target.value;
        setVariationId(selectedValue)
    }
    return (
        <div className='wrapper'>
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
                <section className="content">
                    <div className='alert alert-danger' id='alert-message'>
                        {alert && (
                            <>
                                {alert.map && alert.map((error, index) => (
                                    <div className='valid'>
                                        <p className='valid-p alert-danger' key={index}>{error}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    <div className="card edit_card">
                        <div className="card-body">
                            <Link to='/orders'><button className='btn btn-default btn_search_1'><i className="fa fa-arrow-left left_a"></i>Back to Orders</button></Link><br /><br />
                            {isLoading ? (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                    <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                </div>
                            ) : (
                                <>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <label htmlFor="name" style={{ marginTop: '18px' }}>Name</label>
                                                    <input className='' type="text" placeholder='customer Name' value={customer_name} onChange={(e) => setCustomerName(e.target.value)} />
                                                </div>
                                                <div className='col-md-6'>
                                                    <label style={{ marginTop: '18px' }}>Phone</label>
                                                    <InputMask mask='(9999) 999-9999' className='' type="text" placeholder='Customer Phone' value={customer_phone} onChange={(e) => setCustomerPhone(e.target.value)} />
                                                </div>
                                                <div className='col-md-6'>
                                                    <label for="cars" style={{ marginTop: '18px' }}>Status</label>
                                                    <select className='prob_select' value={status} onChange={(e) => setStatus(e.target.value)}>
                                                        <option value="New">New</option>
                                                        <option value="InProccess">InProccess</option>
                                                        <option value="Packed">Packed</option>
                                                        <option value="Onway">Onway</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                </div>
                                                <div className='col-md-6'>
                                                    <label style={{ marginTop: '18px' }}>Location</label>
                                                    <input className='form-control' type="text" placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                                                </div>
                                                <div className='col-md-6'>
                                                    <h5><b>Additional information</b></h5>
                                                    <label className='admin_notes' style={{ marginTop: '18px' }}>Admin notes</label>
                                                    <textarea class="form-control" defaultValue={other_details} onChange={(e) => setOtherDetails(e.target.value)} id="textAreaExample1" rows="4"></textarea>
                                                    {/* {/ <label class="form-label" for="textAreaExample">Message</label> /} */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <label className='delivery_man_detail_label'>Delivery man</label>
                                            <div className='delivery_details'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <div className='delivery_one'>
                                                            <p className='float-right'>{delivery_man_name}</p>
                                                            <p><b>Name:</b></p>
                                                        </div>
                                                        <div className='delivery_one'>
                                                            <p className='float-right'><b>{delivery_man_phone}</b></p>
                                                            <p><b>Phone:</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className='update_para'><b>Order Details</b></p>
                                    <button className='btn btn-primary add_item_btn' onClick={handleShow}>Add Item</button>
                                    <table className="table table-bordered update_table">
                                        <thead className="custom-thead">
                                            <tr>
                                                <th scope="col">Items Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Cook Time</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Total Amount</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <>
                                                {orderItem.map && orderItem.map((item, index) => {
                                                    return (
                                                        <>
                                                            <tr key={index}>
                                                                <td>{item.name}</td>
                                                                <td>{item.price}</td>
                                                                <td>{item.cook_time}</td>
                                                                <td>{item.qty}</td>
                                                                <td>${item.total_amount}</td>
                                                                <td><i className="fa fa-edit text-primary" style={{ cursor: 'pointer' }} onClick={() => handleShowItem(item.id)}></i> <i className="fa fa-trash text-danger" onClick={() => deleteItem(item.id)} style={{ cursor: 'pointer' }}></i></td>
                                                            </tr>
                                                        </>

                                                    )
                                                })}
                                            </>
                                        </tbody>
                                    </table>
                                    <div className='float-right'>
                                        <div className='total_section'>
                                            <div className='row'>
                                                <div className='col-md-8'>
                                                    <p className='mb-0'><b>Total</b></p>
                                                </div>
                                                <div className='col-md-4 grand_total_price'>
                                                    <p className='item_p_sec'><b>${total}</b></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button className='btn btn-primary update_b_e float-end' onClick={submitEdit}>{isLoadingTwo && <div className='spinner-border spinner-border-sm' id='stoploading'></div>}Update Order</button>
                                        </div>
                                    </div>


                                    <div>
                                        <Modal className='editorder_window' show={show} onHide={handleClose}>
                                            <Modal.Body>
                                                <div>
                                                    <label>Select Item</label>
                                                    <select className="form-select" aria-label="Default select example" onChange={getShopId}>
                                                        <option disabled selected>Select Item</option>
                                                        {shopOrder.map((item, i) => {
                                                            return (
                                                                <option key={i} value={item.id}>{item.name}</option>
                                                            );
                                                        })}
                                                    </select><br />

                                                    {shopOrder && variations.map((item, i) => {
                                                        return (
                                                            <>
                                                                {/* <div> */}
                                                                <label>{item.name}</label>&nbsp;
                                                                <input key={i} value={item.id} defaultChecked={variation_id === item.id} onChange={handleCheck} type='checkbox' />&nbsp;
                                                                {/* </div> */}

                                                            </>
                                                        )
                                                    })}
                                                    <label className='w-100 mt-2'>Qty</label>
                                                    <input type='text' value={shopQty} onChange={(e) => setShopQty(e.target.value)} className='form-control w-50' />
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button className='btn_Censel' variant="secondary" onClick={handleClose}>Cancel</Button>
                                                <Button className='add_btn_right' variant="primary" onClick={() => { handleClose(); addShop(); }}>
                                                    Add Item
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        {/* OrderItems */}

                                        <Modal className='editorder_window' show={showItem} onHide={handleCloseItem}>
                                            <Modal.Body>
                                                <div>
                                                    <label className="w-100 mt-2">Item Name</label>
                                                    <input type="text" className="form-control w-50" defaultValue={orderItemObj.items_name} onChange={(e) => handleChage(e, 'items_name')} />

                                                    <label className="w-100 mt-2">Item Price</label>
                                                    <input type="text" className="form-control w-50" defaultValue={orderItemObj.items_price} onChange={(e) => handleChage(e, 'items_price')} />

                                                    <label className="w-100 mt-2">Qty</label>
                                                    <input type="text" className="form-control w-50" defaultValue={orderItemObj.qty} onChange={(e) => handleChage(e, 'qty')} />

                                                    <label className="w-100 mt-2">Cook Time</label>
                                                    <input type="text" className="form-control w-50" defaultValue={orderItemObj.items_cooktime} onChange={(e) => handleChage(e, 'items_cooktime')} />

                                                    <label className="w-100 mt-2">Total Amount</label>
                                                    <input type="text" className="form-control w-50" defaultValue={orderItemObj.amount} onChange={(e) => handleChage(e, 'amount')} />
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button className='btn_Censel' variant="secondary" onClick={handleCloseItem}>Cancel</Button>
                                                <Button className='add_btn_right' variant="primary" onClick={() => { handleCloseItem(); postItem() }}>
                                                    Edit Item
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </div>
    )
}

export default EditOrder