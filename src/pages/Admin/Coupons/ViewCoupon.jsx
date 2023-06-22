import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { useState, useEffect } from 'react'
import api from '../../services/ApiUrl'
import { viewCoupon } from '../../../redux/slice/userSlice'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader';

function ViewCoupon() {
    const [code, setCode] = useState();
    const [description, setDescription] = useState();
    const [discount, setDiscount] = useState();
    const [discount_type, setDiscountType] = useState();
    const [general, setGeneral] = useState(false);
    const [expires_at, setExpires] = useState();
    const dispatch = useDispatch();
    const param = useParams();
    // const coupon = useSelector((state) => state.user.coupon);
    // console.log(coupon,'viewcoupon')
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        const id = param.id;
        dispatch(viewCoupon(id))
            .then((action) => {
                console.log(action.payload)
                setCode(action.payload.code)
                setDescription(action.payload.description)
                setDiscount(action.payload.discount);
                setGeneral(action.payload.general);
                setExpires(action.payload.expires_at);
                setDiscountType(action.payload.discount_type)
            }).finally(() => {
                setIsLoading(false)
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
                                <h1>Coupon Details</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">

                            {isLoading ? (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                    <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                </div>
                            ) :
                                (
                                    <form>
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col-sm-4'>
                                                    <div className="form-group">
                                                        <label>Code</label>
                                                        <input type="text" className="form-control" value={code} readonly />
                                                    </div>
                                                </div>



                                                <div className='col-sm-4'>
                                                    <div className="form-group">
                                                        <label>Discount</label>
                                                        <input type="text" className='form-control' value={discount} readonly />
                                                    </div>
                                                </div>
                                                <div className='col-sm-4'></div>

                                                <div className='col-sm-4'>
                                                    <div className="form-group ">
                                                        <label>Discount Type</label>
                                                        <input type='text' className='form-control' value={discount_type} readonly />
                                                    </div>
                                                </div>

                                                <div className='col-sm-4'>
                                                    <div className="form-group">
                                                        <label>Expires</label>
                                                        <input type="date" className="form-control" value={expires_at} readonly />

                                                    </div>
                                                </div>

                                                <div className='col-sm-4'></div>

                                                <div className='col-sm-4'>
                                                    <div className="form-group">
                                                        <label>Description</label>
                                                        <textarea type="text" className="form-control" value={description} readonly />
                                                    </div>
                                                </div>

                                                <div className='col-sm-4'></div>
                                                <div className='col-sm-4'></div>

                                                <div className='col-sm-4'>
                                                    <div className="form-group">
                                                        <input type='checkbox' style={{ paddingTop: '4px' }} checked={general} readonly />&nbsp;&nbsp;
                                                        <label for="cars">Active</label><br />
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </form>
                                )
                            }


                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default ViewCoupon