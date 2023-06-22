import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { useState, useEffect } from 'react'
import api from '../../services/ApiUrl'
import { useNavigate, useParams, Link } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { Spinner } from 'react-bootstrap'
function EditDeliveryMan() {
    const [email, setEmail] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [username,setUserName]=useState('')
    const [status, setStatus] = useState(false);
    const [last_login, setLastLogin] = useState();
    const [phone, setPhone] = useState();
    const [other_details,setOtherDetails]=useState('')
    // const [password,setPassword] = useState('');
    // const [confirm_password,setConfirmPassword] = useState('');

    const [alert, setAlert] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTwo, setIsLoadingTwo] = useState(false);

    const navigate = useNavigate();
    const param = useParams();

    useEffect(() => {
        setIsLoading(true)
        api.get(`/deliverymens/${param.id}`)
            .then((res) => {
                console.log(res.data.data)
                setEmail(res.data.data.deliveryMens.email);
                setFirstName(res.data.data.deliveryMens.first_name);
                setLastName(res.data.data.deliveryMens.last_name);
                setStatus(res.data.data.deliveryMens.status);
                setUserName(res.data.data.deliveryMens.username)
                setPhone(res.data.data.delivery_man_meta.phone)
                setOtherDetails(res.data.data.deliveryMens.other_details)
            }).finally(() => {
                setIsLoading(false)
            })
    }, []);
    const submitEdit = (e) => {
        setIsLoadingTwo(true)
        e.preventDefault();
        let payload = {
            last_login: last_login,
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            status: status,
            other_details:other_details
            // password:password,
            // password_confirmation: confirm_password
        }
        api.post(`/deliverymens/${param.id}`, payload)
            .then((res) => {
                navigate('/deliveryman')
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
                                <h1 className='pl-1'>Edit Delivery Man</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to='/deliveryman' className="breadcrumb-item"><a href="#">Delivery Man</a></Link>
                                    <li className="breadcrumb-item active">Edit Delivery Man</li>
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
                                <form onSubmit={submitEdit}>
                                    <div className="card-body">
                                    <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="text" className="form-control" name={email} value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>First Name</label>
                                                    <input type="text" className="form-control" name={first_name} value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Last Name</label>
                                                    <input type="text" className="form-control" name={last_name} value={last_name} onChange={(e) => setLastName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>User Name</label>
                                                    <input type="text" className="form-control" name={username} value={username} onChange={(e) => setUserName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Phone</label>
                                                    <input type="phone" className="form-control" name={phone} value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                </div>
                                            </div>
                                            {/* <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input type="password" className="form-control" name={password} onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Confiram Password</label>
                                                    <input type="password" className="form-control" name={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                </div>
                                            </div> */}
                                            <div className='col-sm-6'></div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Other Details</label>
                                                    <textarea className="form-control" name={other_details} value={other_details} onChange={(e) => setOtherDetails(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-4'></div>
                                            <div className='col-sm-4'>
                                                <div className="form-group">
                                                    <input type='checkbox' defaultChecked={status} name='status' onChange={handleStatusChange} />&nbsp;&nbsp;
                                                    <label>Active</label><br />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'></div>
                                            <div className="card-footer" style={{ background: '#fff' }}>
                                                <button type="submit" className="btn btn-success" onClick={(e) => submitEdit(e)}>
                                                    {isLoadingTwo ? (
                                                        <Spinner />
                                                    ) :
                                                        'Update'
                                                    }
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

export default EditDeliveryMan