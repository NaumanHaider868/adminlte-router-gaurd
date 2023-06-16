import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { fetchCoupons, deleteCoupon, searchCoupon, handleCloseSearch } from '../../../redux/slice/userSlice'
import { useState, useEffect } from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useNavigate, Link } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader';

function Coupons() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [coupon, setCoupon] = useState([])
    const [totalCoupons, setTotalCoupons] = useState();
    const [totalPage, setTotalPage] = useState()
    const dispatch = useDispatch();
    const [search, setSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        getCoupon()
    }, []);

    const getCoupon = () => {
        setIsLoading(true)
        dispatch(fetchCoupons())
            .then((action) => {
                setCoupon(action.payload.data.coupons.data)
                setTotalPage(action.payload.data.coupons.total)
                setTotalCoupons(action.payload.data.coupons)
            }).finally(() => {
                setIsLoading(false)
            })
    }


    const handleChange = (page) => {
        setIsLoading(true)
        setPage(page)
        dispatch(fetchCoupons(page))
            .then((action) => {
                // console.log(action,'page change')
                setCoupon(action.payload.data.coupons.data)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const editCoupon = (id) => {
        navigate('/editcoupon/' + id)
    }

    const handleDelete = (id) => {
        dispatch(deleteCoupon(id))
            .then((action) => {
                getCoupon()
                toast.success(action.payload.messages[0]);
            })
    }
    const ViewCoupon = (id) => {
        navigate('/viewcoupon/' + id)
    }

    const getSearch = (e) => {
        setIsLoading(true)
        e.preventDefault();
        dispatch(searchCoupon(search))
            .then((action) => {
                setCoupon(action.payload.data.data.coupons.data)
                setTotalCoupons(action.payload.data.data.coupons)
                setTotalPage(action.payload.data.data.coupons.total)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    const closeSearch = (e) => {
        setSearch('');
        setIsLoading(true)
        dispatch(handleCloseSearch())
            .then((action) => {
                setCoupon(action.payload.data.data.coupons.data)
                setPage(1)
                setTotalCoupons(action.payload.data.data.coupons)
                setTotalPage(action.payload.data.data.coupons.total)
            })
            .finally(() => {
                setIsLoading(false)
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

                                            {isLoading ? (
                                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                                    <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                                </div>
                                            ) :
                                                <table className="table" style={{ marginBottom: '30px' }}>
                                                    <thead>
                                                        <tr>
                                                            <th>Sr.#</th>
                                                            <th>Code</th>
                                                            {/* <th>Description</th> */}
                                                            <th>Discount</th>
                                                            <th>Discount Type</th>
                                                            <th>Expire Date</th>
                                                            <th>General</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {coupon.map((item, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td><b>{((page - 1) * 10) + i + 1}</b></td>
                                                                    <td>{item.code}</td>
                                                                    <td>{item.discount}%</td>
                                                                    {/* <td>{item.description}</td> */}
                                                                    {/* <td><p style={{width:'45px',padding:'1px 2px 1px 1px',borderRadius:'6px',color:'#fff',fontSize:'14px',backgroundColor: item.discount_type === 'Fixed' ? '#46cbe1' : '#38b529'}}>{item.discount_type}</p></td> */}
                                                                    <td>
                                                                        {item.discount_type === "Fixed" && (
                                                                            <span className="badge badge-warning">
                                                                                {item.discount_type}
                                                                            </span>
                                                                        )}
                                                                        {item.discount_type === "Percentage" && (
                                                                            <span className="badge badge-success">
                                                                                {item.discount_type}
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                    <td>{new Date(item.expires_at).toLocaleDateString('en-GB', {
                                                                        day: '2-digit',
                                                                        month: '2-digit',
                                                                        year: '2-digit'
                                                                    }).split('/').join('-')}</td>
                                                                    <td>
                                                                        {item.general === 1 && (
                                                                            <span className="badge badge-success">
                                                                                Yes
                                                                            </span>
                                                                        )}
                                                                        {item.general === 0 && (
                                                                            <span className="badge badge-warning">
                                                                                No
                                                                            </span>
                                                                        )}
                                                                    </td>

                                                                    <td>
                                                                        <i class="fas fa-edit" onClick={() => editCoupon(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i> <i class="fas fa-trash" onClick={() => handleDelete(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i> <i class="fas fa-eye" onClick={() => ViewCoupon(item.id)} style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            }

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