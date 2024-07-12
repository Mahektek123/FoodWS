import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import About from './components/About'
import Home from './components/Home'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Regi from './components/Regi';
import Profile from './components/Profile';

function App() {
  return (
     <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Registration" element={<Regi/>} />
          <Route path="/Profile" element={<Profile/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
