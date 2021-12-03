import React from 'react'

function Aboutus() {
    return (
        <div>

            <section class="about-company-section">
                <div class="container p-1 p-sm-3">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h2>About LMS</h2>
                            <hr />
                        </div>
                        <div class="col-md-3">
                            <img class="img-fluid" src="imgs/new_logo_black.png" alt="" />
                        </div>
                        <div class="col-md-9">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident saepe odio molestias. Voluptates
                                officiis minima amet modi, perspiciatis impedit reiciendis doloremque, placeat laborum iste eaque autem
                                assumenda, consectetur odit quidem!
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident saepe odio molestias. Voluptates
                                officiis minima amet modi, perspiciatis impedit reiciendis doloremque, placeat laborum iste eaque autem
                                assumenda, consectetur odit quidem!
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident saepe odio molestias. Voluptates
                                officiis minima amet modi, perspiciatis impedit reiciendis doloremque, placeat laborum iste eaque autem
                                assumenda, consectetur odit quidem!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="home-newsletter p-2 pt-md-2 pb-md-2">
                <div class="row">
                    <div class="col-12 text-center">
                        <h3>
                            Subscribe to our Newsletter
                        </h3>
                        <div class="input-group p-3">
                            <input type="email" class="form-control" placeholder="Enter your email" />
                            <span class="input-group-btn">
                                <button class="btn btn-theme" type="submit">Subscribe</button>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section class="pt-3 pb-4">
                <div class="container">
                    <div class="row mt-4">
                        <div class="col text-center">
                            <h3>
                                Our Team
                            </h3>
                        </div>
                    </div>
                    <hr/>
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img class="img-fluid qualities-img p-4" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
                            <h5>
                                Planned and Designed by
                            </h5>
                            <p>
                                <i>- Anurag Ghosh</i>
                            </p>
                        </div>
                        <div class="col-md-4 text-center">
                            <img class="img-fluid qualities-img p-4" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
                            <h5>
                                Implemented by
                            </h5>
                            <p>
                                <i>- Yash Chaudhari</i>
                            </p>
                        </div>
                        <div class="col-md-4 text-center">
                            <img class="img-fluid qualities-img p-4" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
                            <h5>
                                Implemented by
                            </h5>
                            <p>
                                <i>- Anshum Etane</i>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <div class="container top-footer p-md-3 p-1">
                    <div class="row">
                        <div class="col-md-3 pl-4 pr-4">
                            <img class="img-fluid" src="imgs/logo_text_white_small.png" alt="" />

                            <a style={{color:"silver"}} class="p-1" href="#"><i class="fab fa-2x fa-facebook-square"></i></a>
                            <a style={{color:"silver"}} class="p-1" href="#"><i class="fab fa-2x fa-google-plus-square"></i></a>
                            <a style={{color:"silver"}} class="p-1" href="#"><i class="fab fa-2x fa-twitter-square"></i></a>
                            <a style={{color:"silver"}} class="p-1" href="#"><i class="fab fa-2x fa-instagram"></i></a>
                        </div>
                    </div>
                </div>

                <div class="container-fluid bottom-footer pt-2">
                    <div class="row">
                        <div class="col-12 text-center">
                            <p>Copyrights © 2021 - All rights reserved</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Aboutus;