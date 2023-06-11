import React, { useState, useEffect } from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editCoupon, getCouponForPost } from '../../../redux/slice/userSlice'
import { useSelector, useDispatch } from 'react-redux'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditCoupon() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();
    const [code, setCode] = useState();
    const [description, setDescription] = useState();
    const [discount, setDiscount] = useState();
    const [discount_type, setDiscountType] = useState();
    const [general, setGeneral] = useState(0);
    const [expires, setExpires] = useState(null);


    const couponError = useSelector((state) => state.user.coupon || []);
    useEffect(() => {
        const id = param.id;
        dispatch(getCouponForPost(id))
            .then((action) => {
                setCode(action.payload.code);
                setDescription(action.payload.description);
                setDiscount(action.payload.discount);
                setDiscountType(action.payload.discount_type);
                setGeneral(action.payload.general)
                setExpires(action.payload.expires_at)
            })
    }, []);

    // const id = param.id;

    const handleSubmit = (e) => {
        const formData = new FormData();
        formData.append('code', code);
        formData.append('description', description);
        formData.append('discount', discount);
        formData.append('discount_type', discount_type);
        formData.append('general', general);
        formData.append('expires_at', new Date(expires).toISOString());
        e.preventDefault();
        const id = param.id;
        dispatch(editCoupon({ id, formData }))
            .then((action) => {

                if (action.payload.data && action.payload.data.success === true) {
                    navigate('/coupons')
                    toast.success(action.payload.data.messages[0])
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
    // genearl

    const handleGeneralChange = (e) => {
        const isChecked = e.target.checked;
        const value = isChecked ? 1 : 0;
        setGeneral(value);
    };

    // const handleDateChange = (e) => {
    //     const inputDate = e.target.value;
    //     const dateParts = inputDate.split('-');
    //     const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
    //     setExpires(formattedDate);
    // };
    // const handleDateChange = (date) => {
    //     if (date) {
    //         const day = String(date.getDate()).padStart(2, '0');
    //         const month = String(date.getMonth() + 1).padStart(2, '0');
    //         const year = date.getFullYear();
    //         const formattedDate = `${day}-${month}-${year}`;
    //         setExpires(formattedDate);
    //     }
    // };

    const handleDateChange = (date) => {
        if (date) {
          const formattedDate = date.toLocaleDateString('en-GB').split('/').reverse().join('-');
          setExpires(formattedDate);
        } else {
          setExpires(''); // Reset the expires state if date is cleared
        }
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
                            <div className="alert alert-danger" id="alert-message">
                                {couponError.length > 0 && (
                                    couponError.map((err, index) => (
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
                                                <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className='col-sm-4'>
                                            <div className="form-group">
                                                <label>Discount</label>
                                                <input type="text" value={discount} className="form-control" onChange={(e) => setDiscount(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-4'></div>

                                        <div className='col-sm-4'>
                                            <div className="form-group">

                                                <label>Discount Type</label>
                                                <div className='select'>
                                                    <select class="form-select" name={discount_type} onChange={(e) => setDiscountType(e.target.value)}>
                                                        <option value='' >Select an option</option>
                                                        <option value="Fixed">Fixed</option>
                                                        <option value="Percantage">Percantage</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-sm-4'>
                                            <div className="form-group">
                                                <label>Expires</label>
                                                {/* <input type="date" readonly  className="form-control" name={expires} value={expires} onChange={handleDateChange} /> */}
                                                <DatePicker
                                                    className="form-control"
                                                    name="expires"
                                                    selected={expires ? new Date(expires) : null}
                                                    onChange={handleDateChange}

                                                />
                                            </div>
                                        </div>
                                        <div className='col-sm-4'></div>

                                        <div className='col-sm-4'>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <textarea type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-4'></div>
                                        <div className='col-sm-4'></div>

                                        <div className='col-sm-4'>
                                            <div className="form-group">
                                                <input type='checkbox' checked={general} name='general' onChange={handleGeneralChange} />&nbsp;&nbsp;
                                                <label>Active</label><br />
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