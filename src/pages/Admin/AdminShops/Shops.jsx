import React, { useState, useEffect } from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import axios from '../../services/ApiUrl'
import { Link, useNavigate } from 'react-router-dom'
import { PaginationControl } from 'react-bootstrap-pagination-control';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Shops() {
    //pagination
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState();

    const [shops, setShops] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getShop();
        // getSearch()
    }, [page]);

    const handelChange = (page) => {
        setPage(page)
        axios.get(`/shops?page=${page}`)
            .then((resp) => {
                console.log('shop data', resp);
                setShops(resp.data.data.shops.data)
            })
    }

    const getShop = () => {
        axios.get(`/shops?page=${page}`)
            .then((resp) => {
                console.log('shop data', resp);
                setShops(resp.data.data.shops.data)
                setTotalPage(resp.data.data.shops.total)
            })
    }

    const editShop = (id) => {
        navigate('/editshop/' + id)
    }
    const deleteProduct = (id) => {
        console.log(id);
        axios.delete(`/shops/${id}`)
            .then((res) => {
                getShop()
                console.log('delete', res)
                // alert(res.data.messages,"Deleted successfully.")
                toast.success(res.data.messages[0])
            })
    }

    const [search, setSearch] = useState();
    const getSearch = (e) => {
        // setSearch(e.target.value)
        e.preventDefault();
        axios.get(`/shops?keyword=${search}`)
            .then((res) => {
                // console.log(res,'search')
                setShops(res.data.data.shops.data);
            })
    }
    const viewProduct = (id) => {
        navigate('/viewshop/' + id)
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
                                    <h1>Admin Shops</h1>
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
                                            <Link to='/addshop'><button className='btn btn-success'>Add Shop</button></Link><br/><br/>
                                            <div className="input-group">
                                                <input type="search" className="form-control form-control-lg" placeholder="Type your keywords here" onChange={(e) => setSearch(e.target.value)} />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-lg btn-success" onClick={getSearch}>
                                                        <i className="fa fa-search"></i>
                                                    </button>
                                                </div>
                                            </div><br/>
                                            <table className="table" style={{ marginBottom: '30px' }}>
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
                                                                <td>{((page - 1) * 10) + i + 1}</td>
                                                                <td>1/1/2023</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.phone}</td>
                                                                <td>{item.address}</td>
                                                                <td>
                                                                    <i class="fas fa-edit" onClick={() => editShop(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i> <i class="fas fa-trash" onClick={() => deleteProduct(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i> <i class="fas fa-eye" onClick={() => viewProduct(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i>
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
                                {/* </div> */}
                            {/* </div> */}
                        {/* </div> */}
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Shops
