import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../store/loginSlice'
import { Link } from 'react-router-dom'
function NavbarComponent() {
    const dispatch = useDispatch();
    const adm = useSelector((state) => state.login.admin)
    let adminOptions = (<>
        <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/courses">My Courses</NavDropdown.Item>
        {/* <NavDropdown.Item as={Link} to="/submissions">My Submissions</NavDropdown.Item> */}
    </>)
    if (adm ==1) {
        adminOptions = (
            <>
                {/* <NavDropdown.Item as={Link} to="/admdashboard">Admin Dashboard</NavDropdown.Item> */}
                <NavDropdown.Item as={Link} to="/manageusers">Manage Users</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/managecourses">Manage Courses</NavDropdown.Item>
                {/* <NavDropdown.Item as={Link} to="/admsubmissions">View Submissions</NavDropdown.Item> */}
            </>
        )
    }
    const name = useSelector((state) => state.login.name)
    const loginState = useSelector((state) => state.login.login)
    let rhs = (<Navbar.Collapse className="justify-content-end d-grid gap-3">
        <Link to='/login' style={{ textDecoration: "none" }}><Button variant="outline-light" size="sm">Login</Button></Link>
        <Link to='/signup' style={{ textDecoration: "none" }}><Button variant="light" size="sm">Sign Up</Button></Link>
    </Navbar.Collapse>)
    if (loginState) {
        rhs = (
            <>
                <Navbar.Text>
                    Signed in as:
                </Navbar.Text>
                <NavDropdown title={name} id="navbarScrollingDropdown">
                    {adminOptions}
                    <NavDropdown.Divider />
                    {/* <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item> */}
                    <NavDropdown.Item onClick={() => dispatch(logoutUser())}>
                        Log out
                    </NavDropdown.Item>
                </NavDropdown>
            </>)
    }
    return (
        <Navbar bg="dark" variant="dark" sticky="top" className="shadow">
            <Container>
                <Navbar.Brand as={Link} to="/">EduManage</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
                </Nav>
                <Nav>
                    {rhs}
                </Nav>
            </Container>
        </Navbar >
    )
}

export default NavbarComponent