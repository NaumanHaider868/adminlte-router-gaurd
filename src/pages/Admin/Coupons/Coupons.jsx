import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { fetchCoupons, deleteCoupon, searchCoupon } from '../../../redux/slice/userSlice'
import { useState, useEffect } from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useNavigate, Link } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'

function Coupons() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalCoupons, setTotalCoupons] = useState()
    const dispatch = useDispatch();
    const [search, setSearch] = useState([]);
    const coupon = useSelector((state) => state.user.coupon?.data?.coupons?.data || []);
    const totalPage = useSelector((state) => state.user.coupon?.data?.coupons?.total || state.user.coupon?.data?.coupons?.total);

    const searchData = useSelector((state) => state.user.coupon)
    console.log(searchData)
    useEffect(() => {
        getCoupon()
    }, []);

    const getCoupon = () => {
        dispatch(fetchCoupons());
    }

    const handleChange = (page) => {
        setPage(page)
        dispatch(fetchCoupons(page))
    }

    const editCoupon = (id) => {
        navigate('/editcoupon/' + id)
    }

    const handleDelete = (id, page) => {
        dispatch(deleteCoupon(id))
            .then((action) => {
                getCoupon()
                toast.success(action.payload.messages[0]);
            })
            .catch((error) => {
                // Handle error if necessary
            });
    }
    const ViewCoupon = (id) => {
        navigate('/viewcoupon/' + id)
    }

    const getSearch = (e) => {
        e.preventDefault();
        dispatch(searchCoupon(search))
        // api.get(`/coupons?keyword=${search}`)
        //     .then((res) => {
        //         console.log(res, 'search coupons')
        //         // setCoupon(res.data.data.coupons.data);
        //         // setTotalPage(res.data.data.coupons.total);
        //         setTotalCoupons(res.data.data.coupons);
        //     })
    }
    const closeSearch = (e) => {
        // e.preventDefault();
        dispatch(fetchCoupons())
            .finally(() => {
                setSearch('');
            });
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
                                    <h1>Coupons</h1>
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
                                            <Link to='/addcoupon'><button className='btn btn-success'>Add Coupon</button></Link>
                                            <br /><br />
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
                                            <table className="table" style={{ marginBottom: '30px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sr.#</th>
                                                        <th scope="col">Code</th>
                                                        <th scope="col">Description</th>
                                                        <th scope="col">Discount Type</th>
                                                        <th scope="col">General</th>
                                                        <th className='' scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {coupon.map((item, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{((page - 1) * 10) + i + 1}</td>
                                                                <td>{item.code}</td>
                                                                <td>{item.description}</td>
                                                                <td>{item.discount_type}</td>
                                                                <td>{item.general}</td>
                                                                <td>
                                                                    <i class="fas fa-edit" onClick={() => editCoupon(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i> <i class="fas fa-trash" onClick={() => handleDelete(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i> <i class="fas fa-eye" onClick={() => ViewCoupon(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            {totalCoupons && totalCoupons.total <= 10 ?
                                                '' :
                                                <PaginationControl
                                                    page={page}
                                                    total={totalPage}
                                                    limit={10}
                                                    changePage={(page) => {
                                                        // setPage(page);
                                                        handleChange(page)
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

export default Coupons