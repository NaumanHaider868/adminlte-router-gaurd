import React, { useState, useEffect } from 'react'
import api from '../../services/ApiUrl'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from './../../../componets/Navbar'
import SideBar from './../../../componets/SideBar'
import Footer from './../../../componets/Footer'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import moment from "moment";
import { getItem, handlePage, handleSearch, handleCloseSearch } from '../../../redux/slice/mainItemSlice.js'
import { useDispatch } from 'react-redux'



function ViewItems() {

    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [totalItem, setTotalItem] = useState();
    const [search, setSearch] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();



    useEffect(() => {
        dispatch(getItem())
            .then((action) => {
                setItems(action.payload.data.data.items.data)
                setTotalItem(action.payload.data.data.items)
                console.log(action.payload.data.data.items, 'total items')
                setTotalPage(action.payload.data.data.items.total)
                console.log(action.payload.data.data.items.total, 'total page')
            })
    }, [])


    const handleChange = (page) => {
        setPage(page);
        dispatch(handlePage(page))
            .then((action) => {
                setItems(action.payload.data.data.items.data)
            })
    }


    const getSearch = () => {
        dispatch(handleSearch(search))
            .then((action) => {
                console.log(action, 'search')
                setItems(action.payload.data.data.items.data)
                setTotalItem(action.payload.data.data.items)
                setTotalPage(action.payload.data.data.items.total)
            })
    }


    const closeSearch = () => {
        dispatch(handleCloseSearch())
            .then((action) => {
                setPage(1)
                setItems(action.payload.data.data.items.data);
                setTotalItem(action.payload.data.data.items);
                setTotalPage(action.payload.data.data.items.total)
            }).finally(() => {
                setSearch('');
            });
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

                                        <div className="card-body">
                                            <Link to='/additems'><button className='btn btn-success'>Add Item</button></Link>
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
                                                        <th scope="col">Description</th>
                                                        <th scope='col'>Cook Time</th>
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
                                                                    <td>{moment(item.cook_time, 'HH:mm:ss').format("HH:mm")}</td>
                                                                    <td>{item.price}</td>
                                                                </tr>

                                                            </>
                                                        )
                                                    })}

                                                </tbody>
                                            </table>
                                            {totalItem && totalItem.total <= 10 ?
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

export default ViewItems