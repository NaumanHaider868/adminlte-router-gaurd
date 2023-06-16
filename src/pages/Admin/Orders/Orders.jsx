import React from 'react'
import SideBar from '../../../componets/SideBar'
import Navbar from '../../../componets/Navbar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Model Window

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Orders() {
    // Model Window
    const [show, setShow] = useState(false);
    const [deliveryMens, setDeliveryMens] = useState([]);
    const [deliveryMen, setDeliveryMen] = useState();
    const [order, setOrder] = useState([]);
    const [totalOrder, setTotalOrder] = useState()
    const handleClose = () => setShow(false);

    // Pagination
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState();
    // Search
    const [search, setSearch] = useState([]);

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getOrder()
    }, [])
    const getOrder = () => {
        setIsLoading(true)
        api.get(`/orders`)
            .then((res) => {
                setOrder(res.data.data.orders.data)
                setTotalPage(res.data.data.orders.total)
                setTotalOrder(res.data.data.orders)

            }).finally(() => {
                setIsLoading(false);
            });
    }
    const getSearch = (e) => {
        setIsLoading(true)
        e.preventDefault();
        api.get(`/orders?keyword=${search}`)
            .then((res) => {
                console.log(res)
                setOrder(res.data.data.orders.data)
                setTotalPage(res.data.data.orders.total)
                setTotalOrder(res.data.data.orders)
            }).finally(() => {
                setIsLoading(false);
            });
    }
    const closeSearch = (e) => {
        setIsLoading(true)
        setSearch('');
        setPage(1)
        api.get(`/orders?keyword=${[]}`)
            .then((res) => {
                setOrder(res.data.data.orders.data)
                setTotalPage(res.data.data.orders.total)
                setTotalOrder(res.data.data.orders)
            }).finally(() => {

                setIsLoading(false);
            });
    }
    const handleShow = (id) => {
        // setIsLoading(true)
        api.get(`/deliverymens`)
            .then((res) => {
                console.log('deliverymens', res.data.data.deliveryMens.data);
                setDeliveryMens(res.data.data.deliveryMens.data);
            })
        console.log(id)
        setShow(true)
    }

    const getDeliveryMen = (e) => {
        console.log('DeliveryMenId', e.target.value);
        setDeliveryMen(e.target.value)
    }
    const payload = {
        order_id: deliveryMens.id,
        delivery_man_id: deliveryMen
    }

    const postOrder = () => {
        setIsLoading(true)
        api.post(`/order/assign`, payload)
            .then((res) => {
                console.log(res, 'deliver id');
                // alert(res.data.errors)
                // toast.success(res.data.errors)

            }).catch((error) => {
                console.log(error.response.data.errors[0])
                toast.error(error.response.data.errors[0], {
                    position: 'top-center'
                })
            }).finally(() => {
                setIsLoading(false);
            });
    }

    const handleChange = (page) => {
        setIsLoading(true)
        setPage(page);
        api.get(`/orders?page=${page}`)
            .then((res) => {
                setOrder(res.data.data.orders.data)
                setTotalPage(res.data.data.orders.total)
                setTotalOrder(res.data.data.orders)

            }).finally(() => {
                setIsLoading(false);
            });
    }


    const editOrder = (id) => {
        navigate('/editorder/' + id)
    }
    const viewOrder = (id) => {
        navigate('/vieworder/' + id)
    }

    return (
        <div className="wrapper">
            <SideBar />
            <Navbar />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Assgin Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <label for="cars">Delivere Man</label>
                                <select className='form-control' name="cars" id="cars" onChange={getDeliveryMen}>
                                    {deliveryMens.map((item, i) => {
                                        return (
                                            <option key={i} value={item.id}>{item.first_name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleClose(); postOrder() }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Orders</h1>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">

                                    <div className="card-body">
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-lg" value={search} placeholder="Type your keywords here" onChange={(e) => setSearch(e.target.value)} />
                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-lg btn-success" onClick={getSearch} >
                                                    <i className="fa fa-search"></i>
                                                </button>
                                                <button type="submit" className="btn btn-lg btn-danger" onClick={closeSearch}>
                                                    <i className="fa fa-times"></i>
                                                </button>
                                            </div>
                                        </div><br />
                                        {isLoading ? ( // Show the spinner if isLoading is true
                                            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                                <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                            </div>
                                        ) : (
                                            <table className="table" style={{ marginBottom: '30px' }}>
                                                <thead>
                                                    <tr>
                                                        <th>Sr.#</th>
                                                        <th>Customer Name</th>
                                                        <th>Location</th>
                                                        <th>Amount</th>
                                                        <th>status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {order.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td><b>{((page - 1) * 10) + index + 1}</b></td>
                                                                <td>{item.username}</td>
                                                                <td>{item.location}</td>
                                                                <td>{item.total}</td>
                                                                {/* <td><button style={{ border: 'none', borderRadius: '4px', fontSize: '10px', padding: '0px 4px', fontWeight: '700', color: '#fff', backgroundColor: `${item.status == "New" ? "#17A2B8" : item.status == "Delivered" ? "#28A745" : item.status == "InProccess" ? "#7C007C" : item.status == "Completed" ? "#FFC107" : item.status == "Packed" ? "#28A745" : "#444"}` }}>{item.status}</button></td> */}
                                                                <td>
                                                                    {item.status === "New" && (
                                                                        <span className="badge badge-warning">
                                                                            {item.status}
                                                                        </span>
                                                                    )}
                                                                    {(item.status === "InProccess" || item.status === "InProcess") && (
                                                                        <span className="badge badge-danger">
                                                                            {item.status}
                                                                        </span>
                                                                    )}
                                                                    {item.status === "Onway" && (
                                                                        <span className="badge badge-primary">
                                                                            {item.status}
                                                                        </span>
                                                                    )}
                                                                    {item.status === "Completed" && (
                                                                        <span className="badge badge-primary">
                                                                            {item.status}
                                                                        </span>
                                                                    )}
                                                                    {(item.status === "Packed" || item.status === "Pack") && (
                                                                        <span className="badge badge-info">
                                                                            {item.status}
                                                                        </span>
                                                                    )}
                                                                    
                                                                </td>
                                                                <td>
                                                                    <a onClick={() => viewOrder(item.id)}><i class="fas fa-eye" style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i></a>&nbsp;
                                                                    <a onClick={() => editOrder(item.id)}><i class="fas fa-edit" style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i></a>
                                                                    <a onClick={() => handleShow(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}>Assgin</a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>

                                            </table>
                                        )}

                                        {totalOrder && totalOrder.total <= 10 ?
                                            '' :
                                            <PaginationControl
                                                page={page}
                                                total={totalPage}
                                                limit={10}
                                                changePage={(page) => {
                                                    // setPage(page);
                                                    handleChange(page)
                                                }}
                                            />
                                            // <h1>Ho</h1>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Orders