import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import axios from 'axios'

const Post = (props) => {
    const admStatus = useSelector((state) => state.login.admin)
    const jwt = useSelector((state) => state.login.jwt)
    const sendReq = (req, arg, query) => {
        axios.post('http://localhost/edumanage/coursehandler.php', {
            req: req,
            query: query,
            arg: arg
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            }
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <div className="text-start my-3  bg-light border rounded rounded-3 p-4 d-flex flex-column justify-content-between">
            <div className="d-block"><p className="h4 customheading" >{props.title}</p> {props.assignment? (<><span className="badge bg-primary mb-3 me-2 py-1">Assignment</span><span className={"badge mb-3 me-1 py-1 "+(props.submitted ? "bg-success" : "bg-warning text-dark")}>Due {props.due}</span></> ):(<span className="badge bg-secondary mb-3 me-1 py-1">Post</span>)}</div>
            <p className="h6">{props.desc}</p>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <p className="text-muted m-0 pt-3">Posted By Yash</p>
                {props.assignment? props.submitted ? (<Button className="btn-sm mt-3" variant="secondary">View Submission</Button>):(<Button className="btn-sm mt-3">Add Submission</Button>) :null}
            </div>
        </div>)
}

export default Post