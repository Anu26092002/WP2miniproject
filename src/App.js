import './App.css';
import Navbar from './components/Navbar/navbar';
import { Route, Switch, Redirect} from 'react-router';
import Home from './components/Home/Home';
import Aboutus from './components/aboutUs/aboutUs';
function App() {
  return (
    <div className="App">
      <Navbar/>
    </div>
  );
}

export default App;
