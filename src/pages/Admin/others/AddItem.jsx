import React, { useEffect } from 'react'
import Navbar from './../../../componets/Navbar'
import SideBar from './../../../componets/SideBar'
import Footer from './../../../componets/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../services/ApiUrl'

import { postItem } from '../../../redux/slice/mainItemSlice'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'

function AddItem() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [cook_time, setCookTime] = useState('');
    const [serving, setServing] = useState('');
    const [shop_id, setShopID] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [item_cat_id, setItemCatID] = useState();
    const [active, setActive] = useState(0);

    const [alert, setAlert] = useState([]);

    const [variation_name, setVariationName] = useState();
    const [variation_price, setVariationPrice] = useState();

    const errors = useSelector((state) => state.items.item.errors || []);
    console.log("errors", errors)
    // setAlert(errors)
    // document.querySelector('#alert-message').style.display = 'block';
    // setTimeout(() => {
    //     document.querySelector('#alert-message').style.display = 'none';
    // }, 3000);

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = [{
            name: variation_name,
            price: variation_price
        }]



        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('cook_time', cook_time);
        formData.append('servings', serving);
        formData.append('shop_id', shop_id);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('item_cat_id', item_cat_id);
        payload.forEach((variation, index) => {
            formData.append(`variations[${index}][name]`, variation.name);
            formData.append(`variations[${index}][price]`, variation.price);
        });
        formData.append('active', active)

        dispatch(postItem(formData))
            .then((action) => {
                if (action.payload.data && action.payload.data.success === true) {
                    navigate('/item')
                    toast.success(action.payload.data.messages[0])
                }
                if (action && action.payload) {
                    const data = document.querySelector('#alert-message');
                    if (data) {
                        data.style.display = 'block';
                        setTimeout(() => {
                            data.style.display = 'none'
                        }, 3000)
                    }
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
                                <h1 className='pl-1'>Add Item</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/item' className="breadcrumb-item"><a href="#">Items</a></Link>
                                    <li className="breadcrumb-item active">Add Item</li>
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

                            <div className="alert alert-danger" id="alert-message">
                                {errors.length > 0 && (
                                    errors.map((err, index) => (
                                        <div className="valid" key={index}>
                                            <p className="valid-p alert-danger">{err}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className='row'>
                                        <h3>Items Fields</h3>
                                        <br /><br />
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" className="form-control" name={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Price</label>
                                                <input type="text" className="form-control" name={price} onChange={(e) => setPrice(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <input type="text" className="form-control" name={description} onChange={(e) => setDescription(e.target.value)} />
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
                                                <label>Cook Time</label>
                                                <input type="text" className="form-control" name={cook_time} onChange={(e) => setCookTime(e.target.value)} />
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
                                                <label>Serving</label><br />
                                                <input type="text" className='form-control' name={serving} onChange={(e) => setServing(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Item Cat ID</label><br />
                                                <input type="text" className='form-control' name={item_cat_id} onChange={(e) => setItemCatID(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='card-body'>
                                    <h3>Variaction Field</h3><br /><br />
                                    <div className='row'>
                                        {/* <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Variaction ID</label><br />
                                                <input type="text" className='form-control' name={variation_id} onChange={(e) => setVariationID(e.target.value)} />
                                            </div>
                                        </div> */}
                                        {/* <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Variaction Item ID</label><br />
                                                <input type="text" className='form-control' name={variation_item_id} onChange={(e) => setVariationItemID(e.target.value)} />
                                            </div>
                                        </div> */}
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Variaction Name</label><br />
                                                <input type="text" className='form-control' name={variation_name} onChange={(e) => setVariationName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Variaction Price</label><br />
                                                <input type="text" className='form-control' name={variation_price} onChange={(e) => setVariationPrice(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer" style={{ background: '#fff' }}>
                                    <button type="submit" className="btn btn-success">Add Item</button>
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

export default AddItem