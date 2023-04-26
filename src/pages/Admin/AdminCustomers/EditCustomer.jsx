import React, { useState, useEffect } from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import axios from '../../services/ApiUrl'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditCustomer() {
    const navigate = useNavigate();
    const param = useParams();
    const [email, setEmail] = useState();
    const [username, setUserName] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState(null)

    useEffect(() => {
        axios.get(`/customers/${param.id}`)
            .then((res) => {
                setEmail(res.data.data.customer.email);
                setUserName(res.data.data.customer.username);
                setFirstName(res.data.data.customer.first_name);
                setLastName(res.data.data.customer.last_name)
                setPhone(res.data.data.customer.userMeta.phone)
                setPassword('000000')
                console.log(res)
            })
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('phone', phone);
        formData.append('password', password)
        axios.post(`/customers/${param.id}`, formData)
            .then((res) => {
                setEmail();
                setUserName();
                setFirstName();
                setLastName();
                alert(res.data.messages,'edit customer')
                navigate('/customer')
            }).catch((error) => {
                alert(error.response.data.errors);
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
                                <h1 className='pl-1'>Edit Customer</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/customer' className="breadcrumb-item"><a href="#">Customer</a></Link>
                                    <li className="breadcrumb-item active">Edit Customer</li>
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

                            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>User Name</label>
                                                <input type="text" className="form-control" value={username} onChange={(e) => setUserName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" value={first_name} className="form-control" onChange={(e) => setFirstName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="card-footer" style={{ background: '#fff' }}>
                                            <button type="submit" className="btn btn-success" >Update</button>
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

export default EditCustomer