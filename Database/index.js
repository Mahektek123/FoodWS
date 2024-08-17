const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors());

const mongoURL = 'mongodb://localhost:27017/foodies'

mongoose.connect(mongoURL).catch((err) => console.log(err))

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
    },
    Cart: {
        type: []
    }
})

const FoodSchema = new Schema({
    Food_Name: {
        type: String
    },
    Food_ID: {
        type: Number
    },
    Food_Price: {
        type: String
    },
    Food_Type: {
        type: String
    },
    Food_Quantity: {
        type: Number
    },
    Food_Image: {
        type: String
    }
}, { collection: 'foods' })

const OrderSchema = new Schema({
    UserName: {
        type: String,
        require: true
    },
    Food_ID: {
        type: Number,
        require: true
    },
    Payment_Method: {
        type: String,
        require: true
    },
    Time: {
        type: Date,
        require: true
    }
}, {collection: "placedOrder"})

const User = mongoose.model('User', UserSchema)
const Food = mongoose.model("Food", FoodSchema)
const Order = mongoose.model("PlacedOrder", OrderSchema)

app.post("/newUser", async (req, res) => {
    var UserName = req.body.name
    var Password = req.body.Password
    var securityQuestion = req.body.Que
    var securityAnswer = req.body.Ans
    // const {UserName, Password, securityQuestion, securityAnswer} = req.body
    try {
        const user = new User({ UserName, Password, securityQuestion, securityAnswer })
        const saveData = await user.save();
        res.json(saveData);
    } catch (error) {
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
        res.send({ "Message": "There is an Error" })
    }
})

app.post("/updatePassword", async (req, res) => {
    var UserName = req.body.uName
    var newPassword = req.body.new_psw

    try {
        const result = await User.updateOne({ "UserName": UserName }, { $set: { "Password": newPassword } })
        if (result.matchedCount === 1) {
            if (result.modifiedCount === 1) {
                res.send({ "Message": "Password Updated" })
            }

            if (result.modifiedCount === 0) {
                res.send({ "Message": "New Password Can Not Be Old Password" })
            }
        }

        if (result.matchedCount === 0) {
            res.send({ "Message": "User Not Found" })
        }
    } catch (error) {
        res.send({ "Message": "There is an Error" })
    }
})

app.post("/forgetPSW", async (req, res) => {
    var UserName = req.body.UserName
    try {
        const result = await User.findOne({ "UserName": UserName })
        if (result) {
            res.send({ "Data": result, "Message": "User Found" })
        }

        if (!result) {
            res.send({ "Message": "User Not Found" })
        }

    } catch (error) {
        res.send({ "Error": error })
    }

})

app.get("/GetFoods", async (req, res) => {
    try {
        const foods = await Food.find()
        res.send({ "Data": foods, "Message": "Data fetched" })
    } catch (error) {
        res.send({ "Message": "There is an Error" })
    }
})

app.post("/CartCount", async (req, res) => {
    let UserName = req.body.uName
    try {
        const count = await User.find({ UserName: UserName })
        if (count.length === 0) {
            res.send({ "Message": "User Not Found" })
        } else {
            res.send({ "Count": (count[0].Cart).length })
        }
    } catch (error) {
        res.send({ "Error": error })
    }
})

app.post("/AddToCart", async (req, res) => {
    const UserName = req.body.uName
    const food_ID = req.body.food_ID
    try {
        const result = await User.updateOne({ UserName: UserName }, { $push: { Cart: food_ID } })
        if (result.matchedCount === 1) {
            if (result.modifiedCount === 1) {
                res.send({ "Message": "Added" })
            } else {
                res.send({ "Message": "there is an Error" })
            }
        } else {
            res.send({ "Message": "there is an Error" })
        }
    } catch (error) {
        res.send({ "Error": error.message })
    }
})

app.post("/GetCart", async (req, res) => {
    const UserName = req.body.uName
    try {
        const result = await User.find({ UserName: UserName })
        if (result == 0) {
            res.send({ "Message": "There is an Error" })
        } else {
            res.send(result[0].Cart)
        }
    } catch (error) {
        res.send({ "Message": error.message })
    }
})

app.post("/GetCartFoods", async (req, res) => {
    const food_ID = req.body.food_ID
    try {
        const result = await Food.find({ Food_ID: { $in: food_ID } })
        res.send(result)
    } catch (error) {
        res.send({ Error: error.message })
    }
})

app.post("/DecItemByOne", async (req, res) => {
    const UserName = req.body.uName;
    const Food_ID = req.body.food_ID;

    try {
        const result = await User.find({ UserName: UserName });
        if (result.length === 0) {
            return res.send({ "Message": "User not found" });
        }

        let data = result[0].Cart;
        let len = data.length
        let index = data.indexOf(Food_ID);

        if (index === -1) {
            return res.send({ "Message": "Item not found in cart" });
        }

        data.splice(index, 1);

        const result2 = await User.updateOne({ UserName: UserName }, { $set: { Cart: data } });

        if (result2.matchedCount === 1 && result2.modifiedCount === 1) {
            return res.send({ "Message": "Data Updated", "Total_length":(len-1) });
        } else {
            return res.send({ "Message": "There is an Error" });
        }
    } catch (error) {
        return res.send({ "Error": error.message });
    }
})

app.post("/IncItemByOne", async (req,res)=> {
    const UserName = req.body.uName;
    const Food_ID = req.body.food_ID;

    try {
        const result = await User.find({ UserName: UserName });
        if (result.length === 0) {
            return res.send({ "Message": "User not found" });
        }

        let data = result[0].Cart;
        data.push(Food_ID)

        const result2 = await User.updateOne({ UserName: UserName }, { $set: { Cart: data } });

        if (result2.matchedCount === 1 && result2.modifiedCount === 1) {
            return res.send({ "Message": "Data Updated"});
        } else {
            return res.send({ "Message": "There is an Error" });
        }
    } catch (error) {
        return res.send({ "Error": error.message });
    }
})

app.post("/CompleteOrder", async (req, res) => {
    const UserName = req.body.uName
    const Food_ID = req.body.food_ID
    const Payment_Method = req.body.paymentMethod
    const Time = req.body.Time

    try {
        const result = new Order({UserName, Food_ID, Payment_Method, Time})
        const saveData = await result.save()
        res.send({Message: "Order Placed...."})
    } catch (error) {
        res.send({Message: "There is Error"})
    }
})

app.post("/EmptyCart", async (req,res) => {
    const UserName = req.body.uName
    try {
        const emptyCart = await User.updateOne({UserName: UserName}, {$set: {Cart: []}})
        res.send({Message: "Success"})
    } catch (error) {
        res.send({Message: error})
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});