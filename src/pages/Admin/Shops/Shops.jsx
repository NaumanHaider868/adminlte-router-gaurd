import React, { useState, useEffect } from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { Link, useNavigate } from 'react-router-dom'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import ClipLoader from 'react-spinners/ClipLoader';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Shops() {
    //pagination
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [shops, setShops] = useState([]);
    const [totalShop, setTotalShop] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        getShop();
        // getSearch()
    }, [page]);

    const handleChange = (page) => {
        setIsLoading(true)
        setPage(page)
        api.get(`/shops?page=${page}`)
            .then((resp) => {
                console.log('shop data', resp);
                setShops(resp.data.data.shops.data)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const getShop = () => {
        setIsLoading(true)
        api.get(`/shops?page=${page}`)
            .then((resp) => {
                console.log('shop data', resp);
                setShops(resp.data.data.shops.data)
                setTotalPage(resp.data.data.shops.total)
                setTotalShop(resp.data.data.shops)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const editShop = (id) => {
        navigate('/editshop/' + id)
    }
    const viewShop = (id) => {
        navigate('/viewshop/' + id)
    }
    const deleteProduct = (id) => {
        setIsLoading(true)
        api.delete(`/shops/${id}`)
            .then((res) => {
                getShop()
                console.log('delete', res)
                getShop()
                setTotalShop(res.data.data.shops)
                toast.success(res.data.messages[0])
            })
            .finally(()=>{
                setIsLoading(false)
            })
    }

    const [search, setSearch] = useState();
    const getSearch = (e) => {
        setIsLoading(true)
        e.preventDefault();
        api.get(`/shops?keyword=${search}`)
            .then((res) => {
                // console.log(res,'search')
                setTotalPage(res.data.data.shops.total)
                setShops(res.data.data.shops.data);
                setTotalShop(res.data.data.shops)
            }).finally(()=>{
                setIsLoading(false)
            })
    }

    const closeSearch = (e) => {
        setPage(1);
        setSearch('');
        setIsLoading(true);
        api.get(`/shops?keyword=${[]}`)
            .then((res) => {
                setTotalPage(res.data.data.shops.total)
                setShops(res.data.data.shops.data);
                setTotalShop(res.data.data.shops)
            }).finally(() => {
                setIsLoading(false)
            });
    }

    const shopOrder = (id) => {
        navigate('/shoporder/' + id)
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
                        {/* <div className="container-fluid"> */}
                        {/* <div className="row"> */}
                        {/* <div className="col-12"> */}
                        <div className="card">
                            <div className="card-body">
                                <Link to='/addshop'><button className='btn btn-success'>Add Shop</button></Link><br /><br />
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
                                ) :
                                    <table className="table" style={{ marginBottom: '30px' }}>
                                        <thead>
                                            <tr>
                                                <th className='text-center'>Sr.#</th>
                                                {/* <th className='text-center'>Date</th> */}
                                                <th className='text-center'>Name</th>
                                                <th className='text-center'>Phone</th>
                                                <th className='text-center'>Address</th>
                                                <th className='text-center'>Shop Orders</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {shops.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className='text-center'><b>{((page - 1) * 10) + i + 1}</b></td>
                                                        {/* <td className='text-center'>1/1/2023</td> */}
                                                        <td className='text-center'>{item.name}</td>
                                                        <td className='text-center'>{item.phone}</td>
                                                        <td className='text-center'>{item.address}</td>
                                                        <td className='text-center'>{item.orders_count}</td>
                                                        <td>
                                                            <i class="fas fa-edit" onClick={() => editShop(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i> <i class="fas fa-eye" onClick={() => viewShop(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i> <i class="fas fa-trash" onClick={() => deleteProduct(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i>  <button class="btn" onClick={() => shopOrder(item.id)} style={{ fontSize: '12px', cursor: 'pointer', background: '#3d84dd', color: '#fff' }}>shop order</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                }

                                {totalShop && totalShop.total <= 10 ?
                                    '' :
                                    <PaginationControl
                                        page={page}
                                        total={totalPage}
                                        limit={10}
                                        changePage={(page) => {
                                            handleChange(page)
                                        }}
                                        ellipsis={1}
                                    />
                                }

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
