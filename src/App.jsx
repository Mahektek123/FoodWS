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
import Order from './components/Order';
import Footer from './components/Footer';
import Info from './components/Info.jsx'

function App() {
  return (
     <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/about" element={<About />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Registration" element={<Regi/>} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/info" element={<Info/>} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
