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
    const [totalDeliveryMens, setTotalDeliveryMens] = useState()
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState();
    useEffect(() => {
        api.get(`/deliverymens`)
            .then((res) => {
                console.log(res.data.data.deliveryMens);
                setDeliveryMens(res.data.data.deliveryMens.data);
                setTotalDeliveryMens(res.data.data.deliveryMens);
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
                toast.success(res.data.messages[0])
            })
    }

    const ViewDeliveryMen = (id) => {
        navigate('/viewdeliveryman/' + id)
    }
    const getSearch = (e) => {
        // setSearch(e.target.value)
        e.preventDefault();
        api.get(`/deliverymens?keyword=${search}`)
            .then((res) => {
                console.log(res, 'deliveeryman search')
                setDeliveryMens(res.data.data.deliveryMens.data)
                setTotalPage(res.data.data.deliveryMens.total)
                setTotalDeliveryMens(res.data.data.deliveryMens)
            })
    }
    const closeSearch = (e) => {
        // e.preventDefault();
        api.get(`/deliverymens?keyword=${[]}`)
            .then((res) => {
                console.log(res, 'deliveeryman search')
                setDeliveryMens(res.data.data.deliveryMens.data)
                setTotalPage(res.data.data.deliveryMens.total)
            }).finally(() => {
                setSearch('');
              });
    }
    const deliveryManOrder = (id) => {
        navigate('/deliverymanorders/' + id)
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
                                    <h1>Delivery Mans</h1>
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
                                                <input type="text" className="form-control form-control-lg" value={search} placeholder="Type your keywords here" onChange={(e) => setSearch(e.target.value)} />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-lg btn-success" onClick={getSearch} >
                                                        <i className="fa fa-search"></i>
                                                    </button>
                                                    <button type="submit" className="btn btn-lg btn-danger"onClick={closeSearch}>
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </div>
                                            </div><br/>
                                            <table className="table" style={{ marginBottom: '30px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sr.#</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">First Name</th>
                                                        <th scope="col">Last Name</th>
                                                        <th scope='col'>Orders</th>
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
                                                                <td>{item.orders_count}</td>
                                                                <td>
                                                                    <i class="fas fa-edit" onClick={() => editDeliveryMen(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i>&nbsp;
                                                                    <i class="fas fa-trash" onClick={() => deleteDeliveryMen(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i> &nbsp;
                                                                    <i class="fas fa-eye" onClick={() => ViewDeliveryMen(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i>&nbsp;
                                                                    <button onClick={() => deliveryManOrder(item.id)} className='btn btn-primary' style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd', width: '55px', height: '28px' }}><p style={{ color: '#fff', fontSize: '10px', fontWeight: '600', display: 'flex' }}>Orders</p></button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            {totalDeliveryMens && totalDeliveryMens.total <= 10 ? 
                                               '' :
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

export default Deliverymans