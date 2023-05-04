import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgetPassword() {

  const [email, setEmail] = useState('');

  const handlePassword = (e) => {
    let payload = {
      email:email
    }
    e.preventDefault();
    axios.post('https://foodapis.techenablers.info/api/forget-password', payload)
      .then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='hold-transition login-page'>
      <div className="login-box">
        <div className="login-logo">
          <a href=""><b>Admin</b>LTE</a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>

            <form>
              <div className="input-group mb-3">
                <input type="email" className="form-control" name={email} value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button className="btn btn-primary btn-block" onClick={handlePassword}>Request new password</button>
                </div>

              </div>
            </form>

            <p className="mt-3 mb-1">
              <Link to='/'>Login</Link>
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

export default ForgetPassword