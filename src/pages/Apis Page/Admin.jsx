import React, { useState, useEffect } from 'react'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Admin() {
    const [items, setItems] = useState([]);
    const [shops, setShops] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        axios.get(`https://foodapis.techenablers.info/api/admin/dashboard`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data.data)
                setCategories(res.data.data.categories);
                setShops(res.data.data.shops);
                setItems(res.data.data.items)
            })
    }, [])

    const getSearch = () => {

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
                                <h1>Admin</h1>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h1>Categories</h1>
                                    </div>
                                    <div className="card-body">
                                        <table className="table" style={{ marginBottom: '30px' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sr.#</th>
                                                    <th scope="col">Name</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categories.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index}</td>
                                                            <td>{item.name}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        <Link to='/viewcategories'><button className='btn btn-sm btn-primary'>View All Categories</button></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h1>Shops</h1>
                                    </div>
                                    <div className="card-body">
                                        <table className="table" style={{ marginBottom: '30px' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sr.#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope='col'>Address</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {shops.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.address}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h1>Items</h1>
                                    </div>
                                    <div className="card-body">
                                        <table className="table" style={{ marginBottom: '30px' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sr.#</th>
                                                    <th scope="col">Price</th>
                                                    <th scope='col'>Description</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.description}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        <Link to='/viewitems'><button className='btn btn-sm btn-primary'>View All Items</button></Link>
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

export default Admin