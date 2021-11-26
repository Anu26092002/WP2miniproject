import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux'
import axios from 'axios'
const Course = (props) => {
    const [isLoading, setLoading] = useState(true)
    const { courseid } = useParams()
    const [courseDetails,setCourse] = useState({course_id:courseid}) 
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
            setLoading(false);
            if(response.data.arr.course_id){
                setCourse({...courseDetails, ...response.data.arr})
            }
        }).catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        sendReq("getcourse","", courseid)
    }, []);
    console.log(courseDetails)
    return (
        <Container className="p-2 my-5">
            
            {isLoading ? (
                <>
                    <Spinner as="span"
                        animation="border"
                        size="md"
                        role="status"
                        aria-hidden="true" />
                </>
            ) : (
                <Row><p className="display-6 text-start my-3">{courseDetails.course_name}</p></Row>
            )}
        </Container>
    )
}

export default Course