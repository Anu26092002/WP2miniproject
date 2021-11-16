import './App.css';
import Navbar from './components/Navbar/navbar';
import { Route, Routes, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Aboutus from './components/aboutUs/aboutUs';
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
