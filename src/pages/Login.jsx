import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // const history = useHistory();

    // useEffect(() => {
    //     let login = localStorage.getItem('login');
    //     if (login) {
    //         navigate('/admin')
    //     }
    // });

    // toast.configure();
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
                localStorage.setItem('login',true)
                navigate('/admin')
                // if (res.data.data.token !== null) {
                    // localStorage.setItem('token', res.data.data.token);
                    // navigate('/dashboard')
                    // history.push('/dashboard');
                // }
            }).catch((error) => {
                console.log(error)
                if (error.response.status === 401 || error.response.status === 400) {
                    alert(error.response.data.errors);
                }
            });

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
                                <button className="btn btn-primary btn-block" onClick={submit}>
                                    Login
                                </button>
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