import React, { useState, useEffect } from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { Link, useNavigate, useParams } from 'react-router-dom'
import InputMask from 'react-input-mask'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import Spinner from '../../../componets/Spinner';


function EditCustomer() {
    const navigate = useNavigate();
    const param = useParams();
    const [email, setEmail] = useState();
    const [username, setUserName] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState()
    const [confirmation_password, setConfirmPassword] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTwo, setIsLoadingTwo] = useState(false)

    const [alert, setAlert] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        api.get(`/customers/${param.id}`)
            .then((res) => {
                setEmail(res.data.data.customer.email);
                setUserName(res.data.data.customer.username);
                setFirstName(res.data.data.customer.first_name);
                setLastName(res.data.data.customer.last_name)
                setPhone(res.data.data.customer.userMeta.phone)
                console.log(res)
            }).finally(() => {
                setIsLoading(false)
            })
    }, [])
    const handleSubmit = (e) => {
        setIsLoadingTwo(true)
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('phone', phone);
        formData.append('password', password)
        formData.append('password_confirmation',confirmation_password)
        api.post(`/customers/${param.id}`, formData)
            .then((res) => {
                // alert(res.data.messages,'edit customer')
                navigate('/customer')
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
    return (
        <div className='wrapper'>
            <Navbar />
            <SideBar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className='pl-1'>Edit Customer</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/customer' className="breadcrumb-item"><a href="#">Customer</a></Link>
                                    <li className="breadcrumb-item active">Edit Customer</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='content'>
                    <div className='container-fluid'>
                        <div class="card card-dark">
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
                                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>User Name</label>
                                                    <input type="text" className="form-control" placeholder='User Name' value={username} onChange={(e) => setUserName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="text" className="form-control" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>First Name</label>
                                                    <input type="text" value={first_name} placeholder='First Name' className="form-control" onChange={(e) => setFirstName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Last Name</label>
                                                    <input type="text" className="form-control" placeholder='Last Name' value={last_name} onChange={(e) => setLastName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Phone</label>
                                                    <InputMask mask='(9999) 999-9999' placeholder='Phone' type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input type="password" placeholder='Password' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Confirm Password</label>
                                                    <input type="password" placeholder='Confirm Password' className="form-control" value={confirmation_password} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="card-footer" style={{ background: '#fff' }}>
                                                <button type="submit" className="btn btn-success" >
                                                    {isLoadingTwo ? (
                                                        <Spinner />
                                                    ) : (
                                                        'Update'
                                                    )}
                                                </button>
                                            </div>

                                        </div>


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

export default EditCustomer