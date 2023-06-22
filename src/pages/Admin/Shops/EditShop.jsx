import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../../services/ApiUrl'
import ClipLoader from 'react-spinners/ClipLoader';
import Spinner from '../../../componets/Spinner';

import { toast } from 'react-toastify';
function EditShop() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [open_hours, setOpenHour] = useState();
    const [close_hours, setCloseHour] = useState();
    const [address, setAddress] = useState('');
    const [longitude, setLongtitude] = useState();
    const [latitude, setLatitude] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [alert, setAlert] = useState([])
    const [isLoadingTwo, setIsLoadingTwo] = useState(false)

    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        api.get(`/shops/${param.id}`)
            .then((resp) => {
                console.log(resp)
                setName(resp.data.data.shop.name);
                setAddress(resp.data.data.shop.address);
                setCloseHour(resp.data.data.shop.close_hours);
                setOpenHour(resp.data.data.shop.open_hours);
                setPhone(resp.data.data.shop.phone)
                setLongtitude(resp.data.data.shop.longitude);
                setLatitude(resp.data.data.shop.latitude)
                setImage(resp.data.data.shop.image)
            })
            .catch((error) => {
                console.log(error)
            }).finally(() => {
                setIsLoading(false)
            })
    }, [])

    const submitEdit = (e) => {
        setIsLoadingTwo(true)
        e.preventDefault();
        const formatData = new FormData();
        formatData.append('name', name)
        formatData.append('address', address)
        formatData.append('close_hours', close_hours)
        formatData.append('open_hours', open_hours)
        formatData.append('phone', phone)
        formatData.append('longitude', longitude)
        formatData.append('latitude', latitude)
        formatData.append('image', image)

        api.post(`/shops/${param.id}`, formatData)
            .then((res) => {
                console.log(res.data.messages[0])
                toast.success(res.data.messages[0])
                if (res.success !== false) {
                    navigate('/shops')
                }
                else {
                    alert(res.errors)
                }
            })
            .catch(res => {
                setAlert(res.response.data.errors);
                document.querySelector('#alert-message').style.display = 'block';
                const alertMessage = document.querySelector('#alert-message');
                if (alertMessage) {
                    alertMessage.style.display = 'block';
                    setTimeout(() => {
                        alertMessage.style.display = 'none';
                    }, 3000);
                }
            }).finally(() => {
                setIsLoadingTwo(false)
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
                                <h1 className='pl-1'>Edit Shop</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/shops' className="breadcrumb-item"><a href="#">Shop</a></Link>
                                    <li className="breadcrumb-item active">Edit Shop</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='content'>
                    <div className='container-fluid'>
                        <div class="card">

                            <div className='alert alert-danger' id='alert-message'>
                                {
                                    alert.map((err, index) => {
                                        return (
                                            <div className='valid'>
                                                <p className='valid-p alert-danger' key={index}>{err}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {isLoading ? (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                    <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                </div>
                            ) :
                                <form encType="multipart/form-data">
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Address</label>
                                                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Phone</label>
                                                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Open Hours</label>
                                                    <input type="time" value={open_hours} className="form-control" onChange={(e) => setOpenHour(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Close Hours</label>
                                                    <input type="time" className="form-control" value={close_hours} onChange={(e) => setCloseHour(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Longitude</label>
                                                    <input type="text" className="form-control" value={longitude} onChange={(e) => setLongtitude(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Latitude</label>
                                                    <input type="text" className="form-control" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Image</label><br />
                                                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                                                </div>
                                            </div>
                                            <div className="card-footer" style={{ background: '#fff' }}>
                                                <button type="submit" className="btn btn-success" onClick={(e) => submitEdit(e)}>
                                                    {isLoadingTwo ? (
                                                        <Spinner />
                                                    ) : (
                                                        'Update'
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* <div className="row">
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12">
                                                < form action="" method="POST" role="form">
                                                    <div className="row">

                                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                            <div className="form-group">
                                                                <label for="">Name</label>
                                                                <input type="text" className="form-control" defaultValue={name} placeholder='Name' name={name} onChange={(e) => setName(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                            <div className="form-group">
                                                                <label for="">Address</label>
                                                                <input type="text" className="form-control" defaultValue={address} placeholder='Address' name={address} onChange={(e) => setAddress(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12">
                                                            <div className="form-group">
                                                                <label for="">Phone</label>
                                                                <input type="text" className="form-control" defaultValue={phone} placeholder='Phone' name={phone} onChange={(e) => setPhone(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">

                                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                            <div>
                                                                <label for="">Opening Time</label>
                                                                <input type="time" className='form-control' defaultValue={open_hours} placeholder='Open Time' name={open_hours} onChange={(e) => setOpenHour(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                            <div className="form-group">
                                                                <label for="">Closing Time</label>
                                                                <input type="time" className="form-control" defaultValue={close_hours} placeholder='Close Time' name={close_hours} onChange={(e) => setCloseHour(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                            <div className="form-group">
                                                                <label for="">Latitude</label>
                                                                <input type="text" className="form-control" defaultValue={latitude} placeholder='Latitude' name={latitude} onChange={(e) => setLatitude(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                            <div className="form-group">
                                                                <label for="">Longitude</label>
                                                                <input type="text" className="form-control" defaultValue={longitude} placeholder='Longitude' name={longitude} onChange={(e) => setLongtitude(e.target.value)} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label for="w3review">Other Details</label>
                                                                <textarea className='form-control' id="w3review" name="w3review" rows="4" cols="50"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">

                                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                            <label>
                                                                Image
                                                            </label>
                                                            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                                                        </div>
                                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3 mb-3">
                                                    </div>
                                                </form>
                                            </div>
                                        </div> */}


                                    </div>
                                </form>
                            }


                        </div>


                    </div>
                </section>

            </div>
            <Footer />
        </div>
    )
}

export default EditShop