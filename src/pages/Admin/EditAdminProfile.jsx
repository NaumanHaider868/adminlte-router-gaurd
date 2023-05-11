import React, { useEffect, useState } from 'react'
import Navbar from '../../componets/Navbar'
import Sidebar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'


function EditAdminProfile() {
    const [user, setUser] = useState([]);
    const [userMeta, setUserMeta] = useState([])
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('')
    const [photo, setPhoto] = useState();
    useEffect(() => {
        axios.get('https://foodapis.techenablers.info/api/user/profile', {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            setUser(res.data.data.user)
            setName(res.data.data.user.username);
            setEmail(res.data.data.user.email);
            setFirstName(res.data.data.user.first_name);
            setLastName(res.data.data.user.last_name)
            setPhone(res.data.data.usermeta.phone);
            setPhoto(res.data.data.usermeta.image)
            setUserMeta(res.data.data.usermeta)
            console.log(res, 'profile')
        }).catch((error) => {
            console.log(error, 'profile')
        })
    }, [])
    const handleSubmit = () => {
        axios.post('')
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
                                <h1>Edit Profile</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Edit Profile</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">




                            <div className="col-md-12">
                                <div className="card">
                                    {/* <div className="card-header p-2">
                                        <ul className="nav nav-pills">
                                            <li className="nav-item"><a className="nav-link">Settings</a></li>
                                        </ul>
                                    </div> */}
                                    <div className="card-body">
                                        <div className="card-primary">
                                            <div className="box-profile">
                                                <div className="text-center">
                                                    <img className="profile-user-img img-fluid img-circle"
                                                        src="../../dist/img/user4-128x128.jpg"
                                                        alt="User profile picture" />
                                                </div>

                                                <h3 className="profile-username text-center">Nina Mcintire</h3>
                                                {/* <p className="text-muted text-center">Software Engineer</p> */}

                                            </div>
                                        </div>
                                        <br />
                                        <div className="tab-content">

                                            <div className="tab-pane" id="settings">
                                            <form className="form-horizontal">
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Name</label>
                                                    <div className="col-sm-10">
                                                        <input type="email" className="form-control" value={name} name='name' placeholder="Name" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Email</label>
                                                    <div className="col-sm-10">
                                                        <input type="email" className="form-control" placeholder="Email" value={email} name='email' />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">First Name</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control" placeholder="First Name" value={first_name} email='first_name' />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Last Name</label>
                                                    <div className="col-sm-10">
                                                        <input type='text' className="form-control" placeholder="Last Name" value={last_name} name='last_name' />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Phone Number</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control" placeholder="Phone" value={phone} name='phone' />
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
                                                        <button type="submit" className="btn btn-danger">Submit</button>
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

export default EditAdminProfile