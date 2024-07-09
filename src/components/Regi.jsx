import React from 'react'
import { useNavigate } from 'react-router-dom';

const Regi = () => {
    const navigate = useNavigate();
    async function sub(e) {
        e.preventDefault();

        const nameElement = document.getElementById('name')
        const pswElement = document.getElementById('psw')
        const secAnsElement = document.getElementById('secAns')
        const secQueElement = document.getElementById('secQue')

        if (
            nameElement?.value.length < 8 || 
            pswElement?.value.length < 8 || 
            secAnsElement?.value.length === 0
        ) {
            const alertContainer = document.querySelector('#vali')
            alertContainer.style.display = 'block';

            setTimeout(() => {
                alertContainer.style.display = 'none';
            }, 3000);

            return;
        } 

        const form_data = {
            name: nameElement.value,
            Password: pswElement.value,
            Que: secQueElement.value,
            Ans: secAnsElement.value
        };
        console.log(form_data)
        try {
            const response = await fetch(`http://localhost:3000/newUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form_data)
            });
            const rData = await response.json();
            console.log(rData)
            if (!rData.Message) {    
                sessionStorage.setItem("UserName", nameElement.value);
                sessionStorage.setItem("Que", secQueElement.value);
                sessionStorage.setItem("Ans", secAnsElement.value);
                navigate('/')
                let logOut = document.getElementsByClassName("afterLogin")
                logOut.style.display = ""
                console.log("User insert")
            }

            if (rData.Message === "There is an Error") {
                const alertContainer2 = document.querySelector('#uExists')
                alertContainer2.style.display = 'block';

                setTimeout(() => {
                    alertContainer2.style.display = 'none';
                }, 3000);
            }
        }catch(err){
            console.log("Error : ", err)
        }
    } 

    const divert = () => {
        navigate("/Login")
    };

  return (
    <>
         <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Social Point - Registration</h3>
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
                                    <div className="form-group">
                                        <label htmlFor="secQue">Security questions</label>
                                        <select id="secQue" className="form-control">
                                            <option value="What is your Home Name ?">What is your Home Name ?</option>
                                            <option value="What is your Favourite fruit ?">What is your Favourite fruit ?</option>
                                            <option value="What is your Favourite Animal ?">What is your Favourite Animal ?</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="secAns">Answer</label>
                                        <input className="form-control" type='text' id='secAns' autoComplete='current-password' required />
                                    </div>
                                    <span onClick={divert} style={{ cursor: 'pointer', color: 'blue' }}>Already Have An Account?</span>
                                    <br />
                                    <center>
                                        <button id="btn" className="btn btn-primary btn-block">Register</button>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="alert-container" id='uExists' style={{ display: "none" }}>
                    <p>User already Exists</p>
                </div>
                <div className="alert-container" id='vali' style={{ display: "none" }}>
                    <p>Enter Valid Details</p>
                </div>
            </div>
    </>
  )
}

export default Regi