import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();

    let payload = {
        first_name: first_name,
        last_name: last_name,
        username: name,
        email: email,
        password: password,
        phone: phone
    }

    useEffect(() => {
        let login = localStorage.getItem('login');
        if (login) {
            navigate('/dashboard')
        }
    });
    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('https://foodapis.techenablers.info/api/register', payload)
            .then((resp) => {
                console.log(resp, 'sign');
                navigate('/dashboard');
                localStorage.setItem('login',true)
            })
    }
    return (
        <div className='hold-transition register-page'>
            <div className="register-box">
                <div className="register-logo">
                    <a><b>Admin</b>LTE</a>
                </div>

                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">Register a new membership</p>

                        <form>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="First-Name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Last-Name" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="User-Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Phone-Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="agreeTerms" name="terms" value="agree" />
                                        <label for="agreeTerms">
                                            I agree to the <a href="#">terms</a>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block" onClick={handleRegister}>Register</button>
                                </div>
                            </div>
                        </form>

                        <div className="social-auth-links text-center">
                            <p>- OR -</p>
                            <a href="#" className="btn btn-block btn-primary">
                                <i className="fab fa-facebook mr-2"></i>
                                Sign up using Facebook
                            </a>
                            <a href="#" className="btn btn-block btn-danger">
                                <i className="fab fa-google-plus mr-2"></i>
                                Sign up using Google+
                            </a>
                        </div>

                        <Link to='/' className="text-center">I already have a membership</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register