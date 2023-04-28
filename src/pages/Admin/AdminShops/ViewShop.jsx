import React from 'react'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import Navbar from '../../../componets/Navbar'
import axios from '../../services/ApiUrl'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ViewShop() {
    const param = useParams();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    // const [price,setPrice] = useState();
    useEffect(() => {
        axios.get(`/shops/${param.id}`)
            .then((res) => {
                console.log(res.data.data.shop, 'shop views');
                setName(res.data.data.shop.name);
                setAddress(res.data.data.shop.address);
                setPhone(res.data.data.shop.phone)
                // setPrice(res.data.data.shop.price)
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
                                <h1>Shop Details</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <Link to='/shops'>
                                <p className='btn btn-success'><i class="fa fa-arrow-left"></i>&nbsp;&nbsp;Back to Shop</p>
                            </Link>

                            <>
                                <p className='para_bold'>Order #300112</p>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='row'>
                                            <div className='col-md-6'>

                                                <label className='label_1'>Name</label>
                                                <p className='p_1'>{name}</p>
                                                <label className='label_1'>Phone</label>
                                                <p className='p_1'>{phone}</p>
                                                <label className='label_1'>Address</label>
                                                <p className='p_1'>{address}</p>

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

export default ViewShop