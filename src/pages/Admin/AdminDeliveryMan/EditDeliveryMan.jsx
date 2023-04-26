import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { useState, useEffect } from 'react'
import axios from '../../services/ApiUrl'
import { useNavigate, useParams, Link } from 'react-router-dom'

function EditDeliveryMan() {
    const [email, setEmail] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [status, setStatus] = useState();
    const [last_login, setLastLogin] = useState();
    const [phone,setPhone] = useState();

    const navigate = useNavigate();
    const param = useParams();
    useEffect(() => {
        axios.get(`/deliverymens/${param.id}`)
            .then((res) => {
                console.log(res.data.data.delivery_man)
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
            status: status
        }
        axios.post(`/deliverymens/${param.id}`, payload)
            .then((res) => {
                setEmail();
                setFirstName();
                setLastLogin();
                setLastName();
                navigate('/deliveryman')
            })
            .catch((error)=>{
                console.log(error)
                alert(error.response.data.message)
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