import React from 'react'
import { useNavigate } from 'react-router-dom';
import ProfilePic from "./ProfilePic.png"

const Navbar = () => {
    const navigate = useNavigate();
    const LogOut = () => {
        sessionStorage.removeItem("UserName")
        sessionStorage.removeItem("Ans")
        sessionStorage.removeItem("Que")
        navigate("/login")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-brand btn">Navbar</button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {(sessionStorage.UserName ?
                            <ul className="navbar-nav">
                                <li className="nav-item afterLogin">
                                    <button className='btn' onClick={() => navigate('/')}>Home</button>
                                </li>
                                <li className="nav-item afterLogin">
                                    <button className='btn position-relative' onClick={() => navigate('/About')}>About
                                        <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                                            <span class="visually-hidden">New alerts</span>
                                        </span>
                                    </button>
                                </li>
                                <li className="nav-item afterLogin" style={{ display: "block" }}>
                                    <button className="btn" onClick={LogOut}>Log Out</button>
                                </li>
                                <li className="nav-item" style={{ "float": "right" }}>
                                    <button className='btn' onClick={() => navigate('/Profile')}><img src={ProfilePic} alt='Profile Pic' className='rounded-circle mr-2' style={{ width: "50px", height: "50px" }} /></button>
                                </li>
                            </ul>
                            : "")}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar