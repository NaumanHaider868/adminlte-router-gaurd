import React from 'react'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import { useState, useEffect } from 'react'
import api from '../services/ApiUrl'
import { Link } from 'react-router-dom'
import { PaginationControl } from 'react-bootstrap-pagination-control';
// import { getAdminCategorie, getAdminCategorieSearch } from '../services/ApiUrl'

function ViewCategories() {
    const [search, setSearch] = useState([])
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();

    const [categorie, setCategorie] = useState([]);
    const [totalCategorie,setTotalCategorie] = useState()
    useEffect(() => {

        api.get(`categories?page=${page}`)
            .then((res) => {
                console.log(res.data.data);
                setCategorie(res.data.data.categories.data)
                setTotalPage(res.data.data.categories.total)
                setTotalCategorie(res.data.data.categories)
            })
    }, [page])
    const getSearch = (e) => {
        e.preventDefault();
        api.get(`/categories?keyword=${search}`)
            .then((res) => {
                console.log(res.data.data.categories.data);
                setCategorie(res.data.data.categories.data)
                setTotalPage(res.data.data.categories.total)
                setTotalCategorie(res.data.data.categories)
            })
    }
    const closeSearch = (e) => {
        // e.preventDefault();
        api.get(`/categories?keyword=${[]}`)
            .then((res) => {
                setCategorie(res.data.data.categories.data);
                setTotalPage(res.data.data.categories.total)
                setTotalCategorie(res.data.data.categories)
                
            }).finally(() => {
                setSearch('');
            });
    }
    const handleChange = (page) => {
        setPage(page)
        api.get(`/categories?page=${page}`)
            .then((res) => {
                console.log(res.data.data.customers.data)
                setCategorie(res.data.data.categories.data);
                setTotalCategorie(res.data.data.categories)
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
                                    <h1>Categories</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <Link to='/admin' className="breadcrumb-item"><a href="#">Admin Dashboard</a></Link>
                                        <li className="breadcrumb-item active">Categories</li>
                                    </ol>
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
                                            <Link to='/addcategorie'><button className='btn btn-success'>Add Categorie</button></Link>
                                            <br /><br />
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
                                            <table className="table" style={{ marginBottom: '30px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sr.#</th>
                                                        <th scope="col">Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {categorie.map((item, i) => {
                                                        return (
                                                            <>
                                                                <tr key={i}>
                                                                    <td>{((page - 1) * 10) + i + 1}</td>
                                                                    <td>{item.name}</td>
                                                                </tr>

                                                            </>
                                                        )
                                                    })}

                                                </tbody>
                                            </table>
                                            {totalCategorie && totalCategorie.total <= 10 ? 
                                               '' :
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
                                            // <h1>Ho</h1>
                                            }
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

export default ViewCategories