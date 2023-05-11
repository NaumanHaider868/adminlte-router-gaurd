import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../services/ApiUrl'

import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddShop() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [open_hours, setOpenHour] = useState();
    const [close_hours, setCloseHour] = useState();
    const [address, setAddress] = useState('');
    const [longitude, setLongtitude] = useState('');
    const [latitude, setLatitude] = useState('');


    const [owner_name,setOwnerName] = useState('');
    const [owner_first_name,setOwnerFirstName] = useState('');
    const [owner_last_name,setOwnerLastName] = useState('');
    const [owner_email,setOwnerEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirm_password,setComfirmPassword] = useState('');
    const [owner_phone,setOwnerPhone] = useState('');
    const [owner_image,setOwnerImage] = useState(null)

    const [alert, setAlert] = useState([])

    const handleSubmit = (e) => {
        const formatData = new FormData();
        formatData.append('name', name)
        formatData.append('address', address)
        formatData.append('close_hours', close_hours)
        formatData.append('open_hours', open_hours)
        formatData.append('shop_phone', phone)
        formatData.append('longitude', longitude)
        formatData.append('latitude', latitude)
        formatData.append('shop_image', image)

        // Owner FormData
        formatData.append('first_name',owner_first_name)
        formatData.append('last_name',owner_last_name)
        formatData.append('email',owner_email)
        formatData.append('password',password)
        formatData.append('password_confirmation',confirm_password)
        formatData.append('owner_phone',owner_phone)
        formatData.append('owner_image',owner_image)
        formatData.append('username',owner_name);

        e.preventDefault();
        api.post('/shops', formatData)
            .then((resp) => {
                console.log(resp, 'add shop')
                if (resp.data.data.success !== false) {
                    navigate('/shops');
                    toast.success(resp.data.messages[0])
                }
            }).catch((error) => {
                setAlert(error.response.data.errors)
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
                                <h1 className='pl-1'>Add Shop</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/shops' className="breadcrumb-item"><a href="#">Shop</a></Link>
                                    <li className="breadcrumb-item active">Add Shop</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='content'>
                    <div className='container-fluid'>
                        <div className="card">
                            {/* <h4>Shop</h4> */}
                            {/* <div class="card-header">
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <h3 class="card-title">Quick Example</h3>
                                    </div>

                                    <div className='col-md-6'>
                                        <h3 class="card-title">Quick Example</h3>
                                    </div>
                                </div>
                            </div> */}

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
                                        <div className='col-md-6'>
                                            <h2>Shop</h2>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Shop Name</label>
                                                        <input type="text" className="form-control" value={name} placeholder='Name' name={name} onChange={(e) => setName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Address</label>
                                                        <input type="text" className="form-control" value={address} placeholder='Address' name={address} onChange={(e) => setAddress(e.target.value)} />
                                                    </div>
                                                </div>

                                                
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Open Time</label>
                                                        <input type="time" className='form-control'value={open_hours} placeholder='Open Time' name={open_hours} onChange={(e) => setOpenHour(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Close Time</label>
                                                        <input type="time" className="form-control"value={close_hours} placeholder='Close Time' name={close_hours} onChange={(e) => setCloseHour(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Phone</label>
                                                        <input type="text" className="form-control"value={phone} placeholder='Phone' name={phone} onChange={(e) => setPhone(e.target.value)} />
                                                    </div>
                                                </div>
                                                
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Longitude</label>
                                                        <input type="text" className="form-control"value={longitude} placeholder='Longitude' name={longitude} onChange={(e) => setLongtitude(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Latitude</label>
                                                        <input type="text" className="form-control"value={latitude} placeholder='Latitude' name={latitude} onChange={(e) => setLatitude(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Image</label><br />
                                                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Owner */}
                                        <div className='col-md-6'>
                                            <h2>Owner</h2>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Owner Name</label>
                                                        <input type="text"  className="form-control"value={owner_name} name='owner_name' onChange={(e)=>setOwnerName(e.target.value)}  />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input type="text" className="form-control"value={owner_first_name} name='owner_first_name' onChange={(e)=>setOwnerFirstName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Last Name</label>
                                                        <input type="text" className="form-control"value={owner_last_name} name='owner_last_name' onChange={(e)=>setOwnerLastName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input type="text" className="form-control" value={owner_email} name='owner_email' onChange={(e)=>setOwnerEmail(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Password</label>
                                                        <input type="text"  className='form-control' value={password} name='password' onChange={(e)=>setPassword(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Confirm Password</label>
                                                        <input type="text" className="form-control" value={confirm_password} name='confirm_password' onChange={(e)=>setComfirmPassword(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Phone</label>
                                                        <input type="text" className="form-control" value={owner_phone} name='owner_phone' onChange={(e)=>setOwnerPhone(e.target.value)}  />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label>Image</label><br />
                                                        <input type="file" onChange={(e)=>setOwnerImage(e.target.files[0])}  />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-footer" style={{ background: '#fff' }}>
                                            <button type="submit" className="btn btn-success" >Add Shop</button>
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

export default AddShop