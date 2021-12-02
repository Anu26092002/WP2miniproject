import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button, Row, Col, Modal } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux'
import Post from './Post'
import NewPost from './NewPost';
import axios from 'axios'
const Course = (props) => {
    const [isLoading, setLoading] = useState(true)
    const { courseid } = useParams()
    const [postsArray, setPosts] = useState([])
    const [courseDetails, setCourse] = useState({ course_id: courseid })
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
            if (req == "getcourse" && response.data.arr.course_id) {
                setCourse({ ...courseDetails, ...response.data.arr })
            }
            else if(req == "getposts" && response.data.arr){
                setLoading(false)
                setPosts(response.data.arr)
            }
        }).catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        sendReq("getcourse", "", courseid)
        sendReq("getposts","",courseid)
    }, []);
    const [isCourseVisible, setCourseVisible] = useState({vis:false,req:"post"})
    const handleClose = () => {
        sendReq("getposts","",courseid)
        setCourseVisible({...isCourseVisible, vis:false})
    };
    const handleShow = (reqstr) => {
        setCourseVisible({vis:true,req:reqstr})
    };
    return (
        <Container className="p-2 my-4">

            {isLoading ? (
                <>
                    <Spinner as="span"
                        animation="border"
                        size="md"
                        role="status"
                        aria-hidden="true" />
                </>
            ) : (
                <>
                    <Row><div className=" text-start my-3  bg-light border rounded rounded-3 p-4 d-flex flex-column justify-content-between" style={{ height: '300px' }}>
                        <p className="display-5 customheading" >{courseDetails.course_name}</p>
                        <div className=" d-flex flex-row justify-content-between align-items-center">
                            <h6 className="h5 text-muted my-0 ">Created By : {courseDetails.ownername}</h6>
                            <div className="hstack gap-2"><Button variant="outline-primary" >{courseDetails.participants} Participants</Button>
                                {admStatus ? (<><Button onClick={()=>handleShow("post")}><i className="bi bi-plus-square"></i>  New Post</Button>
                                    <Button onClick={()=>handleShow("assignment")}> <i className="bi bi-journal-plus"></i>  New Assignment</Button></>) : null}
                            </div>
                        </div>
                    </div>
                    </Row>
                    <Row className="justify-content-between">
                        <div className="d-flex flex-row w-100 p-0 align-items-start">
                            <div className="bg-light border rounded rounded-3 p-4 text-start w-25">
                                <p className="h5 customheading">Assignments</p>
                                <p className="h6 text-muted text-center pt-2">No Assignments Found</p>
                            </div>
                            <div className=" p-4 text-start w-75">
                                <p className="h3 customheading mx-3">Class Activity</p>
                                <hr />
                                <div className="vstack gap-0">
                                    {postsArray.length ? postsArray.map((element) => {
                                    
                                    return(<Post title={element.title} desc={element.desc}/>)
                                
                                    }):(<p className="text-center">No posts found</p>) }
                                </div>
                            </div>
                        </div>
                    </Row>
                </>
            )}
            <Modal show={isCourseVisible.vis} onHide={handleClose} size="lg">
                    <Modal.Header closeButton >
                        <Modal.Title>Create</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><NewPost courseid={courseid} close={handleClose} req={isCourseVisible.req}/></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
        </Container>
    )
}

export default Course