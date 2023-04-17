import React, { useState, useEffect } from 'react'
import SideBar from '../../componets/SideBar'
import Navbar from '../../componets/Navbar'
import Footer from '../../componets/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddCategorie() {
    const [name, setName] = useState();
    const [shop_id, setShopID] = useState();
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const payload = new FormData();
        payload.append('name',name);
        payload.append('image',image);
        payload.append('shop_id',shop_id)
        e.preventDefault();
        // let payload = {
        //     name: name,
        //     shop_id:shop_id,
        //     image:image
        // }
        axios.post('https://foodapis.techenablers.info/api/admin/categories', payload, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res, 'add');
                if(res.status !== false){
                    navigate('/viewcategories');
                }
                alert(res.data.messages)
            })
            .catch((error)=>{
                // console.log(error.response.data.errors)
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
                                <h1 className='pl-1'>Add Coupon</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Add Coupon</li>
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
                                                <label>Shop ID</label>
                                                <input type="text" className="form-control" name={shop_id} onChange={(e) => setShopID(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Image</label><br/>
                                                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="card-footer" style={{ background: '#fff' }}>
                                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#343a40', borderColor: '#343a40' }} >Update</button>
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

export default AddCategorie