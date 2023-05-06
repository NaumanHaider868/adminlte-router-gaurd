import React, { useState, useEffect } from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'

function ShopOrder() {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState([])
    const [orders, setOrders] = useState([]);
    const [alert, setAlert] = useState()
    const param = useParams();
    const [showMessage, setShowMessage] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/shops/${param.id}/orders`)
            .then((res) => {
                console.log(res.data.data.shopOrderList.data, 'shop order')
                setOrders(res.data.data.shopOrderList.data)
                setShowMessage(false);

            })
            .catch((error) => {
                console.log(error.response.data.messages)
                setAlert(error.response.data.messages[0]);
                const alertMessage = document.querySelector('#alert-message');
                if (alertMessage) {
                    alertMessage.style.display = 'block';
                    setTimeout(() => {
                        alertMessage.style.display = 'none';
                    }, 3000);
                }
            })
    }, [page])

    const getSearch = (e) => {
        // setSearch(e.target.value)
        e.preventDefault();
        api.get(`/shops/${param.id}/orders?keyword=${search}`)
            .then((res) => {
                // console.log(res,'search')
                setOrders(res.data.data.shopOrderList.data)
            })
    }
    const viewShopOrder = (id1) => {
        navigate(`/viewshoporder/${param.id}/${id1}`)
    }

    const editShopOrder = (id1) => {
        navigate(`/editshoporder/${param.id}/${id1}`)
    }

    const handleBack = () => {
        navigate('/shops')
    }
    return (
        <>
            <Navbar />
            <SideBar />
            <div className='wrapper'>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Shop Orders</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li onClick={handleBack} className="breadcrumb-item"><a href="#">Admin Shop</a></li>
                                        <li className="breadcrumb-item active">Shop Order</li>
                                    </ol>
                                </div>

                            </div>
                        </div>


                    </section>

                    <section className="content">
                        {/* <div className="container-fluid"> */}
                        {/* <div className="row"> */}
                        {/* <div className="col-12"> */}
                        <div className="card">
                            <div className="card-body">
                                <div className="input-group">
                                    <input type="search" className="form-control form-control-lg" onChange={(e) => setSearch(e.target.value)} placeholder="Type your keywords here" />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-lg btn-success" onClick={getSearch}>
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div><br />

                                {showMessage && <div className='alert alert-danger' id='alert-message'>
                                    <div className='valid'>
                                        <p className='valid-p alert-danger'>{alert}</p>
                                    </div>
                                </div>}
                                <table className="table" style={{ marginBottom: '30px' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Sr.#</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Shop Name</th>
                                            <th scope="col">Shop Address</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Total</th>
                                            <th className='' scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    {/* <td>{((page - 1) * 10) + i + 1}</td> */}
                                                    <td>{((page - 1) * 10) + i + 1}</td>
                                                    <td>{moment(item.created_at).calendar()}</td>

                                                    <td>{item.shopname}</td>
                                                    <td>{item.shopaddress}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.location}</td>
                                                    <td><button style={{ border: 'none', borderRadius: '4px', fontSize: '10px', padding: '0px 4px', fontWeight: '700', color: '#fff', backgroundColor: `${item.status == "New" ? "#17A2B8" : item.status == "Delivered" ? "#28A745" : item.status == "InProccess" ? "#7C007C" : item.status == "Completed" ? "#FFC107" : item.status == "Packed" ? "#28A745" : "#444"}` }}>{item.status}</button></td>
                                                    <td>{item.total}</td>
                                                    <td>
                                                        <i class="fas fa-edit" onClick={() => editShopOrder(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i> <i onClick={() => viewShopOrder(item.id)} class="fas fa-eye" style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                            </div>

                        </div>

                    </section>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ShopOrder