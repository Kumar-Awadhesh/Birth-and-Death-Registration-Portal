const express = require("express");
const {LoginAuth} = require("../middlewares/login.middleware");

const LoginRouter = express.Router();

LoginRouter.post("/login", LoginAuth, async(req, res) => {
    try {
        return res.status(200).json({msg: "Login Successfully!", token:req.token})
    } 
    catch (err) {
        console.log("failed to login!", err);
        return res.status(401).json({msg:"failed to login!"});    
    }
})

module.exports = {LoginRouter};