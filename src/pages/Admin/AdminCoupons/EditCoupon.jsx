import React, { useState, useEffect } from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../../services/ApiUrl'

function EditCoupon() {
    const navigate = useNavigate();
    const param = useParams();
    const [code, setCode] = useState();
    const [description, setDescription] = useState();
    const [discount, setDiscount] = useState();
    const [discount_type, setDiscountType] = useState();
    const [general, setGeneral] = useState();
    const [expires, setExpires] = useState();

    useEffect(() => {
        axios.get(`/coupons/${param.id}`).then((res) => {
            console.log(res.data.data.coupon)
            setCode(res.data.data.coupon.code);
            setDescription(res.data.data.coupon.description);
            setDiscount(res.data.data.coupon.discount);
            setDiscountType(res.data.data.coupon.discount_type);
            setGeneral(res.data.data.coupon.general)
            setExpires(res.data.data.coupon.expires_at)
        })
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('code', code);
        formData.append('description', description);
        formData.append('discount', discount);
        formData.append('discount_type', discount_type);
        formData.append('general', general);
        formData.append('expires_at', expires);

        axios.post(`/coupons/${param.id}`, formData)
            .then((res) => {
                console.log(res)
                setCode();
                setDescription();
                setDiscount();
                setDiscountType();
                setGeneral();
                if (res.status !== false) {
                    navigate('/coupons')
                }
            }).catch((error) => {
                console.log(error)
                alert(error.response.data.errors)
            })
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
                                <h1 className='pl-1'>Edit Coupon</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/coupons' className="breadcrumb-item"><a href="#">Coupon</a></Link>
                                    <li className="breadcrumb-item active">Edit Coupon</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='content'>
                    <div className='container-fluid'>
                        <div class="card card-dark">
                            <div class="card-header">
                                <h3 class="card-title">Quick Example</h3>
                            </div>

                            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Code</label>
                                                <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Discount</label>
                                                <input type="text" value={discount} className="form-control" onChange={(e) => setDiscount(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Discount Type</label>
                                                <input type="text" className="form-control" value={discount_type} onChange={(e) => setDiscountType(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>General</label>
                                                <input type="text" className="form-control" value={general} onChange={(e) => setGeneral(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="card-footer" style={{ background: '#fff' }}>
                                            <button type="submit" className="btn btn-success" >Update</button>
                                        </div>
                                    </div>


                                </div>
                            </form>

                        </div>


                    </div>
                </section>

            </div>
            <Footer />
        </div>
    )
}

export default EditCoupon