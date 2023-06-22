import React from 'react'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import Navbar from '../../../componets/Navbar'
import api from '../../services/ApiUrl'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';

function ViewShop() {
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [open_hours, setOpenHour] = useState();
    const [close_hours, setCloseHour] = useState();
    const [address, setAddress] = useState('');
    const [longitude, setLongtitude] = useState();
    const [latitude, setLatitude] = useState();

    const param = useParams();

    useEffect(() => {
        setIsLoading(true)
        api.get(`/shops/${param.id}`)
            .then((res) => {
                console.log(res.data.data.shop, 'shop views');
                setName(res.data.data.shop.name);
                setAddress(res.data.data.shop.address);
                setCloseHour(res.data.data.shop.close_hours);
                setOpenHour(res.data.data.shop.open_hours);
                setPhone(res.data.data.shop.phone)
                setLongtitude(res.data.data.shop.longitude);
                setLatitude(res.data.data.shop.latitude)
                // setPrice(res.data.data.shop.price)
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
                                <h1 className='pl-1'>Shop Details</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/shops' className="breadcrumb-item"><a href="#">Shop</a></Link>
                                    <li className="breadcrumb-item active">Shop Details</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">


                            <div className='row'>
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
                                                            <label>Name</label>
                                                            <input type="text" className="form-control" value={name} readonly/>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <div className="form-group">
                                                            <label>Address</label>
                                                            <input type="text" className="form-control" value={address} readonly />
                                                        </div>
                                                    </div>

                                                    <div className='col-sm-6'>
                                                        <div className="form-group">
                                                            <label>Phone</label>
                                                            <input type="text" className="form-control" value={phone} readonly />
                                                        </div>
                                                    </div>

                                                    <div className='col-sm-6'>
                                                        <div className="form-group">
                                                            <label>Open Hours</label>
                                                            <input type="time" value={open_hours} className="form-control" readonly />
                                                        </div>
                                                    </div>

                                                    <div className='col-sm-6'>
                                                        <div className="form-group">
                                                            <label>Close Hours</label>
                                                            <input type="time" className="form-control" value={close_hours} readonly />
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <div className="form-group">
                                                            <label>Longitude</label>
                                                            <input type="text" className="form-control" value={longitude} readonly />
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <div className="form-group">
                                                            <label>Latitude</label>
                                                            <input type="text" className="form-control" value={latitude} readonly />
                                                        </div>
                                                    </div>
                                                    
                                                </div>

                                            </div>
                                        </form>
                                    )
                                }

                            </div>


                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default ViewShop