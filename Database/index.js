const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json())

app.use(cors());

const mongoURL = 'mongodb://localhost:27017/foodies'

mongoose.connect(mongoURL).catch((err)=>console.log("Error : ", err))

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    UserName: {
        type: String,
        require: true
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

const User = mongoose.model('userData', UserSchema)

app.post("/newUser", async (req,res)=> {
    let UserName = req.body.name
    let Password = req.body.Password
    let securityQuestion = req.body.Que
    let securityAnswer = req.body.Ans
    try {
        const user = new User({UserName, Password, securityQuestion, securityAnswer})
        const saveData = await user.save();
        console.log(saveData);
        res.json(saveData);
    } catch (error) {
        res.send({"Message":"There is an Error"});
    }
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});