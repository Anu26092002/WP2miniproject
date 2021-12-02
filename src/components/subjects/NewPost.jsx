import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios'
import { useSelector } from 'react-redux'


const NewPost = (props) =>{
    const jwt = useSelector((state) => state.login.jwt)
    const [formState, setFormState] = useState({ title: "", desc: "", duedate:null })
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
            props.close();
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let arg = {type:0}
        if(formState.title !== ""){
            arg = {...arg , title: formState.title}
        }
        if(formState.desc !== ""){
            arg = {...arg , desc: formState.desc}
        }
        sendReq("createpost",arg,props.courseid)
    }
    const handleChange = (event, element) => {
        setFormState({ ...formState, [element]: event.target.value })
    }
    return(
        <Container className="mt-5 p-5 shadow-sm mb-5 border rounded bg-light text-center" style={{ width: "500px" }}>
            <i className="bi bi-send-plus" style={{ fontSize: "2.2rem" }}></i>
            {/* <h1>Login</h1> */}
            <p className="h1">Create Post</p>
            <form>
                <div className="form-floating my-4">
                    <input type="text" className="form-control" onChange={(e) => handleChange(e, "title")} value={formState.title} id="floatingInput" placeholder="Enter title" />
                    <label htmlFor="floatingInput">Title</label>
                </div>
                <div className="form-floating my-4">
                    <input type="text" className="form-control" onChange={(e) => handleChange(e, "desc")} value={formState.desc} id="floatingdesc" placeholder="Enter desc" />
                    <label htmlFor="floatingdesc">Description</label>
                </div>
                <button className="btn mb-3 btn-lg w-100 btn-primary " onClick={handleSubmit}>Submit</button>
            </form>
        </Container>
    )
}

export default NewPost