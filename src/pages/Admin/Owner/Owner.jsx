import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import api from '../../services/ApiUrl'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import ClipLoader from 'react-spinners/ClipLoader';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Owner() {
    const [owner, setOwner] = useState([]);
    const [totalOwner, setTotalOwner] = useState();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState()
    const [search, setSearch] = useState();
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true)
        api.get(`/owners?keyword=${search}`)
            .then((res) => {
                // console.log(res,'search owenr')
                setTotalPage(res.data.data.owners.total)
                setTotalOwner(res.data.data.owners)
                // setTotalOwner(res.data.data.owners)
                setOwner(res.data.data.owners.data)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const closeSearch = (e) => {
        setIsLoading(true)
        setSearch('');
        setPage(1)
        api.get(`/owners?keyword=${[]}`)
            .then((res) => {
                setTotalPage(res.data.data.owners.total)
                setOwner(res.data.data.owners.data)
                setTotalOwner(res.data.data.owners)
            }).finally(() => {
                
                setIsLoading(false)
            });
    }

    const editOwner = (id) => {
        navigate('/editowner/' + id)
    }
    const getOwner = () => {
        setIsLoading(true)
        api.get(`/owners`)
            .then((res) => {
                console.log(res.data.data.owners, 'owner')
                setOwner(res.data.data.owners.data)
                setTotalOwner(res.data.data.owners)
                setTotalPage(res.data.data.owners.total)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    const handleChange = (page) => {
        setIsLoading(true)
        setPage(page)
        api.get(`/owners?page=${page}`)
            .then((res) => {
                getOwner()
                console.log(res.data.data.owners, 'owner')
                setOwner(res.data.data.owners.data)
                setTotalOwner(res.data.data.owners)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    const viewOwner = (id) => {
        navigate('/viewowner/' + id)
    }

    const handleDelete = (id) => {
        api.delete(`/owners/${id}`)
            .then((res) => {
                console.log(res)
                getOwner();
                // alert(res.data.messages)
                toast.success(res.data.messages[0])
                setTotalOwner(res.data.data.owners)
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

                                    <div className="card-body">
                                        {/* <Link to='/addowner'><button className='btn btn-success'>Add Owner</button></Link> */}
                                        {/* <br /><br /> */}
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-lg" value={search} placeholder="Type your keywords here" onChange={(e) => setSearch(e.target.value)} />
                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-lg btn-success" onClick={getSearch} >
                                                    <i className="fa fa-search"></i>
                                                </button>
                                                <button type="submit" className="btn btn-lg btn-danger" onClick={closeSearch}>
                                                    <i className="fa fa-times"></i>
                                                </button>
                                            </div>
                                        </div><br />
                                        {isLoading ? (
                                            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                                <ClipLoader loading={isLoading} size={40} color="#17A2B8" />
                                            </div>
                                        ) :
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
                                                                <td><b>{((page - 1) * 10) + index + 1}</b></td>
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
                                        }

                                        {totalOwner && totalOwner.total <= 10 ?
                                            '' :
                                            <PaginationControl
                                                page={page}
                                                total={totalPage}
                                                limit={10}
                                                changePage={(page) => {
                                                    handleChange(page)
                                                }}
                                                ellipsis={1}
                                            />
                                        }
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