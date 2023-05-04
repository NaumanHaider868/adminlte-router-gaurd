import React, { useState, useEffect } from 'react'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import api from '../services/ApiUrl'
import { useNavigate, Link } from 'react-router-dom'
// import { getAdmindashboard } from '../services/ApiUrl'
import apiService from '../services/ApiUrl'

function Admin() {
    const [items, setItems] = useState([]);
    const [shops, setShops] = useState([]);
    const [categories, setCategories] = useState([]);

    // Api Url
    

    useEffect(() => {
        // let url = 'https://foodapis.techenablers.info/api/admin/dashboard';
        // apiService.getAPI(url)
        // api('https://foodapis.techenablers.info/api/admin/dashboard').then((res) => {
        //     console.log(res.data.data)
        //     setCategories(res.data.data.categories);
        //     setShops(res.data.data.shops);
        //     setItems(res.data.data.items)
        // })
        api.get('/dashboard').then((res) => {
            console.log(res.data.data)
            setCategories(res.data.data.categories);
            setShops(res.data.data.shops);
            setItems(res.data.data.items)
        })
    }, [])

    return (
        <div className='wrapper'>
            <Navbar />
            <SideBar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Admin Dashboard</h1>
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
                                        <h3>Categories</h3>
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
                                        <Link to='/viewcategories'><button className='btn btn-md btn-success'>View All Categories</button></Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h3>Items</h3>
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
                                        <Link to='/viewitems'><button className='btn btn-md btn-success'>View All Items</button></Link>
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