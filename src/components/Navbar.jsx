import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCartPlus, FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from "./logo.ico";

const Navbar = () => {
    const navigate = useNavigate();
    const [searchVisible, setSearchVisible] = useState(false);

    const LogOut = () => {
        sessionStorage.removeItem("UserName");
        sessionStorage.removeItem("Ans");
        sessionStorage.removeItem("Que");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark border-bottom sticky-top mb-1" style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)'
        }}>
            <div className="container-fluid">
                <img src={logo} style={{ width: "75px", height: "45px" }} alt="Logo" />
                <span className="navbar-brand text-white fs-2 fw-bold ms-2">YumYard</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button className='btn text-white' onClick={() => navigate('/')}>Home</button>
                        </li>
                        <li className="nav-item">
                            <button className='btn text-white' onClick={() => navigate('/order')}>Order</button>
                        </li>
                        <li className="nav-item">
                            <button className='btn text-white' onClick={() => setSearchVisible(!searchVisible)}>
                                <FaSearch />
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className='btn text-white' onClick={() => navigate('/info')}>
                                About Us
                            </button>
                        </li>
                        <li className="nav-item position-relative">
                            <button className='btn text-white' onClick={() => navigate('/about')}>
                                <FaCartPlus />
                                <span id='bedge' className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ display: "none", borderRadius: "10px", padding: "5px" }}>
                                    <span className="visually-hidden">New alerts</span>
                                </span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn text-white" onClick={LogOut}>Log Out</button>
                        </li>
                    </ul>
                    {sessionStorage.getItem("UserName") && (
                        <div className="ms-3 d-flex align-items-center">
                            <button className='btn text-white' onClick={() => navigate('/profile')}>
                                <FaUserCircle size={30} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {searchVisible && (
                <div className="search-bar mt-2">
                    <input type="text" className="form-control" placeholder="Search..." />
                </div>
            )}
        </nav>
    );
};

export default Navbar;
