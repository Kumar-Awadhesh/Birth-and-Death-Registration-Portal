const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {UserModel} = require("../models/user.model");

const LoginAuth = async(req, res, next) => {
   try {
     const {email, password} = req.body;
 
     const existUser = await UserModel.findOne({email});
     if(!existUser) return res.status(404).json({msg:"user not found!"})
 
     const result = bcrypt.compare(existUser.password, password);
     if(!result) return res.status(401).json({msg: "invalid password!"});
 
     req.token = jwt.sign({userid: existUser._id}, "certificate", {expiresIn: "1d"});
     next();
   } 
   catch (err) {
        console.log("login error", err);
   }
}

module.exports = {LoginAuth};