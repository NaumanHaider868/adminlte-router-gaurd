import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';
import InputMask from 'react-input-mask'

function ViewOwner() {
    const [owner, setOwner] = useState([])
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUserName] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [status, setStatus] = useState('');
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        api.get(`/owners/${param.id}`)
            .then((res) => {
                console.log(res.data.data, 'shop');
                setPhone(res.data.data.owner.user_meta.phone)
                setFirstName(res.data.data.owner.first_name);
                setPhone(res.data.data.owner.user_meta.phone)
                setLastName(res.data.data.owner.last_name);
                setStatus(res.data.data.owner.status)
                setUserName(res.data.data.owner.username)
            }).finally(() => {
                setIsLoading(false)
            })
    }, [])
    return (
        <div className='wrapper'>
            <Navbar />
            <SideBar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Owner Details</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/owner' className="breadcrumb-item"><a href="#">Owner</a></Link>
                                    <li className="breadcrumb-item active">Edit Owner</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">

                            {isLoading ? (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                    <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                </div>
                            ) : (
                                <form>
                                    <div className="card-body">
                                        <div className='row'>

                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>User Name</label>
                                                    <input type="text" className="form-control" value={username} placeholder="User Name" readonly />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>First Name</label>
                                                    <input type="text" className="form-control" value={first_name} placeholder="First Name" readonly />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Last Name</label>
                                                    <input type="text" className="form-control" value={last_name} placeholder="Last Name" readonly />
                                                </div>
                                            </div>

                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Phone</label>
                                                    <InputMask mask='(9999) 999-9999' type="text" className="form-control" value={phone} placeholder="Phone" readonly />
                                                </div>
                                            </div>
                                            {/* <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input type="text" className="form-control" defaultValue={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Password confirmation </label>
                                                    <input type="text" className="form-control" value={confirm_password} placeholder="Password confirmation" onChange={(e) => setConfimPassword(e.target.value)} />
                                                </div>
                                            </div> */}

                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <input type='checkbox' checked={status} />&nbsp;&nbsp;
                                                    <label>Active</label><br />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </form>
                            )}



                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default ViewOwner