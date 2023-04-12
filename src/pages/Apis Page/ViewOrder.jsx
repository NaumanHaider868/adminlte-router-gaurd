import React from 'react'
import SideBar from '../../componets/SideBar'
import Navbar from '../../componets/Navbar'
import Footer from '../../componets/Footer'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
function ViewOrder() {

  const navigate = useNavigate();
  const param = useParams();
  const [data, setData] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  console.log(data, 'data')

  useEffect(() => {
    axios.get(`https://foodapis.techenablers.info/api/admin/orders/${param.id}`, {
      headers: {
        Authorization: `Bearer` + localStorage.getItem('token')
      }
    }).then((res) => {
      console.log(res.data.data.order, 'order');
      console.log(res.data.data.orderItems, 'orderItems')
      setData(res.data.data.order)
      setOrderItems(res.data.data.orderItems)
    })
  }, [])
  return (
    <div className='wrapper'>
      <Navbar />
      <SideBar />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Order Details</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="card">
            <div className="card-body">
              {/* <Link to='/orders'>
                <p className='btn btn-primary btn_search_1'><i class="fa fa-arrow-left left_a"></i>&nbsp;&nbsp;Back to Orders</p>
              </Link> */}

              <>
                <p className='para_bold'>Order #300112</p>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='row'>
                      <div className='col-md-6'>

                        <label className='label_1'>Customer Name</label>
                        <p className='p_1'>{data.customer_name}</p>
                        <label className='label_1'>Customer Phone</label>
                        <p className='p_1'>{data.customer_phone}</p>
                        <label className='label_1'>Delivery Address</label>
                        <p className='p_1'><a href='#'>{data.location}</a></p>

                      </div>
                      <div className='col-md-6'>
                        <label className='label_1'>Delivery Man Name</label>
                        <p className='p_1'>{data.delivery_man_name}</p>
                        <label className='label_1'>Delivery Man Phone</label>
                        <p className='p_1'>{data.customer_phone}</p>
                      </div>
                    </div>
                    <p className='para_bold'>Order Details</p>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Item</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>

                      <tbody>
                        {orderItems.map((item, i) => {
                          return (
                            <>
                              <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                              </tr>
                            </>
                          )
                        })}
                        <tr>
                          <td><b>Sub-Total</b></td>
                          <td>{data.sub_total}</td>
                        </tr>
                        <tr>
                          <td><b>Tax</b></td>
                          <td>{data.tax}</td>
                        </tr>
                        <tr>
                          <td><b>Delivery Charges</b></td>
                          <td>{data.delivery_charges}</td>
                        </tr>
                        <tr>
                          <td><b>Total</b></td>
                          <td>{data.total}</td>
                        </tr>


                      </tbody>
                    </table>
                  </div>
                </div>
              </>


            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div >
  )
}

export default ViewOrder