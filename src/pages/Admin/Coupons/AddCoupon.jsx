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

    const [alert, setAlert] = useState([])
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
                if (action.payload.success !== false) {
                    navigate('/coupons');
                } else {
                    console.log(action.error.message)
                }

            })
        // .catch((error) => {
        //     setAlert(error.response.data.errors)
        //     document.querySelector('#alert-message').style.display = 'block';
        //     setTimeout(() => {
        //         document.querySelector('#alert-message').style.display = 'none';
        //     }, 3000);
        // })
    }
    // const formatDate = (inputDate) => {
    //     const dateParts = inputDate.split('-');
    //     const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    //     return formattedDate;
    //   };
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
                                {
                                    alert.map((err, index) => {
                                        return (
                                            <div className='valid'>
                                                <p className='valid-p alert-danger' key={index}>{err}</p>
                                            </div>
                                        )
                                    })
                                }
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
                                            {/* <div className="form-group">
                                                <label>Discount Type</label>
                                                <select className='form-control' name={discount_type} onChange={(e) => setDiscountType(e.target.value)}>
                                                    <option value="Fixed">Fixed</option>
                                                    <option value="Percantage">Percantage</option>
                                                </select>
                                            </div> */}
                                            <div className="form-group ">
                                                <label>Discount Type</label>
                                                <div className='select'>
                                                    <select class="form-select" aria-label="Default select example" name={discount_type} onChange={(e) => setDiscountType(e.target.value)}>
                                                        <option selected>Select Discount Type</option>
                                                        <option value="Fixed">Fixed</option>
                                                        <option value="Percantage">Percantage</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label for="cars">General</label><br />
                                                {/* <select className='form-control' name={general} onChange={(e) => setGeneral(e.target.value)}>
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                </select> */}
                                                <input type='checkbox' name={general} onChange={handleGeneralChange} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Expires</label>
                                                <input type="date" className="form-control" name={expires_at} onChange={handleDateChange} />
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