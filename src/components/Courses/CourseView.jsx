import React, { useState, useEffect } from 'react';
import { Card, Spinner, Col, Container } from 'react-bootstrap'
import { Navigate } from 'react-router';
import axios from 'axios'
import { useSelector } from 'react-redux'

const CourseView = (props) => {
    const [coursesArray, setCourses] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [redirectID, setRedirectID] = useState(null)
    const sendReq = (req,arg,query) => {
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
            if(req == "delcourse"){
                sendReq("getcoursesadm");
            }
            else if(req == "getcoursesadm"){
                setCourses(response.data.arr)
            }
            else if(req == "addtocourse" || req == "remfromcourse"){
                props.close();
            }
            
        }).catch(error => {
            console.log(error);
        });
    }
    const handleDelete= (course_id) =>{
        sendReq("delcourse",course_id);
    }
    const handleClick = (course_id) =>{
        sendReq(props.req,props.selected,course_id)
    }
    const handleRedirect = (course_id) =>{
        setRedirectID(course_id)
    }
    let redirect = ((<Navigate to={{pathname:'/course/'+redirectID,state:{id:redirectID}}} />))
    useEffect(() => {
        sendReq("getcoursesadm")
    }, []);
    const admStatus = useSelector((state) => state.login.admin)
    const jwt = useSelector((state) => state.login.jwt)
    const selectStyleObj = (props.selectCourse)? {cursor:'pointer'}:{}
    return (
        <Container className="my-4">
            {redirectID ? redirect : null}
            {isLoading ? <Spinner /> :
                <div className="row row-cols-1 row-cols-md-5 g-4">

                    {coursesArray.length ? coursesArray.map((element) => {
                        return (
                            <Col key={element.course_id} style={selectStyleObj}>
                                <Card style={{ maxWidth: '18rem' }} className="text-start h-100" >
                                    <Card.Body>
                                        <Card.Title style={{cursor:"pointer"}} onClick={(props.selectCourse)?()=>handleClick(element.course_id):()=>{handleRedirect(element.course_id)}}><h3>{element.course_name}</h3></Card.Title>
                                        <Card.Text className="text-muted">
                                            Created by {element.firstname}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">{element.participants} Participants</small>
                                        {admStatus ? (
                                            <>
                                                {/* <i className="bi bi-three-dots-vertical position-absolute dropdown" style={{ right: '10px' }}></i> */}
                                                <i className="bi bi-trash-fill text-muted position-absolute dropdown" onClick={()=>handleDelete(element.course_id)} style={{ right: '10px',cursor: 'pointer' }}></i>
                                            </>
                                        ) : (<></>)}
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )
                    }) : <p className="text-center w-100">No Courses Found</p>}

                </div>}
        </Container >
    )

}

export default CourseView;