import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { useState, useEffect } from 'react'
import api from '../../services/ApiUrl'
import { useNavigate, Link } from 'react-router-dom'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import ClipLoader from 'react-spinners/ClipLoader';

function Customers() {
    const navigate = useNavigate();
    const [search, setSearch] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [totalCustomer, setTotalCustomer] = useState([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        api.get(`/customers`)
            .then((res) => {
                console.log(res.data.data.customers.data);
                setCustomer(res.data.data.customers.data);
                setTotalPage(res.data.data.customers.total);
                setTotalCustomer(res.data.data.customers);
            }).finally(() => {
                setIsLoading(false)
            })
    }, [])
    const handelChange = (page) => {
        setIsLoading(true)
        setPage(page)
        api.get(`/customers?page=${page}`)
            .then((res) => {
                console.log(res.data.data.customers.data)
                setCustomer(res.data.data.customers.data)
            }).finally(() => {
                setIsLoading(false)

            });
    }
    const getSearch = (e) => {
        setIsLoading(true)
        e.preventDefault();
        api.get(`/customers?keyword=${search}`)
            .then((res) => {
                console.log(res.data.data.customers)
                setTotalPage(res.data.data.customers.total)
                setCustomer(res.data.data.customers.data)
                setTotalCustomer(res.data.data.customers);
            }).finally(() => {
                setIsLoading(false)
            });
    }
    const closeSearch = (e) => {
        setSearch('');
        setIsLoading(true)
        setPage(1)
        api.get(`/customers?keyword=${[]}`)
            .then((res) => {
                setTotalPage(res.data.data.customers.total)
                setCustomer(res.data.data.customers.data)
                setTotalCustomer(res.data.data.customers)
            }).finally(() => {
                setIsLoading(false)
            });
    }
    const ViewCustomer = (id) => {
        navigate('/viewcustomer/' + id)
    }

    const editCustomer = (id) => {
        navigate('/editcustomer/' + id)
    }
    const customerOrders = (id) => {
        navigate('/customerorders/' + id)
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
                                    <h1>Customers</h1>
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
                                            ) : <table className="table" style={{ marginBottom: '30px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sr.#</th>
                                                        <th scope="col">User Name</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">First Name</th>
                                                        <th scope="col">Last Name</th>
                                                        <th className='' scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {customer.map((item, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td><b>{((page - 1) * 10) + i + 1}</b></td>
                                                                <td>{item.username}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.first_name}</td>
                                                                <td>{item.last_name}</td>
                                                                <td>
                                                                    <i class="fas fa-edit" onClick={() => editCustomer(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i>&nbsp;
                                                                    <i class="fas fa-eye" onClick={() => ViewCustomer(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i>&nbsp;
                                                                    <button onClick={() => customerOrders(item.id)} className='btn btn-primary' style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd', width: '55px', height: '28px' }}><p style={{ color: '#fff', fontSize: '10px', fontWeight: '600', display: 'flex' }}>Orders</p></button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>}

                                            {totalCustomer && totalCustomer.total <= 10 ?
                                                '' :
                                                <PaginationControl
                                                    page={page}
                                                    total={totalPage}
                                                    limit={10}
                                                    changePage={(page) => {
                                                        handelChange(page)
                                                    }}
                                                    ellipsis={1}
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
            </div>
            <Footer />
        </div>
    )
}

export default Customers