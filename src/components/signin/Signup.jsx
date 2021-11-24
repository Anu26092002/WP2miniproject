import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../../store/loginSlice'
import axios from 'axios'
const Signup = () => {
    const [formState, setFormState] = useState({ email: "", passwd: "", name: "", remember: false, repass: "", age: "" })
    const [isLoading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const handleChange = (event, element) => {
        setFormState({ ...formState, [element]: event.target.value })
    }
    const buttonVal = (isLoading) ? (<Spinner as="span"
        animation="border"
        size="md"
        role="status"
        aria-hidden="true" />) : "Sign up";
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true);
        axios.post('http://localhost/edumanage/register.php', {
            email: formState.email,
            firstname: formState.name,
            passwd: formState.passwd,
            age: formState.age
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            setLoading(false);
            if (response.data.result) {
                dispatch(loginUser({
                        name: response.data.name,
                        jwt: response.data.jwt,
                        rem: formState.remember
                }))
            }
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <Container className="mt-5 p-5 shadow-sm mb-5 border rounded bg-light" style={{ width: "500px" }}>
            <i className="bi bi-person-circle" style={{ fontSize: "2.2rem" }}></i>
            {/* <h1>Login</h1> */}
            <p className="h1">Sign up</p>
            <form>
                <div className="hstack gap-3">
                    <div className="form-floating my-4">
                        <input type="text" className="form-control" onChange={(e) => handleChange(e, "name")} value={formState.name} id="floatingName" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="form-floating my-4">
                        <input type="number" className="form-control" onChange={(e) => handleChange(e, "age")} value={formState.age} id="floatingName" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Age</label>
                    </div>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" onChange={(e) => handleChange(e, "email")} value={formState.email} id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating my-4">
                    <input type="password" className="form-control" onChange={(e) => handleChange(e, "passwd")} value={formState.passwd} id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating my-4">
                    <input type="password" className="form-control" onChange={(e) => handleChange(e, "repass")} value={formState.repass} id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Re-enter Password</label>
                </div>
                <div className="my-4 form-check text-start">
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleChange(e, "remember")} value={formState.remember} id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                </div>
                <button className="btn mb-3 btn-lg w-100 btn-primary " onClick={handleSubmit}>{buttonVal}</button>
                <Link to="/login" className="btn btn-lg w-100 btn-secondary ">Login</Link>
            </form>
        </Container>
    )
}

export default Signup