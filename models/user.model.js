const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill valid email"]},
    password: {type: String, required: true},
    role: {type: String, enum:["user", "admin"], default: "user", required: true},
},{
    versionKey:false,
    toJSON:{virtuals:true}
})

userSchema.virtual("user",{
    ref: "form",
    localField: "_id",
    foreignField: "userId"
})

const UserModel = mongoose.model("user", userSchema);
module.exports = {UserModel}