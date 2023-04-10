import React from 'react'
import SideBar from '../componets/SideBar'
import Navbar from '../componets/Navbar'
import Footer from '../componets/Footer'

function Dashborad() {
  return (
    // <div className='hold-transition sidebar-mini sidebar-collapse'>
      <div className="wrapper">

        <SideBar />
        <Navbar />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Collapsed Sidebar</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Collapsed Sidebar</li>
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
                    <div className="card-header">
                      <h3 className="card-title">Title</h3>

                      <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                          <i className="fas fa-minus"></i>
                        </button>
                        <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      Start creating your amazing application!
                    </div>
                    <div className="card-footer">
                      Footer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    // </div>
  )
}

export default Dashborad