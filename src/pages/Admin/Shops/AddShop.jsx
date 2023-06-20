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
    const [other_detail, setOtherDetails] = useState()

    const [owner_name, setOwnerName] = useState('');
    const [owner_first_name, setOwnerFirstName] = useState('');
    const [owner_last_name, setOwnerLastName] = useState('');
    const [owner_email, setOwnerEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setComfirmPassword] = useState('');
    const [owner_phone, setOwnerPhone] = useState('');
    const [owner_image, setOwnerImage] = useState(null)

    const [alert, setAlert] = useState([])
    const[isLoadingTwo,setIsLoadingTwo]=useState(false)

    const handleSubmit = (e) => {
        setIsLoadingTwo(true)
        const formatData = new FormData();
        formatData.append('name', name)
        formatData.append('address', address)
        formatData.append('close_hours', close_hours)
        formatData.append('open_hours', open_hours)
        formatData.append('shop_phone', phone)
        formatData.append('longitude', longitude)
        formatData.append('latitude', latitude)
        formatData.append('shop_image', image)
        formatData.append('other_details', other_detail)

        // Owner FormData
        formatData.append('first_name', owner_first_name)
        formatData.append('last_name', owner_last_name)
        formatData.append('email', owner_email)
        formatData.append('password', password)
        formatData.append('password_confirmation', confirm_password)
        formatData.append('owner_phone', owner_phone)
        formatData.append('owner_image', owner_image)
        formatData.append('username', owner_name);

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
            .finally(()=>{
                setIsLoadingTwo(false)
            })
    }
    return (
        <div className="wrapper">
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
                <section className="content">
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
                    <div className='row'>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="card">
                                <h5 className='card-header'>Shop Details</h5>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12">
                                            {/* {/ <h4 className='add_heading'>Shop Details</h4 > /} */}
                                            < form action="" method="POST" role="form">
                                                <div className="row">

                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <div className="form-group">
                                                            <label for="">Name</label>
                                                            <input type="text" className="form-control" defaultValue={name} placeholder='Name' name={name} onChange={(e) => setName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <div className="form-group">
                                                            <label for="">Address</label>
                                                            <input type="text" className="form-control" defaultValue={address} placeholder='Address' name={address} onChange={(e) => setAddress(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12">
                                                        <div className="form-group">
                                                            <label for="">Phone</label>
                                                            <input type="text" className="form-control" defaultValue={phone} placeholder='Phone' name={phone} onChange={(e) => setPhone(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">

                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <div>
                                                            <label for="">Opening Time</label>
                                                            <input type="time" className='form-control' defaultValue={open_hours} placeholder='Open Time' name={open_hours} onChange={(e) => setOpenHour(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <div className="form-group">
                                                            <label for="">Closing Time</label>
                                                            <input type="time" className="form-control" defaultValue={close_hours} placeholder='Close Time' name={close_hours} onChange={(e) => setCloseHour(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <div className="form-group">
                                                            <label for="">Latitude</label>
                                                            <input type="text" className="form-control" defaultValue={latitude} placeholder='Latitude' name={latitude} onChange={(e) => setLatitude(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <div className="form-group">
                                                            <label for="">Longitude</label>
                                                            <input type="text" className="form-control" defaultValue={longitude} placeholder='Longitude' name={longitude} onChange={(e) => setLongtitude(e.target.value)} />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label for="w3review">Other Details</label>
                                                            <textarea className='form-control' defaultValue={other_detail} onChange={(e) => setOtherDetails(e.target.value)} id="w3review" name="w3review" rows="4" cols="50"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">

                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <label>
                                                            Image
                                                        </label>
                                                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                    </div>
                                                </div>
                                                <div className="row mt-3 mb-3">
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className='card'>
                                <h5 className='card-header'>Owner Details</h5>
                                <div className='card-body'>
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12">
                                        {/* {/ <h4 className='add_heading'>Owner Details</h4 > /} */}
                                        < form action="" method="POST" role="form">
                                            <div className="row">
                                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                    <div className="form-group">
                                                        <label for="">First Name</label>
                                                        <input type="text" placeholder='First Name' className="form-control" defaultValue={owner_first_name} name='owner_first_name' onChange={(e) => setOwnerFirstName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                    <div className="form-group">
                                                        <label for="">Last Name</label>
                                                        <input type="text" placeholder='Last Name' className="form-control" defaultValue={owner_last_name} name='owner_last_name' onChange={(e) => setOwnerLastName(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12">
                                                    <div className="form-group">
                                                        <label for="">Phone</label>
                                                        <input type="text" placeholder='Phone' className="form-control" defaultValue={owner_phone} name='owner_phone' onChange={(e) => setOwnerPhone(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                    <div className="form-group">
                                                        <label for="">User Name</label>
                                                        <input type="text" placeholder='User Name' className="form-control" defaultValue={owner_name} name='owner_name' onChange={(e) => setOwnerName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                    <div className="form-group">
                                                        <label for="">Email</label>
                                                        <input type="text" placeholder='Email' className="form-control" defaultValue={owner_email} name='owner_email' onChange={(e) => setOwnerEmail(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                    <div>
                                                        <label for="">Password</label>
                                                        <input type="text" placeholder='Password' className='form-control' defaultValue={password} name='password' onChange={(e) => setPassword(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                    <div className="form-group">
                                                        <label for="">Confirm Password</label>
                                                        <input type="text" placeholder='Confirm Password' className="form-control" defaultValue={confirm_password} name='confirm_password' onChange={(e) => setComfirmPassword(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                    <label>
                                                        Image
                                                    </label>
                                                    <input type="file" onChange={(e) => setOwnerImage(e.target.files[0])} />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-success" onClick={handleSubmit} >{isLoadingTwo && <div className='spinner-border spinner-border-sm' id='stoploading'></div>}Add Shop</button>
                    </div>
                </section >
            </div >
            <Footer />
        </div >
    )
}

export default AddShop