import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate();

  const [dataG, setDataG] = useState('');
  const [uNameG, setUNameG] = useState('');
  const [showForgetForm, setShowForgetForm] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);

  const sub = async (e) => {
    e.preventDefault();

    const nameElement = document.getElementById('name');
    const pswElement = document.getElementById('psw');

    if (!nameElement || !pswElement) return;

    if (nameElement.value.length < 8 || pswElement.value.length < 8) {
      AlertContainer("Enter Valid Details");
      return;
    }

    const form_data = {
      name: nameElement.value,
      Password: pswElement.value,
    };

    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form_data),
      });

      const rData = await response.json();

      if (rData.Message === "Loged In successfull") {
        sessionStorage.setItem("UserName", nameElement.value);
        sessionStorage.setItem("Que", rData.Data[0].securityQuestion);
        sessionStorage.setItem("Ans", rData.Data[0].securityAnswer);
        navigate("/");
      } else {
        AlertContainer(rData.Message);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const forget = () => {
    setShowForgetForm(true);
  };

  const cancelForget = () => {
    setShowForgetForm(false);
  };

  const AlertContainer = (dData) => {
    const alertContainer = document.querySelector('.alert-container');
    alertContainer.style.display = 'block';
    alertContainer.innerText = dData;
    setTimeout(() => {
      alertContainer.style.display = 'none';
    }, 2000);
  };

  const ForgetSub = async (e) => {
    e.preventDefault();

    const uNameElement = document.getElementById("nameFrg");
    const uNameVal = uNameElement.value;
    setUNameG(uNameVal);

    const data = {
      UserName: uNameVal,
    };

    try {
      const response = await fetch(`http://localhost:3000/forgetPSW`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const rData = await response.json();

      if (rData.Message === "User Not Found") {
        AlertContainer("User Not Found");
      }

      if (rData.Message === "User Found") {
        setShowForgetForm(false);
        setShowAnswerForm(true);
        const queLbl = document.getElementById("queLbl");
        queLbl.innerText = rData.Data.securityQuestion;
        setDataG(rData.Data.securityAnswer);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const checkPsw = async (e) => {
    e.preventDefault();

    const queAnsElement = document.getElementById("QueAns");
    if (queAnsElement.value === dataG) {
      setShowAnswerForm(false);
      setShowUpdatePasswordForm(true);
    } else {
      AlertContainer("Answer Doesn't Match");
    }
  };

  const UpdPsw = async (e) => {
    e.preventDefault();

    const newPswElement = document.getElementById("newPsw");
    const new_psw = newPswElement.value;

    const newPswAGElement = document.getElementById("newPswR");
    const new_psw_AG = newPswAGElement.value;

    if (new_psw !== new_psw_AG) {
      AlertContainer("Both Password Must Be Same");
    } else {
      const data = {
        new_psw: new_psw,
        uName: uNameG,
      };

      try {
        const response = await fetch(`http://localhost:3000/updatePassword`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const rData = await response.json();
        setShowUpdatePasswordForm(false);
        AlertContainer(rData.Message);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  const divert = () => {
    navigate('/Registration');
  };

  return (
    <>
      <div className="container shadow-danger p-4" style={{ maxWidth: '400px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(255, 0, 0, 0.5)', border: '2px solid rgba(255, 0, 0, 0.5)', margin: '10px auto' }}>
        <form onSubmit={sub}>
          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label">Username</label>
            <input className="form-control border-danger" type='text' id='name' autoComplete='username' required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="psw" className="form-label">Password</label>
            <input className="form-control border-danger" type='password' id='psw' autoComplete='current-password' required />
          </div>
          <div className='d-flex justify-content-between mb-4'>
            <button type='button' className="btn btn-danger me-2" onClick={forget}>Forget Password?</button>
            <button type='button' className="btn btn-danger ms-2" onClick={divert} style={{ cursor: "pointer" }}>New User?</button>
          </div>
          <button className="btn btn-danger btn-block">Login</button>
        </form>
      </div>

      {showForgetForm && (
        <form className='forget-container shadow-danger p-4 mt-3' style={{ maxWidth: '400px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(255, 0, 0, 0.5)', border: '2px solid rgba(255, 0, 0, 0.5)', margin: '10px auto' }} onSubmit={ForgetSub} id='frgFrm'>
          <div className="form-group mb-3">
            <label htmlFor="nameFrg" className="form-label">Username</label>
            <input className="form-control border-danger" type='text' id='nameFrg' autoComplete='username' required />
          </div>
          <div className='d-flex justify-content-between mb-3'>
            <button type='button' className="btn btn-danger me-2" onClick={cancelForget}>Cancel</button>
            <button className="btn btn-danger btn-block">Get Question</button>
          </div>
        </form>
      )}

      {showAnswerForm && (
        <form className='forget-container shadow-danger p-4 mt-3' onSubmit={checkPsw} id='ansCheckFrm'>
          <div className="form-group mb-3">
            <label htmlFor="QueAns" id='queLbl' className="form-label"></label>
            <input className="form-control border-danger" type='text' id='QueAns' autoComplete='username' required />
          </div>
          <button className="btn btn-danger btn-block">Change Password</button>
        </form>
      )}

      {showUpdatePasswordForm && (
        <form className='forget-container shadow-danger p-4 mt-3' onSubmit={UpdPsw} id='upPassword'>
          <div className="form-group mb-3">
            <label htmlFor="newPsw" className="form-label">Enter New Password:</label>
            <input className="form-control border-danger" type='password' id='newPsw' autoComplete='Password' required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="newPswR" className="form-label">Enter New Password Again:</label>
            <input className="form-control border-danger" type='password' id='newPswR' autoComplete='newPassword' required />
          </div>
          <button className="btn btn-danger btn-block">Set Password</button>
        </form>
      )}

      <div className="alert-container alert alert-danger" id='uExists' style={{ display: "none" }}>
        <p></p>
      </div>

      <div className="alert-container alert alert-danger" id='vali' style={{ display: "none" }}>
        <p>Enter Valid Details</p>
      </div>
    </>
  );
};

export default Login;