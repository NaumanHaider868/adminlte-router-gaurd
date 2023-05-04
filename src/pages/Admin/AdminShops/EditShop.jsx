import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../../services/ApiUrl'

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
function EditShop() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [open_hours, setOpenHour] = useState();
    const [close_hours, setCloseHour] = useState();
    const [address, setAddress] = useState('');
    const [longitude, setLongtitude] = useState();
    const [latitude, setLatitude] = useState();

    const [alert,setAlert] = useState([])

    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/shops/${param.id}`)
            .then((resp) => {
                console.log(resp)
                setName(resp.data.data.shop.name);
                setAddress(resp.data.data.shop.address);
                setCloseHour(resp.data.data.shop.close_hours);
                setOpenHour(resp.data.data.shop.open_hours);
                setPhone(resp.data.data.shop.phone)
                setLongtitude(resp.data.data.shop.longitude);
                setLatitude(resp.data.data.shop.latitude)
                setImage(resp.data.data.shop.image)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const submitEdit = (e) => {
        e.preventDefault();
        const formatData = new FormData();
        formatData.append('name', name)
        formatData.append('address', address)
        formatData.append('close_hours', close_hours)
        formatData.append('open_hours', open_hours)
        formatData.append('phone', phone)
        formatData.append('longitude', longitude)
        formatData.append('latitude', latitude)
        formatData.append('image', image)

        api.post(`/shops/${param.id}`, formatData)
            .then((res) => {
                setName('');
                setAddress('');
                setCloseHour();
                setOpenHour();
                setLatitude();
                setLongtitude();
                setPhone();
                console.log(res.data.messages[0])
                toast.success(res.data.messages[0])
                if (res.success !== false) {
                    navigate('/shops')
                }
                else {
                    alert(res.errors)
                }
            })
            .catch(res => {
                setAlert(res.response.data.errors);
                document.querySelector('#alert-message').style.display = 'block';
                const alertMessage = document.querySelector('#alert-message');
                if (alertMessage) {
                    alertMessage.style.display = 'block';
                    setTimeout(() => {
                        alertMessage.style.display = 'none';
                    }, 3000);
                }
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
                                <h1 className='pl-1'>Edit Shop</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/shops' className="breadcrumb-item"><a href="#">Admin Shop</a></Link>
                                    <li className="breadcrumb-item active">Edit Shop</li>
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

                            <form encType="multipart/form-data">
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Address</label>
                                                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Image</label><br />
                                                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Open Hours</label>
                                                <input type="text" value={open_hours} className="form-control" onChange={(e) => setOpenHour(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Close Hours</label>
                                                <input type="text" className="form-control" value={close_hours} onChange={(e) => setCloseHour(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="card-footer" style={{ background: '#fff' }}>
                                            <button type="submit" className="btn btn-success" onClick={(e) => submitEdit(e)}>Update</button>
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

export default EditShop