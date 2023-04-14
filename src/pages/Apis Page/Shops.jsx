import React, { useState, useEffect } from 'react'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


function Shops() {
    const [shops, setShops] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getShop()
    }, []);

    const getShop = () => {
        axios.get('https://foodapis.techenablers.info/api/admin/shops', {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((resp) => {
                console.log('shop data', resp);
                setShops(resp.data.data.shops.data)
            })
    }

    const editShop = (id) => {
        navigate('/editshop/' + id)
    }
    const deleteProduct = (id) => {
        console.log(id);
        axios.delete(`https://foodapis.techenablers.info/api/admin/shops/${id}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                getShop()
                console.log('delete',res)
                alert(res.data.messages)
            })
    }
    return (
        <div>
            <Navbar />
            <SideBar />

            <div className='wrapper'>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Shops</h1>
                                </div>

                            </div>
                        </div>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <Link to='/addshop'><button className='btn btn-primary'>Add Shop</button></Link>
                                        </div>
                                        <div className="card-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sr.#</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Phone</th>
                                                        <th scope="col">Address</th>
                                                        <th className='' scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {shops.map((item, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{item.id}</td>
                                                                <td>1/1/2023</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.phone}</td>
                                                                <td>{item.address}</td>
                                                                <td>
                                                                    <i class="fas fa-edit" onClick={() => editShop(item.id)} style={{ fontSize: '13px', cursor: 'pointer' }}></i> <i class="fas fa-trash" onClick={() => deleteProduct(item.id)} style={{ fontSize: '13px', cursor: 'pointer' }}></i>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
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

export default Shops
