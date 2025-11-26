const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {FormRouter} = require("./routes/form.router");
const {LoginRouter} = require("./routes/login.router");
const {SignupRouter} = require("./routes/signup.router");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/form", FormRouter);
app.use("/loginAuth", LoginRouter);
app.use("/signupAuth", SignupRouter);

app.listen(3010, async() => {
    try {
        await mongoose.connect("mongodb+srv://kumaravi0506:Gabriel%40511@myfirst-cluster.nvsvh.mongodb.net/birth-and-death-data?appName=MyFirst-Cluster");
        console.log("connected to database!");
        console.log("server running at http://localhost:3010")
    } 
    catch (err) {
        console.log("failed to run server:", err)
        return res.status(500).json({msg:"failed to run server!"})
    }
})