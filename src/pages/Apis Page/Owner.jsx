import React from 'react'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { PaginationControl } from 'react-bootstrap-pagination-control';

function Owner() {
    const [owner, setOwner] = useState([]);
    const [page, setPage] = useState(1);
    const [search,setSearch] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        getOwner();
    }, [page])
    const getSearch = (e) => {
        axios.get(`https://foodapis.techenablers.info/api/admin/owners?keyword=${search}`,{
            headers : {
                Authorization : `Bearer` + localStorage.getItem('token')
            }
        })
        .then((res)=>{
            // console.log(res,'search owenr')
            setOwner(res.data.data.owners.data)
        })
    }
    const editOwner = (id) => {
        navigate('/editowner/' + id)
    }
    const getOwner = () => {
        axios.get(`https://foodapis.techenablers.info/api/admin/owners?page=${page}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data.data.owners.data, 'owner')
                setOwner(res.data.data.owners.data)
            })
    }
    const viewOwner = (id) => {
        navigate('/viewowner/' + id)
    }

    const handleDelete = (id) => {
        axios.delete(`https://foodapis.techenablers.info/api/admin/owners/${id}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res)
                getOwner();
                alert(res.data.messages)
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
                                <h1>Owner</h1>
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
                                        <Link to='/addowner'><button className='btn btn-success'>Add Owner</button></Link>
                                        <br/><br/>
                                        <div className="input-group">
                                            <input type="search" className="form-control form-control-lg" placeholder="Type your keywords here" onChange={(e)=>setSearch(e.target.value)} />
                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-lg btn-success" onClick={getSearch}>
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">

                                        <table className="table" style={{ marginBottom: '32px'}}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sr.#</th>
                                                    <th scope="col">email</th>
                                                    <th scope="col">First Name</th>
                                                    <th scope="col">Last Name</th>
                                                    <th scope="col">status</th>
                                                    <th className='' scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {owner.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{((page - 1) * 10) + index + 1}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.first_name}</td>
                                                            <td>{item.last_name}</td>
                                                            <td>{item.status}</td>
                                                            <td>
                                                                <i onClick={() => viewOwner(item.id)} class="fas fa-eye" style={{ fontSize: '13px', cursor: 'pointer' }}></i>&nbsp;
                                                                <i onClick={() => editOwner(item.id)} class="fas fa-edit" style={{ fontSize: '13px', cursor: 'pointer' }}></i>&nbsp;
                                                                <i class="fas fa-trash" style={{ fontSize: '13px', cursor: 'pointer' }} onClick={() => handleDelete(item.id)}></i>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        <PaginationControl
                                            page={page}
                                            total={11}
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

            <Footer />
        </div>
    )
}

export default Owner