import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { useState, useEffect } from 'react'
import api from '../../services/ApiUrl'
import { useNavigate, Link } from 'react-router-dom'
import { PaginationControl } from 'react-bootstrap-pagination-control';

function Customers() {
    const navigate = useNavigate();
    const [search, setSearch] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState();
    useEffect(() => {
        api.get(`/customers`)
            .then((res) => {
                console.log(res.data.data.customers.data)
                setCustomer(res.data.data.customers.data)
                setTotalPage(res.data.data.customers.total)
            })
    }, [])
    const handelChange = (page) => {
        setPage(page)
        api.get(`/customers?page=${page}`)
            .then((res) => {
                console.log(res.data.data.customers.data)
                setCustomer(res.data.data.customers.data)
            })
    }
    const getSearch = (e) => {
        // setSearch(e.target.value)
        e.preventDefault();
        api.get(`/customers?keyword=${search}`)
            .then((res) => {
                console.log(res)
                setCustomer(res.data.data.customers.data)
            })
    }
    const ViewCustomer = (id) => {
        navigate('/viewcustomer/' + id)
    }

    const editCustomer = (id) => {
        navigate('/editcustomer/' + id)
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
                                    <h1>Admin Customers</h1>
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
                                                <input type="search" className="form-control form-control-lg" placeholder="Type your keywords here" onChange={(e) => setSearch(e.target.value)} />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-lg btn-success" onClick={getSearch} >
                                                        <i className="fa fa-search"></i>
                                                    </button>
                                                </div>
                                            </div><br/>
                                            <table className="table" style={{ marginBottom: '30px' }}>
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
                                                                <td>{((page - 1) * 10) + i + 1}</td>
                                                                <td>{item.username}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.first_name}</td>
                                                                <td>{item.last_name}</td>
                                                                <td>
                                                                    <i class="fas fa-edit" onClick={() => editCustomer(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i> <i class="fas fa-eye" onClick={() => ViewCustomer(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
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

export default Customers