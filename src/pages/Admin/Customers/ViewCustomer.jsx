import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';


function ViewCustomer() {
    const param = useParams();
    const [customer, setCustomer] = useState([]);
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
                setCustomer(res.data.data.customer)
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
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <Link to='/customer'>
                                <p className='btn btn-success'><i class="fa fa-arrow-left left_a"></i>&nbsp;&nbsp;Back to Customers</p>
                            </Link>

                            <>
                                <p className='para_bold'>Order #300112</p>
                                {isLoading ? (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                        <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                    </div>
                                ) :
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='row'>
                                                <div className='col-md-6'>

                                                    <label className='label_1'>Customer Name</label>
                                                    <p className='p_1'>{customer.username}</p>
                                                    <label className='label_1'>First Name</label>
                                                    <p className='p_1'>{customer.first_name}</p>
                                                    <label className='label_1'>Last Name</label>
                                                    <p className='p_1'>{customer.last_name}</p>
                                                    <label className='label_1'>Phone</label>
                                                    {/* <p className='p_1'>{customer.userMeta.phone}</p> */}

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                }

                            </>


                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default ViewCustomer