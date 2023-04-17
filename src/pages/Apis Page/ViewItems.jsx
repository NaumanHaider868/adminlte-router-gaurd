import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import { PaginationControl } from 'react-bootstrap-pagination-control';

function ViewItems() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPage,setTotalPage] = useState();

    useEffect(() => {
        axios.get(`https://foodapis.techenablers.info/api/admin/items?page=${page}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data.data.items)
                setItems(res.data.data.items.data)
                setTotalPage(res.data.data.items.total)
            })
    }, [page])

    const getSearch = () => {
        axios.get(`https://foodapis.techenablers.info/api/admin/items/${search}`,{
            headers : {
                Authorization : `Bearer` + localStorage.getItem('token')
            }
        })
        .then((res)=>{
            console.log(res,'search items')
        })
    }
    return (
        <div className='wrapper'>
            <Navbar />
            <SideBar />
            <div className='wrapper'>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Items</h1>
                                </div>

                            </div>
                        </div>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <Link to='/additem'><button className='btn btn-success'>Add Item</button></Link>
                                            <br /><br />
                                            <div className="input-group">
                                                <input type="search" className="form-control form-control-lg" placeholder="Type your keywords here" onChange={(e) => setSearch(e.target.value)} />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-lg btn-success" onClick={getSearch} >
                                                        <i className="fa fa-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <table className="table" style={{ marginBottom: '30px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sr.#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Description</th>
                                                        <th scope='col'>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {items.map((item, i) => {
                                                        return (
                                                            <>
                                                                <tr key={i}>
                                                                    <td>{((page - 1) * 10) + i + 1}</td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.description}</td>
                                                                    <td>{item.price}</td>
                                                                </tr>

                                                            </>
                                                        )
                                                    })}

                                                </tbody>
                                            </table>
                                            <PaginationControl
                                                page={page}
                                                total={totalPage}
                                                limit={10}
                                                changePage={(page) => {
                                                    setPage(page);
                                                }}
                                                ellipsis={1}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ViewItems