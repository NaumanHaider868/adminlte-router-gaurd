import React, { useState, useEffect } from 'react'
import Spinner from '../componets/Spinner';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const [isLoading, setIsLoading] = useState(false);
    const [username, setUserName] = useState();
    const [image, setImage] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState([]);
    const navigate = useNavigate();


    // const submit = () => {
    //     setIsLoading(true);
    //     const payload = {
    //         email: email,
    //         password: password
    //     }
    //     console.log(payload);
    //     axios.post('https://foodapis.techenablers.info/api/login', payload)
    //         .then((res) => {
    //             console.log(res);
    //             toast.success(res.data.messages[0])
    //             localStorage.setItem('token', res.data.data.token);
    //             navigate('/orders')

    //         })
    //         .catch((error) => {
    //             const alertMessage = document.querySelector('#alert-message');
    //             setAlert(error.response.data.errors);
    //             if (alertMessage) {
    //                 alertMessage.style.display = 'block';

    //                 setTimeout(() => {
    //                     alertMessage.style.display = 'none';
    //                 }, 2000);

    //             }
    //         }).finally(() => {
    //             setIsLoading(false);
    //         });


    // }

    const submit = () => {
        setIsLoading(true);
        const payload = {
            email: email,
            password: password
        }
        console.log(payload);
        axios.post('https://foodapis.techenablers.info/api/login', payload)
            .then((res) => {
                console.log(res);
                toast.success(res.data.messages[0]);

                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('login', true);

                axios.get('https://foodapis.techenablers.info/api/user/profile', {
                        headers: {
                            Authorization: `Bearer ${res.data.data.token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((res) => {
                        console.log('API response:', res.data);
                        const { username } = res.data.data.user;
                        const image = res.data.data.usermeta.image;
                        console.log(image, 'user')
                        localStorage.setItem('username', username);
                        localStorage.setItem('image', image);
                        setUserName(username);
                        setImage(image);
                    })
                    .catch((error) => {
                        console.log('API call error:', error);
                    });

                navigate('/orders');
            })
            .catch((error) => {
                const alertMessage = document.querySelector('#alert-message');
                setAlert(error.response.data.errors);
                if (alertMessage) {
                    alertMessage.style.display = 'block';

                    setTimeout(() => {
                        alertMessage.style.display = 'none';
                    }, 2000);
                }
            })
            .finally(() => {
                setIsLoading(false);
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
                                <button className="btn btn-primary btn-block" onClick={submit} disabled={isLoading}>
                                    {isLoading ? (
                                        <Spinner />
                                    ) : (
                                        'Login'
                                    )}
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