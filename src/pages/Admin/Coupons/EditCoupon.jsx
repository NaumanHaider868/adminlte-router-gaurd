import React, { useState, useEffect } from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../../services/ApiUrl'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editTodo, getForPost } from '../../../redux/slice/userSlice'
import { useSelector, useDispatch } from 'react-redux'

function EditCoupon() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();
    const [code, setCode] = useState();
    const [description, setDescription] = useState();
    const [discount, setDiscount] = useState();
    const [discount_type, setDiscountType] = useState();
    const [general, setGeneral] = useState();
    const [expires, setExpires] = useState();

    const [alert, setAlert] = useState([]);

    const coupon = useSelector((state) => state.user.viewCoupon);
    // console.log(coupon,'for edit')
    useEffect(() => {
        const id = param.id;
        dispatch(getForPost(id))
            .then((action) => {
                console.log(action.payload, 'i get from')
                setCode(action.payload.code);
                setDescription(action.payload.description);
                setDiscount(action.payload.discount);
                setDiscountType(action.payload.discount_type);
                setGeneral(action.payload.general)
                setExpires(action.payload.expires_at)
            })
    }, [dispatch]);
    const formData = new FormData();
    formData.append('code', code);
    formData.append('description', description);
    formData.append('discount', discount);
    formData.append('discount_type', discount_type);
    formData.append('general', general);
    formData.append('expires_at', expires);
    // const id = param.id;

    const handleSubmit = (e,formData) => {
        e.preventDefault();
        const id = param.id;
        dispatch(editTodo({id, formData}))
        // api.post(`/coupons/${id}`, formData)
        //     .then((res) => {
        //         if (res.status !== false) {
        //             navigate('/coupons')
        //         }
        //         // toast.success(res.data.messages[0])
        //     }).catch((error) => {
        //         setAlert(error.response.data.errors)
        //         document.querySelector('#alert-message').style.display = 'block';
        //         setTimeout(() => {
        //             document.querySelector('#alert-message').style.display = 'none';
        //         }, 3000);
        //     })
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
                                        <div className='col-sm-1'>
                                            <div className="form-group">
                                                <label for="inputState">General</label>
                                                <select className='form-control' id="inputState" value={general} onChange={(e) => setGeneral(e.target.value)}>
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                </select>
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