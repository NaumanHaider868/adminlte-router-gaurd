import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ViewCustomerOrder() {
    const param = useParams();
    const history = useNavigate()

    const [orderItemObj,setOrderItemObj]=useState()

    const [customer_name, setCustomerName] = useState('');
    const [customer_phone, setCustomerPhone] = useState();
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState();
    const [shop_id, setShopId] = useState()
    const [delivery_time, setDeliveryTime] = useState()


    //orderItems
    const [orderItem, setOrderItems] = useState([]);
    const [total, setTotal] = useState();
    const [order, setOrder] = useState();



    const [delivery_man_phone, setDeliveryManPhone] = useState();
    const [delivery_man_name, setDeliveryManName] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [delivery_charges, setDeliveryCharges] = useState()
    const [other_details, setOtherDetails] = useState()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showItem, setShowItem] = useState(false);
    const handleCloseItem = () => setShowItem(false);

    useEffect(() => {
        setIsLoading(true)
        api.get(`/orders/${param.id}`)
            .then((res) => {
                console.log(res,'vieworder')
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

                            {isLoading ? (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                    <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                </div>
                            ) :
                                (
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
                                                        <input className='' type="text" placeholder='Customer Phone' value={customer_phone} onChange={(e) => setCustomerPhone(e.target.value)} />
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
                                                {orderItem.map && orderItem.map((item, index) => {
                                                    return (
                                                        <>
                                                            <tr key={index}>
                                                                <td>{item.name}</td>
                                                                <td>{item.price}</td>
                                                                <td>{item.cook_time}</td>
                                                                <td>{item.qty}</td>
                                                                <td>${item.total_amount}</td>
                                                            </tr>
                                                        </>

                                                    )
                                                })}
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
                                            </div>
                                        </div>


                                            <Modal className='editorder_window' show={show} onHide={handleClose}>
                                                <Modal.Body>
                                                    <div>
                                                        <label>Select Item</label>
                                                        <input value='add  item' />
                                                        <label className='w-100 mt-2'>Qty</label>
                                                        <input type='text' value='quty' readonly className='form-control w-50' />
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button className='btn_Censel' variant="secondary" onClick={handleClose}>Cancel</Button>
                                                    <Button className='add_btn_right' variant="primary" onClick={() => { handleClose(); }}>
                                                        Add Item
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>

                                            {/* OrderItems */}

                                            <Modal className='editorder_window' show={showItem} onHide={handleCloseItem}>
                                                <Modal.Body>
                                                    <div>
                                                        
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button className='btn_Censel' variant="secondary" onClick={handleCloseItem}>Close</Button>
                                                </Modal.Footer>
                                            </Modal>

                                    </>
                                )
                            }

                        </div>


                    </div>
                </section>
            </div>
            <Footer />
        </div >
    )
}

export default ViewCustomerOrder