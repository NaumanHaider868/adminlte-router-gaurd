import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { useState, useEffect } from 'react'
import api from '../../services/ApiUrl'
import { useNavigate, useParams, Link } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditDeliveryMan() {
    const [email, setEmail] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [status, setStatus] = useState();
    const [last_login, setLastLogin] = useState();
    const [phone, setPhone] = useState();
    const [password,setPassword] = useState('');
    const [confirm_password,setConfirmPassword] = useState('');

    const [alert, setAlert] = useState([]);

    const navigate = useNavigate();
    const param = useParams();
    useEffect(() => {
        api.get(`/deliverymens/${param.id}`)
            .then((res) => {
                console.log(res.data.data)
                setEmail(res.data.data.delivery_man.email);
                setFirstName(res.data.data.delivery_man.first_name);
                setLastName(res.data.data.delivery_man.last_name);
                setStatus(res.data.data.delivery_man.status);
                setPhone(res.data.data.delivery_man_meta.phone)
            })
    }, []);
    const submitEdit = (e) => {
        e.preventDefault();
        let payload = {
            last_login: last_login,
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            status: status,
            password:password,
            password_confirmation: confirm_password
        }
        api.post(`/deliverymens/${param.id}`, payload)
            .then((res) => {
                navigate('/deliveryman')
                toast.success(res.data.messages[0])
            })
            .catch(error => {
                setAlert(error.response.data.errors)
                document.querySelector('#alert-message').style.display = 'block';
                setTimeout(() => {
                    document.querySelector('#alert-message').style.display = 'none';
                }, 3000);
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
                                <h1 className='pl-1'>Edit Delivery Man</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/deliveryman' className="breadcrumb-item"><a href="#">Delivery Man</a></Link>
                                    <li className="breadcrumb-item active">Edit Delivery Man</li>
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

                            <form>
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
                                                <label>Password</label>
                                                <input type="text" className="form-control" value={password} name={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Confirm Password</label>
                                                <input type="text" className="form-control" value={confirm_password} name={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input type="text" className="form-control" value={phone} name={phone} onChange={(e) => setPhone(e.target.value)} />
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

export default EditDeliveryMan