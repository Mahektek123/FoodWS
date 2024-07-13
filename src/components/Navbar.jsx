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
                    <button className="navbar-brand btn" onClick={()=>navigate("/")}>Foodies</button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {sessionStorage.UserName ? (
                            <ul className="navbar-nav d-flex justify-content-center" style={{width: "100%"}}>
                                <li className="nav-item afterLogin">
                                    <button className='btn' onClick={() => navigate('/')}>Home</button>
                                </li>
                                <li className="nav-item afterLogin">
                                    <button className='btn position-relative' onClick={() => navigate('/About')}>My Cart
                                        <span id='bedge' className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle" style={{ display: "none" }}>
                                            <span className="visually-hidden">New alerts</span>
                                        </span>
                                    </button>
                                </li>
                                <li className="nav-item afterLogin">
                                    <button className="btn" onClick={LogOut}>Log Out</button>
                                </li>
                            </ul>
                        ) : ""}

                        {sessionStorage.UserName && (
                            <div className="ms-auto">
                                <button className='btn' onClick={() => navigate('/Profile')}>
                                    <img src={ProfilePic} alt='Profile Pic' className='rounded-circle' style={{ width: "60px", height: "50px" }} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar