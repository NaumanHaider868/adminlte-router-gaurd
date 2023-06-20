import React, { useEffect, useState } from 'react'
import Navbar from '../../componets/Navbar'
import Sidebar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'


function AdminProfile() {
    // const [user, setUser] = useState([]);
    // const [userMeta, setUserMeta] = useState([])
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('')
    const [photo, setPhoto] = useState(null);
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [alert, setAlert] = useState([]);

    const image = localStorage.getItem('image')
    useEffect(() => {
        axios.get('https://foodapis.techenablers.info/api/user/profile', {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            const username = localStorage.getItem('username');
            setName(username);
            setEmail(res.data.data.user.email);
            setFirstName(res.data.data.user.first_name);
            setLastName(res.data.data.user.last_name)
            setPhone(res.data.data.usermeta.phone);
            setPhoto(res.data.data.usermeta.image)
            setPassword(res.data.data.usermeta.password)
            // console.log(res.data.data.usermeta.password, 'profile password')
            // setUserMeta(res.data.data.usermeta)
            console.log(res, 'profile')
        }).catch((error) => {
            console.log(error, 'profile')
        })
    }, [])
    const handleProfile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', name)
        formData.append('phone', phone)
        formData.append('first_name', first_name)
        formData.append('last_name', last_name)
        formData.append('password', password)
        formData.append('password_confirmation', confirm_password)
        formData.append('phone', phone)
        // formData.append('image', photo);
        formData.append('image', !photo ? '' : '');

        // if (!photo) {
        //     formData.append('image', photo);
        // }else {
        //     formData.append('image', '')
        // }


        axios.post('https://foodapis.techenablers.info/api/user/profile', formData, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
            }
        })
            .then((res) => {
                console.log(res.data.data.userMeta.image,'post image')
                localStorage.setItem('image',res.data.data.userMeta.image)
                toast.success('update.')
            })
            .catch((error) => {
                setAlert(error.response.data.errors)
                document.addEventListener('DOMContentLoaded', function () {
                    const alertMessage = document.querySelector('#alert-message');
                    if (alertMessage) {
                        alertMessage.style.display = 'block';
                        setTimeout(function () {
                            alertMessage.style.display = 'none';
                        }, 2000);
                    }
                });
            })
    }
    return (
        
        <div className="wrapper">
            <Navbar />
            <Sidebar />
            <div className="content-wrapper">
                <section className="content">
                    <div className="card">
                        <div className="card-header p-2">
                            <ul className="nav nav-pills">

                                <h3>Edit Profile</h3>
                            </ul>
                        </div>
                        <div className="card-body">
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
                            <div class="row mt-3">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <form action="" method="POST" role="form">
                                        <div className="row">
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label for="">Email</label>
                                                    <input type="text" className="form-control" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label for="">Phone</label>
                                                    <input type="text" className="form-control" placeholder='Enter Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label for="">First Name</label>
                                                    <input type="text" className="form-control" placeholder='First Name' value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label for="">Last Name</label>
                                                    <input type="text" className="form-control" placeholder='Last Name' value={last_name} onChange={(e) => setLastName(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label for="">Password</label>
                                                    <input type="password" className="form-control" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label for="">Confirm Password</label>
                                                    <input type="password" className="form-control" placeholder='Confirm Password' value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <label>
                                                    Profile Image
                                                </label>
                                                <input className='form-control' type="file" name="image" onChange={(e) => { setPhoto(e.target.files[0]) }} />
                                            </div>
                                        </div><br />
                                        <button type="submit" className="btn btn-success" onClick={handleProfile}>Update</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default AdminProfile