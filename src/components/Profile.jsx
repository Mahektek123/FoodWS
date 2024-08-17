import React, { useState, useEffect } from 'react';
import DP from './ProfilePic.png';
import '../App.css';

const Profile = () => {
    const [profilePic, setProfilePic] = useState(DP);
    const [warning, setWarning] = useState('');
    const [showNameUpdate, setShowNameUpdate] = useState(false);
    const [showPswUpdate, setShowPswUpdate] = useState(false);
    const [showSecQueUpdate, setShowSecQueUpdate] = useState(false);
    const [newName, setNewName] = useState('');
    const [oldPsw, setOldPsw] = useState('');
    const [newPsw, setNewPsw] = useState('');
    const [newPswR, setNewPswR] = useState('');
    const [secQue, setSecQue] = useState('What is your Home Name ?');
    const [secAnsUp, setSecAnsUp] = useState('');

    useEffect(() => {
        const fetchProfilePic = async () => {
            const user = sessionStorage.getItem('UserName');
            const data = { UserName: user };

            const response = await fetch('http://localhost:3000/ImgBack', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const rData = await response.json();
            if (rData.PP) {
                setProfilePic(rData.PP);
            }
        };

        fetchProfilePic();
    }, []);

    const displayWarning = (warning) => {
        setWarning(warning);
        setTimeout(() => {
            setWarning('');
        }, 2000);
    };

    const handleNameChange = async (e) => {
        e.preventDefault();

        if (sessionStorage.getItem('UserName') === newName) {
            displayWarning('Old UserName and New UserName cannot be the same');
            return;
        }

        const data = {
            oldName: sessionStorage.getItem('UserName'),
            newName: newName,
        };

        const response = await fetch('http://localhost:3000/UpName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const rData = await response.json();

        if (rData.message === 'User Name Has Been Updated') {
            sessionStorage.setItem('UserName', newName);
            displayWarning(rData.message);
            setShowNameUpdate(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (oldPsw === newPsw || newPsw !== newPswR) {
            displayWarning('Enter Valid Passwords');
            return;
        }

        const data = {
            UserName: sessionStorage.getItem('UserName'),
            oldPsw: oldPsw,
            newPsw: newPsw,
        };

        const response = await fetch('http://localhost:3000/UpPsw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const rData = await response.json();
        displayWarning(rData.message);
        setShowPswUpdate(false);
    };

    const handleSecQueChange = async (e) => {
        e.preventDefault();

        const data = {
            UserName: sessionStorage.getItem('UserName'),
            secQue: secQue,
            secAnsUp: secAnsUp,
        };

        const response = await fetch('http://localhost:3000/UpSec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const rData = await response.json();
        displayWarning(rData.message);
        setShowSecQueUpdate(false);
        sessionStorage.setItem('Que', secQue);
        sessionStorage.setItem('Ans', secAnsUp);
    };

    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = async () => {
            const UserName = sessionStorage.getItem('UserName');
            const data = {
                DP: reader.result,
                UserName: UserName,
            };

            const response = await fetch('http://localhost:3000/setDP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const rData = await response.json();

            if (rData.message === 'Profile Pic Has Been Updated') {
                setProfilePic(reader.result);
                displayWarning(rData.message);
            } else {
                displayWarning('Profile Pic Has Not Been Updated');
            }
        };
    };

    const containerStyle = {
        padding: '100px 1px',
        margin: '20px auto',
        borderRadius: '10px',
        boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.9)',
        border: '2px solid rgba(0, 0, 0, 0.9)',
        transition: 'box-shadow 0.3s ease-in-out',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Light black background
        color: '#fff', // White text color
        maxWidth: '500px',
        minHeight: '85vh'
    };

    const alertContainerStyle = {
        padding: '15px',
        margin: '20px auto',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(0, 0, 0, 0.5)',
        transition: 'opacity 0.3s ease-in-out',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Slightly darker black background
        color: '#fff', // White text color
        maxWidth: '600px',
        opacity: showNameUpdate || showPswUpdate || showSecQueUpdate ? 1 : 0,
        visibility: showNameUpdate || showPswUpdate || showSecQueUpdate ? 'visible' : 'hidden',
    };

    const handleMouseOver = (e) => {
        e.currentTarget.style.boxShadow = '4 8px 16px rgba(0, 0, 0, 0.8)';
    };

    const handleMouseOut = (e) => {
        e.currentTarget.style.boxShadow = '8 8px 8px rgba(0, 0, 0, 0.9)';
    };

    return (
        <>
            <div
                className="container"
                id="proCon"
                style={containerStyle}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <div className="" id="Info">
                    <div>
                        <label htmlFor="DUName">User Name : </label>
                        <input type="text" className="inputz form-control" id="DUName" value={sessionStorage.getItem('UserName')} readOnly />
                        <button className="btn btn-warning btn-block mt-2" onClick={() => setShowNameUpdate(true)}>Change</button>
                    </div>
                    <br />
                    <div>
                        <label>Password : </label>
                        <input type="text" className="form-control w-50" value="********" readOnly />
                        <button className="btn btn-warning btn-block mt-2" onClick={() => setShowPswUpdate(true)}>Change</button>
                    </div>
                    <br />
                    <div>
                        <label id="QueSec">{sessionStorage.getItem('Que')}</label>
                        <input id="QueAns" type="text" value={sessionStorage.getItem('Ans')} className="form-control w-50" readOnly />
                        <button className="btn btn-warning btn-block mt-2" onClick={() => setShowSecQueUpdate(true)}>Change</button>
                    </div>
                </div>
            </div>

            {showNameUpdate && (
                <div className="alert-container" id="nameUp" style={alertContainerStyle}>
                    <form id="NameChange" onSubmit={handleNameChange}>
                        <div className="form-group">
                            <label htmlFor="oldName">Old Name : </label>
                            <input className="form-control" type="text" id="oldName" value={sessionStorage.getItem('UserName')} readOnly required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newName">Enter New Name : </label>
                            <input className="form-control" type="text" id="newName" value={newName} onChange={(e) => setNewName(e.target.value)} required />
                        </div>
                        <button className="btn btn-warning btn-block mt-2" id="UpName">Update</button>
                        <button className="btn btn-warning btn-block mt-2" onClick={() => setShowNameUpdate(false)}>Cancel</button>
                    </form>
                </div>
            )}

            {showPswUpdate && (
                <div className="alert-container" id="pswUp" style={alertContainerStyle}>
                    <form id="PswChange" onSubmit={handlePasswordChange}>
                        <div className="form-group">
                            <label htmlFor="oldPsw">Enter Old Password : </label>
                            <input className="form-control" type="password" id="oldPsw" value={oldPsw} onChange={(e) => setOldPsw(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPsw">Enter New Password : </label>
                            <input className="form-control" type="password" id="newPsw" value={newPsw} onChange={(e) => setNewPsw(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPswR">Enter New Password Again : </label>
                            <input className="form-control" type="password" id="newPswR" value={newPswR} onChange={(e) => setNewPswR(e.target.value)} required />
                        </div>
                        <button className="btn btn-warning btn-block mt-2" id="UpPsw">Update</button>
                        <button className="btn btn-warning btn-block mt-2" onClick={() => setShowPswUpdate(false)}>Cancel</button>
                    </form>
                </div>
            )}

            {showSecQueUpdate && (
                <div className="alert-container" id="secQueUp" style={alertContainerStyle}>
                    <form id="SecChange" onSubmit={handleSecQueChange}>
                        <div className="form-group">
                            <label htmlFor="secQue">Security questions</label>
                            <select id="secQue" className="form-control" value={secQue} onChange={(e) => setSecQue(e.target.value)}>
                                <option value="What is your Home Name ?">What is your Home Name ?</option>
                                <option value="What is your Favourite fruit ?">What is your Favourite fruit ?</option>
                                <option value="What is your Favourite Animal ?">What is your Favourite Animal ?</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="secAnsUp">Answer</label>
                            <input className="form-control" type="text" id="secAnsUp" value={secAnsUp} onChange={(e) => setSecAnsUp(e.target.value)} required />
                        </div>
                        <button className="btn btn-warning btn-block mt-2" id="UpSecQue">Update</button>
                        <button className="btn btn-warning btn-block mt-2" onClick={() => setShowSecQueUpdate(false)}>Cancel</button>
                    </form>
                </div>
            )}

            {warning && (
                <div className="alert-container" id="warning" style={{ ...alertContainerStyle, opacity: 1, visibility: 'visible' }}>
                    <p>{warning}</p>
                </div>
            )}
        </>
    );
};

export default Profile;
