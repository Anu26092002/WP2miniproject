import './App.css';
import Navbar from './components/Navbar/navbar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Aboutus from './components/aboutUs/aboutUs';
import Login from './components/signin/Login';
import Signup from './components/signin/Signup';
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
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
