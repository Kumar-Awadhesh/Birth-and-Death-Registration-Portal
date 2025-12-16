const express = require("express");
const jwt = require("jsonwebtoken");
const {UserModel} = require("../models/user.model");
const {BirthFormModel} = require("../models/birthForm.model");
const {DeathFormModel} = require("../models/deathForm.model");

const FormRouter = express.Router();

FormRouter.post("/birthForm", async(req, res) => {

    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if(!token) return res.status(401).json({msg:"please login!"})

        const decoded = jwt.verify(token, "certificate");
        if(!decoded) return req.status(401).json({msg:"invalid token!"});
    
        const userId = decoded.userid;
    
        const {name,gender,aadhaar_number,date_of_birth,dateOfBirth,place_of_birth,
            name_of_mother,name_of_father,mother_aadhaar_number,father_aadhaar_number,
            parent_address_at_birth,parent_permanent_address,registration_number,
            date_of_registration,remarks,date_of_issue,updated_on
        } = req.body;
    
        const existUser = await UserModel.findById(userId);
        if(!existUser) return res.status(404).json({msg:"User not found!"});
    
        if(existUser.role === "user" || existUser.role === "admin"){
            if(aadhaar_number !== undefined){
                console.log(aadhaar_number)
                const isRegistered = await BirthFormModel.findOne({aadhaar_number})
                if(isRegistered) return res.status(200).json({msg:"aadhaar number already registered!", aadhaar_number})
            }
            else if(mother_aadhaar_number !== undefined){
                const isRegistered = await BirthFormModel.findOne({mother_aadhaar_number})
                if(isRegistered) return res.status(200).json({msg:"mother aadhaar number already registered!", mother_aadhaar_number})
            }
            else if(father_aadhaar_number !== undefined){
                const isRegistered = await BirthFormModel.findOne({father_aadhaar_number})
                if(isRegistered) return res.status(200).json({msg:"father aadhaar number already registered!", father_aadhaar_number})
            }
            
            const newBirthForm = new BirthFormModel({name,gender,aadhaar_number,date_of_birth,dateOfBirth,place_of_birth,
            name_of_mother,name_of_father,mother_aadhaar_number,father_aadhaar_number,
            parent_address_at_birth,parent_permanent_address,registration_number,
            date_of_registration,remarks,date_of_issue,updated_on,userId:userId});
    
            await newBirthForm.save();
            return res.status(200).json({msg:"Birth form submitted Successfully!"})
        } 
        else return res.status(401).json({msg:"You are not authorized!"}); 
    } 
    catch (err) {
        console.log("birth form error", err);
        return res.status(401).json({msg:"failed to submit the birth form!", error: err})
    }
})

FormRouter.get("/getBirthForm", async(req,res) => {
    try{
        
        const birthForm = await BirthFormModel.find();
        return res.status(200).json({msg:birthForm});
    }
    catch (err) {
        console.log("error in getting form", err);
        return res.status(404).json({msg:"failed to get the form!",err})
    }
})

FormRouter.post("/deathForm", async(req, res) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if(!token) return res.status(401).json({msg:"please login!"})

        const decoded = jwt.verify(token, "certificate");
        if(!decoded) return req.status(401).json({msg:"invalid token!"});
    
        const userId = decoded.userid;
    
        const {name,gender,aadhaar_number,date_of_death,dateOfDeath,place_of_death,
            name_of_mother,name_of_father,mother_aadhaar_number,father_aadhaar_number,
            parent_address_at_death,parent_permanent_address,registration_number,
            date_of_registration,remarks,date_of_issue,updated_on
        } = req.body;
    
        const existUser = await UserModel.findById(userId);
        if(!existUser) return res.status(404).json({msg:"User not found!"});
    
        if(existUser.role === "user" || existUser.role === "admin"){
            if(aadhaar_number !== undefined){
                const isRegistered = await DeathFormModel.findOne({aadhaar_number})
                if(isRegistered) return res.status(200).json({msg:"aadhaar number already registered!", aadhaar_number})
            }
            else if(mother_aadhaar_number !== undefined){
                const isRegistered = await DeathFormModel.findOne({mother_aadhaar_number})
                if(isRegistered) return res.status(200).json({msg:"mother aadhaar number already registered!", mother_aadhaar_number})
            }
            else if(father_aadhaar_number !== undefined){
                const isRegistered = await DeathFormModel.findOne({father_aadhaar_number})
                if(isRegistered) return res.status(200).json({msg:"father aadhaar number already registered!", father_aadhaar_number})
            }
            
            const newDeathForm = new DeathFormModel({name,gender,aadhaar_number,date_of_death,dateOfDeath,place_of_death,
            name_of_mother,name_of_father,mother_aadhaar_number,father_aadhaar_number,
            parent_address_at_death,parent_permanent_address,registration_number,
            date_of_registration,remarks,date_of_issue,updated_on,registration_unit_name,registration_unit_code,userId:userId});
    
            await newDeathForm.save();
            return res.status(200).json({msg:"Death form submitted Successfully!"})
        }   
    } 
    catch (err) {
        console.log("death form error", err);
        return res.status(401).json({msg:"failed to submit the death form!",error:err})
    }
})

FormRouter.get("/getDeathForm", async(req,res) => {
    try {
        const deathForm = await DeathFormModel.find();
        return res.status(200).json({msg:deathForm});
    } 
    catch (err) {
        console.log("error in getting form", err);
        return res.status(404).json({msg:"failed to get the form!"})
    }
})

module.exports = {FormRouter}