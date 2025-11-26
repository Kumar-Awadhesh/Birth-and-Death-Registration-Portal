const bcrypt = require("bcrypt");
const {UserModel} = require("../models/user.model");

const SignupAuth = async(req, res, next) => {
    const {name, phone, email, password, role} = req.body;

    const hash = await bcrypt.hash(password, 7);
    if(!hash) return res.status(401).json({msg: "failed to hash the password!"});

    const newUser = new UserModel({name, phone, email, password:hash, role});
    await newUser.save();
    res.status(200).json({msg: "User Registered Successfully!"});
    next();
}

module.exports = {SignupAuth};