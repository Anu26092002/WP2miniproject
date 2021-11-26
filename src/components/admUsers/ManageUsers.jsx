import React, { useState, useEffect } from 'react';
import { Container, Spinner, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CourseView from '../Courses/CourseView';
const AdminUsers = () => {
    const admStatus = useSelector((state) => state.login.admin)
    const jwt = useSelector((state) => state.login.jwt)
    const [usersArray, setUsers] = useState([])
    const sendReq = (req, arg, query) => {
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
            if (req == 'getusers') {
                setUsers(response.data.arr)
            }
            else{
                sendReq("getusers")
            }

        }).catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        sendReq("getusers")
    }, []);
    const [isLoading, setLoading] = useState(true)
    const [isCourseVisible, setCourseVisible] = useState({vis:false,req:"addtocourse"})
    const [selectedUsers, setSelectedUsers] = useState([])
    const handleSelect = (e, userid) => {
        let newSelect = [...selectedUsers]
        const index = newSelect.indexOf(userid);
        if (index > -1) {
            newSelect.splice(index, 1);
        }
        else {
            newSelect.push(userid)
        }
        setSelectedUsers(newSelect)
    }
    if (!admStatus) {
        return (<Navigate to="/" />)
    }
    const handleClose = () => setCourseVisible({...isCourseVisible, vis:false});
    const handleShow = (reqstr) => {
        setCourseVisible({vis:true,req:reqstr})
    };
    return (
        <Container>
            {!isLoading ? (<>
                <Table className="my-5 table-bordered table-hover border shadow-sm">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersArray.map((element) => {
                            return (<tr key={element.userid}>
                                <td>
                                    <Form.Check aria-label="option 1" checked={selectedUsers.includes(element.userid)} onChange={(e) => handleSelect(e, element.userid)} /></td>
                                <td>{element.userid}</td>
                                <td>{element.firstname}</td>
                                <td>{element.useremail}</td>
                                <td>{element.isadmin == 1 ? (<i className="bi bi-check-circle-fill text-success"></i>) : (<i className="bi bi-x"></i>)}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Container className="fixed-bottom my-5 w-50 border shadow p-3 hstack gap-2 justify-content-center" style={{ minWidth: "820px" }}>
                    <Button onClick={()=>handleShow("addtocourse")}><i className="bi bi-plus-circle"></i> Add to Course</Button>
                    <Button onClick={()=>handleShow("remfromcourse")}><i className="bi bi-x-circle"></i> Remove from Course</Button>
                    <div className="vr"></div>
                    <Button onClick={() => sendReq("makeadmin", selectedUsers)}><i className="bi bi-shield-plus" ></i> Make Admin</Button>
                    <Button onClick={() => sendReq("remadmin", selectedUsers)}><i className="bi bi-shield-x"></i> Remove Admin</Button>
                    <div className="vr"></div>
                    <Button variant="danger" onClick={() => sendReq("deluser", selectedUsers)}><i className="bi bi-trash"></i> Delete</Button>
                </Container>
                <Modal show={isCourseVisible.vis} onHide={handleClose} size="xl">
                    <Modal.Header closeButton >
                        <Modal.Title>Select a Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><CourseView selectCourse={true} selected={selectedUsers} close={handleClose} req={isCourseVisible.req}/></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>) : <Spinner />}
        </Container>
    )
}

export default AdminUsers