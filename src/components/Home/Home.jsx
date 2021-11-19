import React from 'react'
import {Link} from 'react-router-dom'
import illus1 from '../../assets/illus1.jpg'
import illus2 from '../../assets/illus2.jpg'
import illus3 from '../../assets/illus3.jpg'
import illus4 from '../../assets/illus4.jpg'
import Banner from './Banner'
function Home() {
    return (
        <div >
            <header style={{ backgroundColor: "#e0e0e0" }}>
                <div className="container px-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6">
                            <div className="mb-5 mb-lg-0 text-center text-lg-start">
                                <h1 className="display-1 lh-1 mb-3">Manage Learning at your own pace.</h1>
                                <p className="lead fw-normal text-muted mb-5">Start Learning with EduManage Today.</p>
                                <div className="d-flex flex-column flex-lg-row align-items-center">
                                    <Link className="btn btn-primary me-lg-3 mb-4 mb-lg-0" to="signup">Sign up</Link>
                                    <Link className="btn btn-primary" to="/login">Sign in</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div>
                                <img src={illus1} className="img-fluid" height="500" width="500"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <hr style={{ margin: 0 }} />
            <Banner pos={1} illusImage={illus2} titleLine={"Track your stats as you improve."}  subtitleLine={"Start Learning with EduManage Today."}/>
            <hr style={{ margin: 0 }} />
            <Banner pos={0} illusImage={illus4} titleLine={"Earn badges to gain confidence."}  subtitleLine={"Start Learning with EduManage Today."}/>
            <hr style={{ margin: 0 }} />
            <Banner pos={1} illusImage={illus3} titleLine={"Concise and easy to use."}  subtitleLine={"Start Learning with EduManage Today."}/>
        </div>
    )
}

export default Home