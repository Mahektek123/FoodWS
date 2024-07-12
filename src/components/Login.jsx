import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();

  const [dataG, setDataG] = useState('')
  const [uNameG, setUNameG] = useState('')

  const sub = async (e) => {
    e.preventDefault();

    const nameElement = document.getElementById('name')
    const pswElement = document.getElementById('psw')

    if (!nameElement || !pswElement) return;

    if (nameElement.value.length < 8 || pswElement.value.length < 8) {
      const alertContainer = document.querySelector('#uExists')
      alertContainer.style.display = 'block';

      setTimeout(() => {
        alertContainer.style.display = 'none';
      }, 3000);
      return;
    }

    const form_data = {
      name: nameElement.value,
      Password: pswElement.value
    };

    const response = await fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form_data)
    });

    const rData = await response.json();
    // console.log(rData)

    if (rData.Message === "Loged In successfull") {
      sessionStorage.setItem("UserName", nameElement.value);
      sessionStorage.setItem("Que", rData.Data[0].securityQuestion);
      sessionStorage.setItem("Ans", rData.Data[0].securityAnswer);
      navigate("/")
    } else {
      AlertContainer(rData.Message)
    }
  };

  const forget = () => {
    const alertContainer = document.querySelector('#frgFrm')
    alertContainer.style.display = 'block';
  };

  const AlertContainer = (dData) => {
    const alertContainer = document.querySelector('.alert-container')
    alertContainer.style.display = 'block';
    alertContainer.innerText = dData;
    setTimeout(() => {
      alertContainer.style.display = 'none';
    }, 2000);
  };

  const ForgetSub = async (e) => {
    e.preventDefault();

    const uNameElement = document.getElementById("nameFrg")
    const uNameVal = uNameElement.value;
    setUNameG(uNameVal)

    const data = {
      UserName: uNameVal
    };

    const response = await fetch(`http://localhost:3000/forgetPSW`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const rData = await response.json();

    if (rData.Message === "User Not Found") {
      AlertContainer("User Not Found");
    }

    if (rData.Message === "User Found") {
      const frgFrm = document.getElementById("frgFrm")
      frgFrm.style.display = "none";
      const ansCheckFrm = document.getElementById("ansCheckFrm")
      ansCheckFrm.style.display = "block";
      const queLbl = document.getElementById("queLbl")
      queLbl.innerText = rData.Data.securityQuestion;
      setDataG(rData.Data.securityAnswer)
    }
  };

  const checkPsw = (e) => {
    e.preventDefault();

    const queAnsElement = document.getElementById("QueAns")
    if (queAnsElement.value === dataG) {
      const upPsw = document.getElementById("upPassword")
      upPsw.style.display = "block";
      const ansCheckFrm = document.getElementById("ansCheckFrm")
      ansCheckFrm.style.display = "none";
    } else {
      const alertContainer = document.querySelector('.alert-container')
      alertContainer.style.display = 'block';
      alertContainer.innerText = "Answer Doesn't Match";
      setTimeout(() => {
        alertContainer.style.display = 'none';
      }, 2000);
    }
  };

  const UpdPsw = async (e) => {
    e.preventDefault();

    const newPswElement = document.getElementById("newPsw")
    const new_psw = newPswElement.value;

    const newPswAGElement = document.getElementById("newPswR")
    const new_psw_AG = newPswAGElement.value;

    if (new_psw !== new_psw_AG) {
      AlertContainer("Both Password Must Be Same")
    } else {



      const data = {
        new_psw: new_psw,
        uName: uNameG
      };

      const response = await fetch(`http://localhost:3000/updatePassword`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const rData = await response.json();

      const upPassword = document.getElementById("upPassword");
      upPassword.style.display = "none";

      AlertContainer(rData.Message);
    }
  };

  const divert = () => {
    console.log("first")
    navigate('/Registration')
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="text-center">Log In</h3>
              </div>
              <div className="card-body">
                <form onSubmit={sub}>
                  <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input className="form-control" type='text' id='name' autoComplete='username' required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="psw">Password</label>
                    <input className="form-control" type='password' id='psw' autoComplete='current-password' required />
                  </div>
                  <div className='d-flex justify-content-between'>
                    <button type='button' className="btn btn-link p-0" onClick={forget}>Forget Password?</button>
                    <button type='button' className="btn btn-link p-0" onClick={divert} style={{ cursor: "pointer" }}>New User?</button>
                  </div>
                  <button className="btn btn-primary btn-block" id="btn">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form className='forget-container' onSubmit={ForgetSub} style={{ display: "none" }} id='frgFrm'>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input className="form-control" type='text' id='nameFrg' autoComplete='username' required />
        </div>
        <button className="btn btn-primary btn-block" id="btnFrg">Get Question</button>
      </form>

      <form className='forget-container' onSubmit={checkPsw} style={{ display: "none" }} id='ansCheckFrm'>
        <div className="form-group">
          <label htmlFor="name" id='queLbl'></label>
          <input className="form-control" type='text' id='QueAns' autoComplete='username' required />
        </div>
        <button className="btn btn-primary btn-block" id="cngPsw">Change Password</button>
      </form>

      <form className='forget-container' onSubmit={UpdPsw} style={{ display: "none" }} id='upPassword'>
        <div className="form-group">
          <label htmlFor="newPsw">Enter New Password:</label>
          <input className="form-control" type='password' id='newPsw' autoComplete='Password' required />
        </div>
        <div className="form-group">
          <label htmlFor="newPswR">Enter New Password Again:</label>
          <input className="form-control" type='password' id='newPswR' autoComplete='newPassword' required />
        </div>
        <button className="btn btn-primary btn-block" id="UpPsw">Set Password</button>
      </form>

      <div className="alert-container" id='uExists' style={{ display: "none" }}>
        <p></p>
      </div>

      <div className="alert-container" id='vali' style={{ display: "none" }}>
        <p>Enter Valid Details</p>
      </div>
    </>
  )
}

export default Login