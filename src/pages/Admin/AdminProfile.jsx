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
    useEffect(() => {
        axios.get('https://foodapis.techenablers.info/api/user/profile', {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            // setUser(res.data.data.user)
            setName(res.data.data.user.username);
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
                toast.success('update.')
            })
            .catch((error) => {
                // console.log(error.response.data.errors,'profile post')
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
        <div className='wrapper'>
            <Navbar />
            <Sidebar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Profile</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/admin' href="#">Admin</Link></li>
                                    <li className="breadcrumb-item active">Profile</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">


                            <div className='col-md-3'>
                                <div className="card card-primary card-outline">
                                    <div className="card-body box-profile">
                                        <div className="text-center">
                                            <img className="profile-user-img img-fluid img-circle"
                                                src={photo}
                                                alt="User profile picture" />
                                        </div>

                                        <h3 className="profile-username text-center">{name}</h3>


                                        <ul className="list-group list-group-unbordered mb-3">
                                            <li className="list-group-item">
                                                <b>First Name</b> <a className="float-right">{first_name}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Last Name</b> <a className="float-right">{last_name}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Phone</b> <a className="float-right">{phone}</a>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>

                            <div className="col-md-9">
                                <div className="card">
                                    <div className="card-header p-2" style={{ background: '#f7f7f7' }}>
                                        <ul className="nav nav-pills">
                                            {/* <li className="nav-item"><a className="nav-link active" href="#timeline" data-toggle="tab">Activity</a></li> */}
                                            <li className="nav-item"><a className="nav-link active">Edit Profile</a></li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        {
                                            alert.map((err, index) => {
                                                return (
                                                    <div id="alert-message" className="valid">
                                                        <p className="valid-p alert-danger" key={index}>
                                                            {err}
                                                        </p>
                                                    </div>
                                                )
                                            })
                                        }
                                        <br />
                                        <div className="tab-content">
                                            <div>
                                                <form className="form-horizontal">
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Name</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" value={name} name='name' placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Email</label>
                                                        <div className="col-sm-10">
                                                            <input type="email" className="form-control" placeholder="Email" value={email} name='email' readonly />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">First Name</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" placeholder="First Name" value={first_name} email='first_name' onChange={(e) => setFirstName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Last Name</label>
                                                        <div className="col-sm-10">
                                                            <input type='text' className="form-control" placeholder="Last Name" value={last_name} name='last_name' onChange={(e) => setLastName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Phone Number</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" placeholder="Phone" value={phone} name='phone' onChange={(e) => setPhone(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Password</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" placeholder="Password" value={password} name='password' onChange={(e) => setPassword(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Confirm Password</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" placeholder="Confirm Password" value={confirm_password} name='confirm_password' onChange={(e) => setConfirmPassword(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Confirm Password</label>
                                                        <div className="col-sm-10">
                                                            <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="offset-sm-2 col-sm-10">
                                                            <div className="checkbox">
                                                                <label>
                                                                    <input type="checkbox" /> I agree to the <a href="#">terms and conditions</a>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="offset-sm-2 col-sm-10">
                                                            <button onClick={handleProfile} type="submit" className="btn btn-danger">Submit</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
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