import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { useState, useEffect } from 'react'
import axios from '../../services/ApiUrl'
import { Link, useNavigate } from 'react-router-dom'

function AddDeliveryMen() {
    const [email, setEmail] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [status, setStatus] = useState();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {
            email: email,
            phone: phone,
            first_name: first_name,
            last_name: last_name,
            password: password,
            username: username,
            status: status
        }
        axios.post('/deliverymens', payload)
            .then((res) => {
                console.log(res, 'add deliveryman')
                navigate('/deliveryman')
            })
            .catch((error) => {
                console.log(error)
                alert(error.response.data.errors)
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
                                <h1 className='pl-1'>Add Delivery Man</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/deliveryman' className="breadcrumb-item"><a href="#">Delivery Man</a></Link>
                                    <li className="breadcrumb-item active">Add Delivery Man</li>
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

                            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="text" className="form-control" name={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" className="form-control" name={first_name} onChange={(e) => setFirstName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" name={last_name} onChange={(e) => setLastName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>User Name</label>
                                                <input type="text" className="form-control" name={username} onChange={(e) => setUserName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input type="text" className="form-control" name={phone} onChange={(e) => setPhone(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label for="cars">Status</label>
                                                <select className='form-control' name="cars" id="cars" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="text" className="form-control" name={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="card-footer" style={{ background: '#fff' }}>
                                            <button type="submit" className="btn btn-success">Add Delivery Man</button>
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

export default AddDeliveryMen