const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json())

app.use(cors());

const mongoURL = 'mongodb://localhost:27017/foodies'

mongoose.connect(mongoURL).catch((err) => console.log("Error : ", err))

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    UserName: {
        type: String,
        require: true,
        unique: true
    },
    Password: {
        type: String,
        require: true
    },
    securityQuestion: {
        type: String,
        require: true
    },
    securityAnswer: {
        type: String,
        require: true
    }
})

const User = mongoose.model('User', UserSchema)

app.post("/newUser", async (req, res) => {
    var UserName = req.body.name
    var Password = req.body.Password
    var securityQuestion = req.body.Que
    var securityAnswer = req.body.Ans
    // const {UserName, Password, securityQuestion, securityAnswer} = req.body
    try {
        const user = new User({ UserName, Password, securityQuestion, securityAnswer })
        const saveData = await user.save();
        console.log(saveData);
        res.json(saveData);
    } catch (error) {
        console.log(error);
        res.send({ "Message": "There is an Error" });
    }
})

app.post("/login", async (req, res) => {
    var UserName = req.body.name
    var Password = req.body.Password

    try {
        // const user = new User({UserName, Password})
        const findUser = await User.find({ "UserName": UserName });
        if (findUser == 0) {
            res.send({ "Message": "User Not Found" })
        }
        else if (findUser) {
            if (findUser[0].Password === Password) {
                res.send({ "Data": findUser, "Message": "Loged In successfull" })
            } else {
                res.send({ "Message": "Password incorrect" })
            }
        }           
    } catch (error) {
        console.log('Error : ', error);
        res.send({ "Message": "There is an Error" })
    }
})

app.post("/updatePassword", async (req, res)=>{
    var UserName = req.body.uName
    var newPassword = req.body.new_psw

    try{
        const result = await User.updateOne({"UserName":UserName}, {$set: {"Password": newPassword}})
        if(result.matchedCount === 1){
            if(result.modifiedCount === 1){
                res.send({"Message":"Password Updated"})
            }
    
            if(result.modifiedCount === 0){
                res.send({"Message": "New Password Can Not Be Old Password"})
            }
        }

        if(result.matchedCount === 0){
            res.send({"Message" : "User Not Found"})
        }
    }catch (error) {
        res.send({"Message": "There is an Error"})
    }
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});