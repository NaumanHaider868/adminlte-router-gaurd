import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from '../../services/ApiUrl'

import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'

function AddShop() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [open_hours, setOpenHour] = useState();
    const [close_hours, setCloseHour] = useState();
    const [address, setAddress] = useState('');
    const [longitude, setLongtitude] = useState(22);
    const [latitude, setLatitude] = useState(24);

    const handleSubmit = (e) => {
        const formatData = new FormData();
        formatData.append('name', name)
        formatData.append('address', address)
        formatData.append('close_hours', close_hours)
        formatData.append('open_hours', open_hours)
        formatData.append('phone', phone)
        formatData.append('longitude', longitude)
        formatData.append('latitude', latitude)
        formatData.append('image', image)
        e.preventDefault();
        axios.post('/shops', formatData)
            .then((resp) => {
                console.log(resp, 'add shop')
                if (resp.data.data.success !== false) {
                    navigate('/shops');
                    alert(resp.data.messages)
                }
            }).catch((error) => {
                alert(error.response.data.errors)
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
                                <h1 className='pl-1'>Add Shop</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/shops' className="breadcrumb-item"><a href="#">Shop</a></Link>
                                    <li className="breadcrumb-item active">Add Shop</li>
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
                                                <label>Name</label>
                                                <input type="text" className="form-control" name={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Address</label>
                                                <input type="text" className="form-control" name={address} onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Image</label><br />
                                                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Open Hours</label>
                                                <input type="text" className='form-control' name={open_hours} onChange={(e) => setOpenHour(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input type="text" className="form-control" name={phone} onChange={(e) => setPhone(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Close Hours</label>
                                                <input type="text" className="form-control" name={close_hours} onChange={(e) => setCloseHour(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="card-footer" style={{ background: '#fff' }}>
                                            <button type="submit" className="btn btn-success" >Add Shop</button>
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

export default AddShop