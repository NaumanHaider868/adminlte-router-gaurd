import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { PaginationControl } from 'react-bootstrap-pagination-control';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Deliverymans() {
    const navigate = useNavigate();
    const [search, setSearch] = useState([])
    const [deliveryMens, setDeliveryMens] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState();
    useEffect(() => {
        api.get(`/deliverymens`)
            .then((res) => {
                console.log(res.data.data.deliveryMens.data);
                setDeliveryMens(res.data.data.deliveryMens.data);
                setTotalPage(res.data.data.deliveryMens.total)

            })
    }, [])

    const handelChange = (page) => {
        setPage(page)
        api.get(`/deliverymens?page=${page}`)
            .then((res) => {
                console.log(res.data.data.deliveryMens.data);
                setDeliveryMens(res.data.data.deliveryMens.data);

            })
    }
    const editDeliveryMen = (id) => {
        navigate('/editdeliveryman/' + id)
    }
    const deleteDeliveryMen = (id) => {
        api.delete(`/deliverymens/${id}`)
            .then((res) => {
                // alert(res.data.messages);
                toast.success(res.data.messages[0])
            })
    }

    const ViewDeliveryMen = (id) => {
        navigate('/viewdeliveryman/' + id)
    }
    const getSearch = (e) => {
        // setSearch(e.target.value)
        e.preventDefault();
        api.get(`https://foodapis.techenablers.info/api/admin/deliverymens?keyword=${search}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res, 'deliveeryman search')
                setDeliveryMens(res.data.data.deliveryMens.data)
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
                                    <h1>Admin Delivery Mans</h1>
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
                                            <Link to='/adddeliverymen'><button className='btn btn-success'>Add Delivery Man</button></Link>
                                            <br /><br />
                                            <div className="input-group">
                                                <input type="search" className="form-control form-control-lg" placeholder="Type your keywords here" onChange={(e) => setSearch(e.target.value)} />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-lg btn-success" onClick={getSearch} >
                                                        <i className="fa fa-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <table className="table" style={{ marginBottom: '30px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sr.#</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">First Name</th>
                                                        <th scope="col">Last Name</th>
                                                        <th className='' scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {deliveryMens.map((item, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{((page - 1) * 10) + i + 1}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.first_name}</td>
                                                                <td>{item.last_name}</td>
                                                                <td>
                                                                    <i class="fas fa-edit" onClick={() => editDeliveryMen(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i> <i class="fas fa-trash" onClick={() => deleteDeliveryMen(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i> <i class="fas fa-eye" onClick={() => ViewDeliveryMen(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i>
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

export default Deliverymans