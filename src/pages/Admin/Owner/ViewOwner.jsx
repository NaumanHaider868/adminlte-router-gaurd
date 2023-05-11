import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

function ViewOwner() {
    const [owner, setOwner] = useState([])
    const [phone, setPhone] = useState('');
    // console.log(phone)
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/owners/${param.id}`)
            .then((res) => {
                console.log(res.data.data);
                setOwner(res.data.data.shop)
                setPhone(res.data.data.shop.user_meta.phone)
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
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <Link to='/owner'>
                                <p className='btn btn-success'><i class="fa fa-arrow-left left_a"></i>&nbsp;&nbsp;Back to Owner</p>
                            </Link>

                            <>
                                <p className='para_bold'>Order #300112</p>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='row'>
                                            <div className='col-md-6'>

                                                <label className='label_1'>User Name</label>
                                                <p className='p_1'>{owner.username}</p>
                                                <label className='label_1'>Phone</label>
                                                <p className='p_1'>{phone}</p>


                                            </div>
                                            <div className='col-md-6'>
                                                <label className='label_1'>First Name</label>
                                                <p className='p_1'>{owner.first_name}</p>
                                                <label className='label_1'>Last Name</label>
                                                <p className='p_1'>{owner.last_name}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>


                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default ViewOwner