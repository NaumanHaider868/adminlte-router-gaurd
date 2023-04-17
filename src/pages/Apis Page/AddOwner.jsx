import React from 'react'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'


function AddOwner() {
    const [email, setEmail] = useState();
    const [username, setUserName] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [status, setStatus] = useState();
    // const [last_login, setLastLogin] = useState();
    // const [other_details, setOtherDetails] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {
            email: email,
            username: username,
            first_name: first_name,
            last_name: last_name,
            password: password,
            phone:phone
        }
        axios.post('https://foodapis.techenablers.info/api/admin/owners', payload, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res)
                if(res.status === 200){
                    navigate('/owner')
                    alert(res.data.messages)
                }
            }).catch((error)=>{
                alert(error.response.data.errors)
                console.log(error.response.data.errors)
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
                                <h1 className='pl-1'>Edit Owner</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Edit Owner</li>
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

                            <form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="text" className="form-control" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="text" className="form-control" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>User Name</label>
                                                <input type="text" className="form-control" value={username} placeholder="User Name" onChange={(e) => setUserName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" className="form-control" value={first_name} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" value={last_name} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input type="text" className="form-control" value={phone} placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label for="cars">Status</label>
                                                <select className='form-control' name="cars" id="cars" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                    <option value="New">0</option>
                                                    <option value="InProccess">1</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    


                                    <div className="card-footer" style={{ background: '#fff' }}>
                                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}>Update</button>
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

export default AddOwner