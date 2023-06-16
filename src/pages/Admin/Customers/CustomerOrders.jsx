import React, { useState, useEffect } from 'react'
import api from '../../services/ApiUrl'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../../componets/Navbar';
import SideBar from '../../../componets/SideBar';
import Footer from '../../../componets/Footer';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import ClipLoader from 'react-spinners/ClipLoader';

function CustomerOrders() {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [search, setSearch] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const param = useParams();
    useEffect(() => {
        setIsLoading(true)
        api.get(`/customers/${param.id}/orders`)
            .then((res) => {
                console.log(res)
                setOrders(res.data.data.order)
            })
            .catch((error) => {
                console.log(error)
            }).finally(() => {
                setIsLoading(false)
            })
    }, [])
    const handelChange = () => {

    }
    const getSearch = (e) => {
        setIsLoading(true)
        // setSearch(e.target.value)
        e.preventDefault();
        api.get(`/customers/${param.id}/orders?keyword=${search}`)
            .then((res) => {
                setOrders(res.data.data.order)
                // setTotalPage(res.data.data.order.total)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const closeSearch = (e) => {
        setPage(1)
        setSearch('');
        setIsLoading(true)
        api.get(`/customers/${param.id}/orders?keyword=${[]}`)
            .then((res) => {
                setOrders(res.data.data.order)
            }).finally(() => {
                setIsLoading(false)
            });
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
                                    <h1>Customer Orders</h1>
                                </div>

                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <Link to='/customer' className="breadcrumb-item"><a href="#">Customer</a></Link>
                                        <li className="breadcrumb-item active">Customer Orders</li>
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
                                            )
                                                :
                                                <table className="table" style={{ marginBottom: '30px' }}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Sr.#</th>
                                                            <th scope="col">Customer Name</th>
                                                            <th scope="col">Customer Phone</th>
                                                            <th scope="col">Delivery Charges</th>
                                                            <th scope="col">Location</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Sub Total</th>
                                                            <th scope="col">Tax</th>
                                                            <th scope="col">Total</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orders.map((item, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td><b>{((page - 1) * 10) + i + 1}</b></td>
                                                                    <td>{item.customer_name}</td>
                                                                    <td>{item.customer_phone}</td>
                                                                    <td>{item.delivery_charges}</td>
                                                                    <td>{item.location}</td>
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
                                                                    <td>{item.sub_total}</td>
                                                                    <td>{item.tax}</td>
                                                                    <td>{item.total}</td>

                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            }

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

export default CustomerOrders