const express = require("express");
const {SignupAuth} = require("../middlewares/signup.middleware");

const SignupRouter = express.Router();

SignupRouter.post("/signup", SignupAuth, async(req, res) => {
    return res.status(200).json({msg:"User Registered Successfully!"});
})

module.exports = {SignupRouter};