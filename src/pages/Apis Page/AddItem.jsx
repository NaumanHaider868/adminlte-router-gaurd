import React from 'react'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function AddItem() {
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
    // const [variation,setVariation] = useState([payload]);

    // const [variation_id, setVariationID] = useState();
    // const [variation_item_id, setVariationItemID] = useState();
    const [variation_name, setVariationName] = useState();
    const [variation_price, setVariationPrice] = useState();
    const handleSubmit = (e) => {
        let payload = [{
            // id: variation_id,
            // item_id: variation_item_id,
            name: variation_name,
            price: variation_price
        }]


        e.preventDefault();
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
        // formData.append('variations', JSON.stringify(payload));
        formData.append('active', active)
        axios.post('https://foodapis.techenablers.info/api/admin/items', formData, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data"
            }
        })
            .then((res) => {
                console.log(res.data);
                if(res.data.success === true){
                    navigate('/viewitems')
                }
                alert(res.data.messages)
            })
            .catch((error) => {
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
                                <h1 className='pl-1'>Add Item</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
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
                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#343a40', borderColor: '#343a40' }} >Add Item</button>
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