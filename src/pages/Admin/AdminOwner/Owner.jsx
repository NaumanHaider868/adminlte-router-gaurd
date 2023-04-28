import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import axios from '../../services/ApiUrl'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { PaginationControl } from 'react-bootstrap-pagination-control';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Owner() {
    const [owner, setOwner] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState()
    const [search, setSearch] = useState();

    // const history = useHistory();
    
    const navigate = useNavigate();
    useEffect(() => {
        // const token = localStorage.getItem('token');
        // if (token) {
        //     navigate('/login')
        // }
        getOwner();
    }, [])
    const getSearch = (e) => {
        axios.get(`/owners?keyword=${search}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                // console.log(res,'search owenr')
                setOwner(res.data.data.owners.data)
            })
    }
    const editOwner = (id) => {
        navigate('/editowner/' + id)
    }
    const getOwner = () => {
        axios.get(`/owners`)
            .then((res) => {
                console.log(res.data.data.owners, 'owner')
                setOwner(res.data.data.owners.data)
                setTotalPage(res.data.data.owners.total)
            })
    }
    const handleChange = (page) => {
        setPage(page)
        axios.get(`/owners?page=${page}`)
            .then((res) => {
                console.log(res.data.data.owners, 'owner')
                setOwner(res.data.data.owners.data)
            })
    }
    const viewOwner = (id) => {
        navigate('/viewowner/' + id)
    }

    const handleDelete = (id) => {
        axios.delete(`/owners/${id}`)
            .then((res) => {
                console.log(res)
                getOwner();
                // alert(res.data.messages)
                toast.success(res.data.messages[0])
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
                                <h1>Admin Owner</h1>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">

                                    <div className="card-body">
                                        <Link to='/addowner'><button className='btn btn-success'>Add Owner</button></Link>
                                        <br /><br />
                                        <div className="input-group">
                                            <input type="search" className="form-control form-control-lg" placeholder="Type your keywords here" onChange={(e) => setSearch(e.target.value)} />
                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-lg btn-success" onClick={getSearch}>
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </div>
                                        </div><br />
                                        <table className="table" style={{ marginBottom: '32px' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sr.#</th>
                                                    <th scope="col">email</th>
                                                    <th scope="col">First Name</th>
                                                    <th scope="col">Last Name</th>
                                                    <th scope="col">status</th>
                                                    <th scope="col">Action</th>
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
                                                            <td><button style={{ border: 'none', borderRadius: '4px', fontSize: '10px', padding: '0px 4px', fontWeight: '700', color: '#fff', backgroundColor: `${item.status == "1" ? "#FFC107" : item.status == "0" ? "#28A745" : "#444"}` }}>{item.status}</button></td>
                                                            <td>
                                                                <i onClick={() => viewOwner(item.id)} class="fas fa-eye" style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i>&nbsp;
                                                                <i onClick={() => editOwner(item.id)} class="fas fa-edit" style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }}></i>&nbsp;
                                                                <i class="fas fa-trash" style={{ fontSize: '12px', cursor: 'pointer', color: '#3d84dd' }} onClick={() => handleDelete(item.id)}></i>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        <PaginationControl
                                            page={page}
                                            total={totalPage}
                                            limit={10}
                                            changePage={(page) => {
                                                // setPage(page);
                                                handleChange(page)
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