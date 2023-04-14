import React from 'react'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import { useState, useEffect } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function EditShop() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [open_hours, setOpenHour] = useState();
    const [close_hours, setCloseHour] = useState();
    const [address, setAddress] = useState('');
    const [longitude, setLongtitude] = useState();
    const [latitude, setLatitude] = useState();

    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://foodapis.techenablers.info/api/admin/shops/${param.id}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
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
            })
    }, [])
    
    const submitEdit = (e) => {
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
        
        axios.post(`https://foodapis.techenablers.info/api/admin/shops/${param.id}`,formatData,{
            headers : {
                Authorization : `Bearer` + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
            }
        })
        .then((res)=>{
            setName('');
            setAddress('');
            setCloseHour();
            setOpenHour();
            setLatitude();
            setLongtitude();
            setPhone();
            if(res.success !== false){
                navigate('/shops')
            }
            else{
                alert(res.errors)
            }
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
                                <h1 className='pl-1'>Edit Order</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Edit Order</li>
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
                                                <label>Image</label><br/>
                                                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Open Hours</label>
                                                <input type="text" value={open_hours} className="form-control" onChange={(e) => setOpenHour(e.target.value)} />
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
                                                <label>Close Hours</label>
                                                <input type="text" className="form-control" value={close_hours} onChange={(e) => setCloseHour(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-footer" style={{ background: '#fff' }}>
                                        <button type="submit" className="btn btn-primary" onClick={(e) => submitEdit(e)} style={{ backgroundColor: '#343a40', borderColor: '#343a40' }} >Update</button>
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

export default EditShop