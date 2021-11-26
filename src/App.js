import './App.css';
import Navbar from './components/Navbar/navbar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Aboutus from './components/aboutUs/aboutUs';
import Login from './components/signin/Login';
import Signup from './components/signin/Signup';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from './store/loginSlice'
import AdminCourses from './components/Courses/AdminCourses'
import ManageUsers from './components/admUsers/ManageUsers'
import Course from './components/subjects/Course'
function App() {
  const cookies = new Cookies()
  const dispatch = useDispatch()
  if (cookies.get("name")) {
    dispatch(loginUser(
      {
        name: cookies.get("name"),
        jwt: cookies.get("jwt"),
        rem: false,
        admin: cookies.get("admin")
      }
    ))
  }
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/managecourses" element={<AdminCourses />} />
          <Route path="/manageusers" element={<ManageUsers />} />
          <Route path="/course/:courseid" element={<Course />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
