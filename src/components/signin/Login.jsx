import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const [formState, setFormState] = useState({ email: "", passwd: "", remember: false })
    const [isLoading, setLoading] = useState(false)
    const handleChange = (event, element) => {
        setFormState({ ...formState, [element]: event.target.value })
    }
    const buttonVal = (isLoading) ? (<Spinner as="span"
        animation="border"
        size="md"
        role="status"
        aria-hidden="true" />) : "Login";
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('http://localhost/edumanage/login.php', {
            email: formState.email,
            passwd: formState.passwd,
            rem: formState.remember,
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            setLoading(false);
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <Container className="mt-5 p-5 shadow-sm mb-5 border rounded bg-light" style={{ width: "500px" }}>
            <i className="bi bi-shield-lock" style={{ fontSize: "2.2rem" }}></i>
            {/* <h1>Login</h1> */}
            <p className="h1">Login</p>
            <form>
                <div className="form-floating my-4">
                    <input type="email" className="form-control" onChange={(e) => handleChange(e, "email")} value={formState.email} id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating my-4">
                    <input type="password" className="form-control" onChange={(e) => handleChange(e, "passwd")} value={formState.passwd} id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>
                <div className="my-4 form-check text-start">
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleChange(e, "remember")} value={formState.remember} id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Remember me</label>
                </div>
                <button className="btn mb-3 btn-lg w-100 btn-primary " onClick={handleSubmit}>{buttonVal}</button>
                <Link to="/signup" className="btn btn-lg w-100 btn-secondary ">Sign up</Link>
            </form>
        </Container>
    )
}

export default Login