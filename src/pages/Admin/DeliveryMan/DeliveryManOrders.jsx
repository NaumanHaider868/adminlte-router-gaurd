import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Navbar from '../../../componets/Navbar';
import SideBar from '../../../componets/SideBar';
import Footer from '../../../componets/Footer';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import ClipLoader from 'react-spinners/ClipLoader';

import api from '../../services/ApiUrl'

function DeliveryManOrders() {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState();
    const navigate = useNavigate();
    const [search, setSearch] = useState([])
    const param = useParams();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true)
        api.get(`/deliverymens/${param.id}/orders`)
            .then((res) => {
                console.log(res)
                setOrders(res.data.data.orders)
                setTotalPage(res.data.data.orders.total)
            })
            .catch((error) => {
                console.log(error)
            }).finally(() => {
                setIsLoading(false)
            })
    }, [])
    const getSearch = (e) => {
        setIsLoading(true)
        // setSearch(e.target.value)
        e.preventDefault();
        api.get(`/deliverymens/${param.id}/orders?keyword=${search}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data.data.orders)
                setOrders(res.data.data.orders)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    const closeSearch = (e) => {
        setIsLoading(true)
        setSearch('');
        api.get(`/deliverymens/${param.id}/orders?keyword=${[]}`)
            .then((res) => {
                setOrders(res.data.data.orders)
            }).finally(() => {
                setIsLoading(false)
            });
    }
    const handelChange = (page) => {
        setIsLoading(true)
        setPage(page)
        api.get(`/deliverymens/${param.id}/orders?page=${page}`)
            .then((res) => {
                console.log(res.data.data.orders);
                setOrders(res.data.data.orders);

            }).finally(() => {
                setIsLoading(false)
            })
    }
    return (
        <div className='wrapper'>
            <Navbar />
            <SideBar />
            <div className='wrapper'>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Delivery Man Orders</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <Link to='/deliveryman' className="breadcrumb-item"><a href="#">Delivery Man</a></Link>
                                        <li className="breadcrumb-item active">Delivery Man Orders</li>
                                    </ol>
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
                                            {isLoading ? (
                                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                                    <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                                </div>
                                            ) : (
                                                orders && orders.length > 0 ? (
                                                    <table className="table" style={{ marginBottom: '30px' }}>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Sr.#</th>
                                                                <th scope="col">Customer Name</th>
                                                                <th scope="col">Customer Phone</th>
                                                                <th scope="col">Shop Name</th>
                                                                <th scope="col">Shop Location</th>
                                                                <th scope="col">Delivery Time</th>
                                                                <th scope="col">Pickup Time</th>
                                                                <th scope="col">Amount</th>
                                                                <th scope="col">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {orders.map((item, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{((page - 1) * 10) + i + 1}</td>
                                                                        <td>{item.customer_name}</td>
                                                                        <td>{item.customer_phone}</td>
                                                                        <td>{item.shop_name}</td>
                                                                        <td>{item.shop_location}</td>
                                                                        <td>{item.delivery_time}</td>
                                                                        <td>{item.pickup_time}</td>
                                                                        <td>{item.total_amount}</td>
                                                                        <td>
                                                                            <button
                                                                                style={{
                                                                                    border: 'none',
                                                                                    borderRadius: '4px',
                                                                                    fontSize: '10px',
                                                                                    padding: '0px 4px',
                                                                                    fontWeight: '700',
                                                                                    color: '#fff',
                                                                                    backgroundColor: `${item.status === 'New'
                                                                                            ? '#17A2B8'
                                                                                            : item.status === 'Delivered'
                                                                                                ? '#28A745'
                                                                                                : item.status === 'InProccess'
                                                                                                    ? '#7C007C'
                                                                                                    : item.status === 'Completed'
                                                                                                        ? '#FFC107'
                                                                                                        : item.status === 'Packed'
                                                                                                            ? '#28A745'
                                                                                                            : '#444'
                                                                                        }`,
                                                                                }}
                                                                            >
                                                                                {item.order_status}
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <div className="text-center">You have no orders</div>
                                                )
                                            )}


                                            <PaginationControl
                                                page={page}
                                                total={totalPage}
                                                limit={10}
                                                changePage={(page) => {
                                                    // setPage(page);
                                                    handelChange(page)
                                                }}
                                                ellipsis={1}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DeliveryManOrders