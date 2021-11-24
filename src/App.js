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
function App() {
  const cookies = new Cookies()
  const dispatch = useDispatch()
  if (cookies.get("name")) {
    dispatch(loginUser(
      {
        name: cookies.get("name"),
        jwt: cookies.get("jwt"),
        rem: false
      }
    ))
  }
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
