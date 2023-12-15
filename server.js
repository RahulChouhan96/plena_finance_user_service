const express = require("express");
const mongoose = require("mongoose");

const User = require("./userModel");


let app = express();


app.use(express.json());


async function validateIsUserAdmin(userId) {
    const reqUserData = await User.findById(userId);
    return (reqUserData.userType == "ADMIN");
}


app.post("/user/admin/user", async (req, res) => {
    try {
        const validateReqUser = await validateIsUserAdmin(req.body.reqUserId);
        if (!validateReqUser) {
            res.status(404).json({ "message": "Not allowed!" });
            return;
        }

        await new User(req.body.userData).save();
        res.status(200).json({ "message": "User created successfully!" });
    }
    catch(e) {
        console.log("Error = ", e);
        res.status(500).json({ "message": "Some error occured = " + e });
    }
});


app.delete("/user/admin/user", async (req, res) => {
    const validateReqUser = await validateIsUserAdmin(req.body.reqUserId);
    if (!validateReqUser) {
        res.status(404).json({ "message": "Not allowed!" });
        return;
    }

    try {
        await User.findByIdAndDelete(req.body.userData.userId);
        res.status(200).json({ "message": "User deleted successfully!" });
    }
    catch(e) {
        console.log("Error = ", e);
        res.status(500).json({ "message": "Some error occured = " + e });
    }
});


app.get("/user", async (req, res) => {
    try {
        const userData = await User.findById(req.query.userId);
        res.status(200).json(userData);
    }
    catch(e) {
        console.log("Error = ", e);
        res.status(500).json({ "message": "Some error occured = " + e });
    }
});


app.get("/user/validate/admin", async (req, res) => {
    try {
        const validateUser = await validateIsUserAdmin(req.query.userId);
        return validateUser;
    }
    catch(e) {
        console.log("Error = ", e);
        res.status(500).json({ "message": "Some error occured = " + e });
    }
});


mongoose.connect("mongodb://127.0.0.1:27017/plena_finance", {
    useNewUrlParser:true
});

let conn = mongoose.connection;
conn.on('error', (error) => {
    console.log("Error while connecting with MongoDB!", error);
});

conn.once('open', () => {
    console.log("MongoDB Connected successfully!");
});


app.listen(8080, () => {
    console.log("Server running at 8080!");
})

module.exports.validateIsUserAdmin = validateIsUserAdmin;
module.exports.app = app;