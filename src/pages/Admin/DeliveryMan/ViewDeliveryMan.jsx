import React, { useState, useEffect } from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/ApiUrl'
import ClipLoader from 'react-spinners/ClipLoader';


function ViewDeliveryMan() {
    const param = useParams();
    const [email, setEmail] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [username, setUserName] = useState('')
    const [status, setStatus] = useState(false);
    const [last_login, setLastLogin] = useState();
    const [phone, setPhone] = useState();
    const [other_details, setOtherDetails] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        api.get(`/deliverymens/${param.id}`)
            .then((res) => {
                console.log(res.data, 'daa')
                // setDeliveryMen(res.data.data.deliveryMens);
                // setDeliveryMenMeta(res.data.data.delivery_man_meta.phone)

                setEmail(res.data.data.deliveryMens.email);
                setFirstName(res.data.data.deliveryMens.first_name);
                setLastName(res.data.data.deliveryMens.last_name);
                setStatus(res.data.data.deliveryMens.status);
                setUserName(res.data.data.deliveryMens.username)
                setPhone(res.data.data.delivery_man_meta.phone)
                setOtherDetails(res.data.data.deliveryMens.other_details)
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
                                <h1 className='pl-1'>View Delivery Man</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/deliveryman' className="breadcrumb-item"><a href="#">Delivery Man</a></Link>
                                    <li className="breadcrumb-item active">View Delivery Man</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">

                            
                                {isLoading ? (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                        <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                    </div>
                                ) :
                                    <form>
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input type="text" className="form-control" value={email} readonly />
                                                    </div>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input type="text" className="form-control" value={first_name} readonly />
                                                    </div>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <div className="form-group">
                                                        <label>Last Name</label>
                                                        <input type="text" className="form-control" value={last_name} readonly />
                                                    </div>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <div className="form-group">
                                                        <label>User Name</label>
                                                        <input type="text" className="form-control" value={username} readonly />
                                                    </div>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <div className="form-group">
                                                        <label>Phone</label>
                                                        <input type="phone" className="form-control" value={phone} readonly />
                                                    </div>
                                                </div>
                                                {/* <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password" className="form-control" name={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Confiram Password</label>
                                                <input type="password" className="form-control" name={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
                                            </div>
                                        </div> */}
                                                <div className='col-sm-6'></div>
                                                <div className='col-sm-6'>
                                                    <div className="form-group">
                                                        <label>Other Details</label>
                                                        <textarea className="form-control" value={other_details} readonly />
                                                    </div>
                                                </div>
                                                <div className='col-sm-4'></div>
                                                <div className='col-sm-4'>
                                                    <div className="form-group">
                                                        <input type='checkbox' checked={status} />&nbsp;&nbsp;
                                                        <label>Active</label><br />
                                                    </div>
                                                </div>


                                            </div>


                                        </div>
                                    </form>
                                }

                            


                        </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default ViewDeliveryMan