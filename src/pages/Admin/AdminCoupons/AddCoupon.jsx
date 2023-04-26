import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function AddCoupon() {
    const navigate = useNavigate();
    const [code, setCode] = useState();
    const [description, setDescription] = useState();
    const [discount, setDiscount] = useState();
    const [discount_type, setDiscountType] = useState();
    const [general, setGeneral] = useState();
    const [expires_at, setExpires] = useState('');
    // setExpires(expires)

    const handleSubmit = (e) => {
        const formatData = new FormData();
        // formatData.append('code', code)
        // formatData.append('description', description)
        // formatData.append('discount', discount)
        // formatData.append('discount_type', discount_type)
        // formatData.append('general', general)
        // formatData.append('expires_at', expires_at)
        let payload = {
            code: code,
            description: description,
            discount: discount,
            discount_type: discount_type,
            general: general,
            expires_at: expires_at
        }
        e.preventDefault();
        axios.post('https://foodapis.techenablers.info/api/admin/coupons', payload, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
            }
        })
            .then((resp) => {
                console.log(resp, 'add shop')
                if (resp.data.data.success !== false) {
                    navigate('/coupons');
                    alert(resp.data.messages)
                }
            }).catch((error) => {
                alert(error.response.data.errors)
                console.log(error)
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
                                <h1 className='pl-1'>Add Coupon</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/coupons' className="breadcrumb-item"><a href="#">Coupon</a></Link>
                                    <li className="breadcrumb-item active">Add Coupon</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='content'>
                    <div className='container-fluid'>
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Quick Example</h3>
                            </div>

                            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Code</label>
                                                <input type="text" className="form-control" name={code} onChange={(e) => setCode(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <input type="text" className="form-control" name={description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                        </div>


                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Discount</label>
                                                <input type="text" className='form-control' name={discount} onChange={(e) => setDiscount(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label for="cars">Discount Type</label>
                                                <select className='form-control' name={discount_type} onChange={(e) => setDiscountType(e.target.value)}>
                                                    <option value="Fixed">Fixed</option>
                                                    <option value="Percantage">Percantage</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label for="cars">General</label>
                                                <select className='form-control' name={general} onChange={(e) => setGeneral(e.target.value)}>
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Expires</label>
                                                <input type="text" className="form-control" name={expires_at} onChange={(e) => setExpires(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="card-footer" style={{ background: '#fff' }}>
                                            <button type="submit" className="btn btn-success" >Add Coupon</button>
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

export default AddCoupon