import React, { useState, useEffect } from 'react';
import { Container, Spinner, Table, FormCheck, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CourseView from '../Courses/CourseView';
const AdminCourses = () => {
    useEffect(() => {
        
    }, []);
    const [isLoading, setLoading] = useState(false)
    const [formState, setFormState] = useState("")
    const [formShow, setFormShow] = useState(false)
    const handleChange = (event) => {
        setFormState(event.target.value);
    }
    const handleShow = (val) => {
        setFormShow(val)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        sendReq("newcourse",formState);
    }
    const sendReq = (req,arg,query) => {
        axios.post('http://localhost/edumanage/coursehandler.php', {
            req: req,
            arg: arg,
            query: query
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            }
        }).then(response => {
            setLoading(false);
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }
    const admStatus = useSelector((state) => state.login.admin)
    const jwt = useSelector((state) => state.login.jwt)
    if (!admStatus) {
        return (<Navigate to="/" />)
    }
    let newCourseForm = (<div className="bg-light p-3 vstack gap-2 border shadow-sm mx-3" style={{ minHeight: '180px', maxWidth: '300px' }}>
        <form>
            <h5>Add Course</h5>
            <div className="form-floating my-4">
                <input type="text" className="form-control" onChange={handleChange} value={formState} id="floatingCourse" placeholder="name@example.com" />
                <label htmlFor="floatingCourse">Course Name</label>
            </div>
            <div className="hstack gap-2 justify-content-end">
                <Button size="sm" variant="secondary" onClick={() => handleShow(false)}>Cancel</Button>
                <Button size="sm" onClick={handleSubmit}>Submit</Button>
            </div>
        </form>
    </div>)
    return (
        <Container className="p-2 my-5">
            <Row><p className="display-6 text-start">Create Course</p></Row>
            <Row className="justify-content-start">{formShow ? newCourseForm : <Button variant="light" onClick={() => handleShow(true)} className="border border-primary shadow-sm m-3 bg-primary text-primary bg-opacity-10" style={{ height: '150px', width: '150px' }} ><i className="bi bi-plus" style={{ fontSize: "4em" }}></i></Button>}</Row>
            <Row><p className="display-6 text-start my-3">All Courses</p></Row>
            {isLoading ? (
                <Spinner as="span"
                    animation="border"
                    size="md"
                    role="status"
                    aria-hidden="true" />) : (<CourseView />)}
        </Container>
    )
}

export default AdminCourses