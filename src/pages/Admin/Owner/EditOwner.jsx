import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Spinner from '../../../componets/Spinner';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';

function EditOwner() {
    const [phone, setPhone] = useState('');
    const [username, setUserName] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfimPassword] = useState('')
    const [ownerData, setOwnerData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTwo, setIsLoadingTwo] = useState(false)


    const [alert, setAlert] = useState([]);


    const param = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoading(true)
        api.get(`/owners/${param.id}`)
            .then((res) => {
                console.log(res.data.data.owner.username);
                //setPassword(res.data.owner.password);
                setFirstName(res.data.data.owner.first_name);
                setLastName(res.data.data.owner.last_name);
                setStatus(res.data.data.owner.status)
                setUserName(res.data.data.owner.username)
                //setOwnerData(res.data.data.shop.user_meta.phone);
                setPhone(res.data.data.owner.user_meta.phone)
            }).finally(() => {
                setIsLoading(false)
            })
    }, []);


    const handleSubmit = (e) => {
        setIsLoadingTwo(true)
        e.preventDefault();
        const formData = new FormData();
        // formData.append('email', email);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('status', status);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('password_confirmation', confirm_password)
        // formData.append('phone', ownerData);
        formData.append('password', password);
        formData.append('phone', phone)
        api.post(`/owners/${param.id}`, formData)
            .then((res) => {
                console.log(res)
                if (res.success !== false) {
                    navigate('/owner')
                }
                toast.success(res.data.messages[0])
            })
            .catch(error => {
                setAlert(error.response.data.errors)
                document.querySelector('#alert-message').style.display = 'block';
                setTimeout(() => {
                    document.querySelector('#alert-message').style.display = 'none';
                }, 3000);
            }).finally(() => {
                setIsLoadingTwo(false)
            })
    }
    const handleStatusChange = (e) => {
        const isChecked = e.target.checked;
        const value = isChecked ? 1 : 0;
        setStatus(value);
    };
    return (
        <div className='wrapper'>
            <Navbar />
            <SideBar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className='pl-1'>Edit Owner</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/owner' className="breadcrumb-item"><a href="#">Owner</a></Link>
                                    <li className="breadcrumb-item active">Edit Owner</li>
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
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className='row'>

                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>User Name</label>
                                                    <input type="text" className="form-control" defaultValue={username} placeholder="User Name" onChange={(e) => setUserName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>First Name</label>
                                                    <input type="text" className="form-control" defaultValue={first_name} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Last Name</label>
                                                    <input type="text" className="form-control" defaultValue={last_name} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Phone</label>
                                                    <input type="text" className="form-control" defaultValue={phone} placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input type="text" className="form-control" defaultValue={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Password confirmation </label>
                                                    <input type="text" className="form-control" value={confirm_password} placeholder="Password confirmation" onChange={(e) => setConfimPassword(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <input type='checkbox' defaultChecked={status} name='status' onChange={handleStatusChange} />&nbsp;&nbsp;
                                                    <label>Active</label><br />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="card-footer" style={{ background: '#fff' }}>
                                        <button type="submit" className="btn btn-success">
                                            {isLoadingTwo ? (
                                                <Spinner />
                                            ) : (
                                                'Update'
                                            )}
                                        </button>
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

export default EditOwner