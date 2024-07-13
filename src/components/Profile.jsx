import React from 'react'
import DP from './ProfilePic.png'

const Profile = () => {

    let PP
    const displayPP = async () => {

        const user = sessionStorage.getItem("UserName")
        let data = {
            UserName: user
        }

        const response = await fetch(`http://localhost:3000/ImgBack`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const rData = await response.json()

        // console.log(rData.PP);
        if (rData.PP) {
            PP = rData.PP
        }

        if (sessionStorage.getItem("UserName")) {
            document.getElementById("profiPic").innerHTML = `
            <a class="nav-link" href="/Profile">
        <img src=${PP ? PP : DP} alt="Profile Picture" class="rounded-circle mr-2" style=" width: 50px; height: 50px" />
        </a>`

        document.getElementById("ProfileImg").src = PP ? PP : DP

        }
    }

    const displayWarning = (warning) => {
        document.getElementById("warning").innerHTML = `<p>${warning}</p>`
        document.getElementById("warning").style.display = "block"

        setTimeout(() => {
            document.getElementById("warning").style.display = "none"
        }, 2000);
    }

    const nameChannge = () => {
        let nameUp = document.getElementById("nameUp")
        nameUp.style.display = "block"
    }

    const pswCahnge = () => {
        let pswUp = document.getElementById("pswUp")
        pswUp.style.display = "block"
    }

    const secQueChange = () => {
        let secQueUp = document.getElementById("secQueUp")
        secQueUp.style.display = "block"
    }

    const newSecSet = async (e) => {
        e.preventDefault()

        let UserName = sessionStorage.getItem("UserName")
        let secQue = document.getElementById("secQue")?.value
        let secAnsUp = document.getElementById("secAnsUp")?.value

        const data = {
            UserName: UserName,
            secQue: secQue,
            secAnsUp: secAnsUp
        }

        const response = await fetch(`http://localhost:3000/UpSec`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        let rData = await response.json()
        displayWarning(rData.message)
        document.getElementById("secQueUp").style.display = "none"
        sessionStorage.setItem("Que", secQue)
        sessionStorage.setItem("Ans", secAnsUp)
        document.getElementById("QueSec").innerText = secQue
        document.getElementById("QueAns").value = secAnsUp


    }

    const newPswSet = async (e) => {
        e.preventDefault()
        let oldPsw = document.getElementById("oldPsw")?.value
        let newPsw = document.getElementById("newPsw")?.value
        let newPswR = document.getElementById("newPswR")?.value

        if (oldPsw === newPsw || newPsw !== newPswR) {
            displayWarning("Enter Valid Passwords")
        } else {
            const data = {
                UserName: sessionStorage.getItem("UserName"),
                oldPsw: oldPsw,
                newPsw: newPsw
            }

            let response = await fetch(`http://localhost:3000/UpPsw`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            let rData = await response.json()
            displayWarning(rData.message)
            document.getElementById("pswUp").style.display = "none"
        }
    }

    const newNameSet = async (e) => {
        e.preventDefault()
        let newName = document.getElementById("newName")?.value

        if (sessionStorage.getItem("UserName") === newName) {
            displayWarning("Old UserName And New UserName can not be Same")
        } else {
            const data = {
                oldName: sessionStorage.getItem("UserName"),
                newName: newName
            }

            let response = await fetch(`http://localhost:3000/UpName`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            let rData = await response.json()

            if (rData.message === "User Name Has Been Updated") {
                sessionStorage.setItem("UserName", newName)
                document.getElementById("DUName").value = newName
                document.getElementById("oldName").value = newName
                displayWarning(rData.message)
                document.getElementById("nameUp").style.display = "none"

            }
        }
    }
    
    let PostImg = () => {

        const imgPro = document.getElementById("imgPro")
        var reader = new FileReader()

        reader.readAsDataURL(imgPro.files[0])

        reader.onload = async () => {

            const UserName = sessionStorage.getItem("UserName")
            const data = {
                DP: reader.result,
                UserName: UserName
            }

            let response = await fetch(`http://localhost:3000/setDP`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            let rData = await response.json()

            if(rData.message === "Profile Pic Has Been Updated"){
                displayPP()
                displayWarning(rData.message)
            } else {
                displayWarning("Profile Pic Has Not Been Updated")
            }
        }
    }

    return (
        <>
            <div className="container" id='proCon'>
                {/* <div className='' id='ProfilePic'>
                    <div className="card-header d-flex flex-column align-items-center justify-content-center h-100" >
                        <img src={DP} alt="DP" id='ProfileImg' className="rounded-circle mr-2" style={{ width: "70%", height: "70%"}}/>
                        <div style={{textAlign: "center"}}>
                            <button className='btn btn-primary btn-block mt-2' onClick={setDP}>Change</button>
                        </div>
                    </div>
                </div> */}

                <div style={{ display: "none" }}>
                    <input className='form-control w-70' onChange={PostImg} type="file" id='imgPro' name="image" accept="image/*" required />
                </div>
                <div style={{ width: "3px" }}></div>
                <div className='' id='Info'>
                    <div>
                        <label htmlFor="DUName">User Name : </label>
                        <input type="text" className='form-control w-50' id='DUName' value={sessionStorage.getItem("UserName")} readOnly onFocus={(e) => e.target.blur()} />
                        <button className='btn btn-primary btn-block mt-2' onClick={nameChannge}>Change</button>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="DUName">Password : </label>
                        <input type="text" className='form-control w-50' value="********" readOnly onFocus={(e) => e.target.blur()} />
                        <button className='btn btn-primary btn-block mt-2' onClick={pswCahnge}>Change</button>
                    </div>
                    <br />
                    <div>
                        <label id='QueSec'>{sessionStorage.getItem("Que")}</label>
                        <input id='QueAns' type="text" value={sessionStorage.getItem("Ans")} className='form-control w-50' readOnly onFocus={(e) => e.target.blur()} />
                        <button className='btn btn-primary btn-block mt-2' onClick={secQueChange}>Change</button>
                    </div>
                </div>


            </div>

            <div className="alert-container" id='nameUp' style={{ display: "none" }}>
                <form id='NameChange' onSubmit={newNameSet}>
                    <div className="form-group">
                        <label htmlFor="oldName">Old Name : </label>
                        <input className="form-control" type='text' id='oldName' value={sessionStorage.getItem("UserName")} autoComplete='Name' readOnly required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newName">Enter New Name : </label>
                        <input className="form-control" type='text' id='newName' autoComplete='new Name' required />
                    </div>
                    <button className="btn btn-primary btn-block mt-2" id="UpName">Update</button>
                </form>
            </div>


            <div className="alert-container" id='pswUp' style={{ display: "none" }}>
                <form id='PswChange' onSubmit={newPswSet}>
                    <div className="form-group">
                        <label htmlFor="oldName">Enter Old Password : </label>
                        <input className="form-control" type="password" id='oldPsw' autoComplete='Password' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newName">Enter New Password : </label>
                        <input className="form-control" type='password' id='newPsw' autoComplete='new Password' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newName">Enter New Password Again : </label>
                        <input className="form-control" type='password' id='newPswR' autoComplete='new Password' required />
                    </div>
                    <button className="btn btn-primary btn-block mt-2" id="UpPsw">Update</button>
                </form>
            </div>


            <div className="alert-container" id='secQueUp' style={{ display: "none" }}>
                <form id='SecChange' onSubmit={newSecSet}>
                    <div className="form-group">
                        <label htmlFor="secQue">Security questions</label>
                        <select id="secQue" className="form-control">
                            <option value="What is your Home Name ?">What is your Home Name ?</option>
                            <option value="What is your Favourite fruit ?">What is your Favourite fruit ?</option>
                            <option value="What is your Favourite Animal ?">What is your Favourite Animal ?</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="secAnsUp">Answer</label>
                        <input className="form-control" type='text' id='secAnsUp' autoComplete='current-password' required />
                    </div>
                    <button className="btn btn-primary btn-block mt-2" id="UpSecQue">Update</button>
                </form>
            </div>

            <div className="alert-container" id='warning' style={{ display: "none" }}>

            </div>

        </>
    )
}

export default Profile