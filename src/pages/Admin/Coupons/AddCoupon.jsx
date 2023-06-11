import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { postCoupon } from '../../../redux/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCoupon() {
    const navigate = useNavigate();
    const [code, setCode] = useState();
    const [description, setDescription] = useState();
    const [discount, setDiscount] = useState();
    const [discount_type, setDiscountType] = useState();
    const [general, setGeneral] = useState(false);
    const [expires_at, setExpires] = useState('');


    const errors = useSelector((state) => state.user.coupon || []);

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        let payload = {
            code: code,
            description: description,
            discount: discount,
            discount_type: discount_type,
            general: general,
            expires_at: expires_at
        }
        e.preventDefault();
        dispatch(postCoupon(payload))
            .then((action) => {
                console.log(action)
                if (action.payload && action.payload.success === true) {
                    navigate('/coupons');
                    toast.success(action.payload.messages[0])
                }
                if (action && action.payload) {
                    const data = document.querySelector('#alert-message');
                    if (data) {
                        data.style.display = 'block';
                        setTimeout(() => {
                            data.style.display = 'none'
                        }, 3000)
                    }
                }

            })
    }

    // for date
    const handleDateChange = (e) => {
        const inputDate = e.target.value;
        const dateParts = inputDate.split('-');
        const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
        setExpires(formattedDate);
    };

    // for general

    const handleGeneralChange = (e) => {
        const isChecked = e.target.checked;
        setGeneral(isChecked);
    };
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

                            <div className='alert alert-danger' id='alert-message'>
                                {errors.length > 0 && (
                                    errors.map((err, index) => (
                                        <div className="valid" key={index}>
                                            <p className="valid-p alert-danger">{err}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-sm-4'>
                                            <div className="form-group">
                                                <label>Code</label>
                                                <input type="text" className="form-control" name={code} onChange={(e) => setCode(e.target.value)} />
                                            </div>
                                        </div>



                                        <div className='col-sm-4'>
                                            <div className="form-group">
                                                <label>Discount</label>
                                                <input type="text" className='form-control' name={discount} onChange={(e) => setDiscount(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-4'></div>

                                        <div className='col-sm-4'>
                                            <div className="form-group ">
                                                <label>Discount Type</label>
                                                <div className='select'>
                                                    <select class="form-select" aria-label="Default select example" name={discount_type} onChange={(e) => setDiscountType(e.target.value)}>
                                                        <option selected>Select Discount Type</option>
                                                        <option value="Fixed">Fixed</option>
                                                        <option value="Percentage">Percentage</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-sm-4'>
                                            <div className="form-group">
                                                <label>Expires</label>
                                                <input type="date" className="form-control" name={expires_at} onChange={handleDateChange} />
                                            </div>
                                        </div>

                                        <div className='col-sm-4'></div>

                                        <div className='col-sm-4'>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <textarea type="text" className="form-control" name={description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className='col-sm-4'></div>
                                        <div className='col-sm-4'></div>

                                        <div className='col-sm-4'>
                                            <div className="form-group">
                                                <input type='checkbox' style={{ paddingTop: '4px' }} name={general} onChange={handleGeneralChange} />&nbsp;&nbsp;
                                                <label for="cars">Active</label><br />
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