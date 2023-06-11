import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState([]);
    const navigate = useNavigate();
    // const history = useHistory();

    // useEffect(() => {
    //     let login = localStorage.getItem('token');
    //     if (login) {
    //         navigate('/admin')
    //     }
    // });

    // toast.configure();
    useEffect(() => {
        setLoading(false)
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, [])
    const submit = () => {
        const payload = {
            email: email,
            password: password
        }
        console.log(payload);
        axios.post('https://foodapis.techenablers.info/api/login', payload)
            .then((res) => {
                console.log(res);

                toast.success(res.data.messages[0])
                localStorage.setItem('token', res.data.data.token);
                // localStorage.setItem('login', true)
                navigate('/admin')

                // if (res.data.data.token !== null) {
                // localStorage.setItem('token', res.data.data.token);
                // navigate('/admin')
                // // navigate('/dashboard')
                // // history.push('/dashboard');
                // }
            })
            .catch((error)=>{
                const alertMessage = document.querySelector('#alert-message');
                setAlert(error.response.data.errors);
                if(alertMessage){
                    alertMessage.style.display = 'block';

                    setTimeout(() => {
                        alertMessage.style.display = 'none';
                      }, 2000);

                }
         })
            // .catch((error) => {
            //     console.log(error)
            //     // if (error.response.status === 401 || error.response.status === 400) {
            //         setAlert(error.response.data.errors);
            //         const alertMessage = document.querySelector('#alert-message');
            //         if (alertMessage) {
            //             alertMessage.style.display = 'block';
            //             setTimeout(() => {
            //                 alertMessage.style.display = 'none';
            //             }, 2000);
            //         }
            //     // }
            // });

    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className='hold-transition login-page'>
            <div className="login-box">

                <div className="login-logo">
                    <a><b>Admin</b>LTE</a>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        {
                            alert.map((err, index) => {
                                return (
                                    <div className='valid'>
                                        <p className='valid-p alert-danger' key={index}>{err}</p>
                                    </div>
                                )
                            })
                        }

                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" name='email' value={email} onChange={handleEmail} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" name='password' value={password} onChange={handlePassword} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember" />
                                    <label for="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                            <div className="col-4">
                                {loading ?
                                    <button className="btn btn-primary btn-block" onClick={submit}>
                                        <ClipLoader
                                            loading={loading}
                                            size={150}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        /> Login
                                    </button> :
                                    <button className="btn btn-primary btn-block" onClick={submit}>
                                        Login
                                    </button>
                                }
                                
                            </div>
                        </div>

                        <div className="social-auth-links text-center mb-3">

                        </div>

                        <p className="mb-1">
                            <Link to='/forgetpassword'>I forgot my password</Link>
                        </p>
                        <p className="mb-0">
                            <Link to='/register' className="text-center">Register a new membership</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login