import React from 'react'
import { Switch, Route } from 'react-router-dom'
import illus from '../../assets/illus.jpg'
function Home() {
    return (
        <div style={{ backgroundColor: "#e0e0e0" }}>
            <header >
                <div className="container px-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6">
                            <div className="mb-5 mb-lg-0 text-center text-lg-start">
                                <h1 className="display-1 lh-1 mb-3">Manage Learning at your own pace.</h1>
                                <p className="lead fw-normal text-muted mb-5">Start Learning with EduManage Today.</p>
                                <div className="d-flex flex-column flex-lg-row align-items-center">
                                    <a className="btn btn-primary me-lg-3 mb-4 mb-lg-0" href="#!">Sign up</a>
                                    <a className="btn btn-primary" href="#!">Sign in</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div>
                                <img src={illus} className="img-fluid" height="500" width="500"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <hr style={{ margin: '0px' }} />
            <div className="container px-5" >
                <div className="row gx-6 align-items-center" style={{ height: "400px" }}>
                    <div className="col-lg-6">
                        <div>
                            <i class="bi bi-graph-up-arrow" style={{ fontSize: 150 }}></i>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mb-5 mb-lg-0 text-center text-lg-start">
                            <h1 className="display-2 lh-1 mb-3">Track your stats as you improve.</h1>
                            <p className="lead fw-normal text-muted mb-5">Start Learning with EduManage Today.</p>
                        </div>
                    </div>

                </div>
            </div>
            <hr style={{ margin: '0px' }} />
            <div className="container px-5" >
                <div className="row gx-6 align-items-center" style={{ height: "400px" }}>
                    <div className="col-lg-6">
                        <div className="mb-5 mb-lg-0 text-center text-lg-start">
                            <h1 className="display-2 lh-1 mb-3">Earn badges to gain confidence.</h1>
                            <p className="lead fw-normal text-muted mb-5">Start Learning with EduManage Today.</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div>
                            <i class="bi bi-patch-check" style={{ fontSize: 150 }}></i>
                        </div>
                    </div>


                </div>
            </div>
            <hr style={{ margin: '0px' }} />
            <div className="container px-5" >
                <div className="row gx-6 align-items-center" style={{ height: "400px" }}>
                    <div className="col-lg-6">
                        <div>
                            <i class="bi bi-lightning-charge" style={{ fontSize: 150 }}></i>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mb-5 mb-lg-0 text-center text-lg-start">
                            <h1 className="display-2 lh-1 mb-3">Concise and easy to use.</h1>
                            <p className="lead fw-normal text-muted mb-5">Start Learning with EduManage Today.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home