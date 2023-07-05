import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';
import InputMask from 'react-input-mask'

function ViewCustomer() {
    const param = useParams();
    const [customer, setCustomer] = useState([]);
    const [email, setEmail] = useState();
    const [username, setUserName] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [phone, setPhone] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        api.get(`/customers/${param.id}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res)
                setEmail(res.data.data.customer.email);
                setUserName(res.data.data.customer.username);
                setFirstName(res.data.data.customer.first_name);
                setLastName(res.data.data.customer.last_name)
                setPhone(res.data.data.customer.userMeta.phone)
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
                                <h1>Customer Details</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/customer' className="breadcrumb-item"><a href="#">Customer</a></Link>
                                    <li className="breadcrumb-item active">Customer Details</li>
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
                                ) :
                                    (
                                        <form encType="multipart/form-data">
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <div className="form-group">
                                                        <label>User Name</label>
                                                        <input type="text" className="form-control" value={username} readonly />
                                                    </div>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input type="text" className="form-control" value={email} readonly />
                                                    </div>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input type="text" value={first_name} className="form-control" readonly />
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
                                                        <label>Phone</label>
                                                        <InputMask mask='(9999) 999-9999' type="text" className="form-control" value={phone} readonly />
                                                    </div>
                                                </div>
    
                                            </div>
    
    
                                        </div>
                                    </form>
                                        )
                                }



                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default ViewCustomer