const mongoose = require("mongoose");

const deathFormSchema = new mongoose.Schema({
    name: {type: String, required: true},
    gender: {type: String, required: true},
    aadhaar_number: {type: String},
    date_of_death: {type: Date, required: true},
    dateOfDeath: {type: String, required: true},
    place_of_death: {type: String, required: true},
    name_of_mother: {type: String, required: true},
    name_of_father: {type: String, required: true},
    mother_aadhaar_number: {type: String},
    father_aadhaar_number: {type: String},
    parent_address_at_death: {type: String, required: true},
    parent_permanent_address: {type: String, required: true},
    registration_number: {type: String, required: true},
    date_of_registration: {type: Date, required: true},
    remarks: {type: String},
    date_of_issue: {type: Date},
    updated_on: {type: Date, required: true},
    registration_unit_name: {type: String, required:true},
    registration_unit_code: {type: Number, required:true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}
},{
    versionKey: false,
    toJSON:{virtuals: true}
})

deathFormSchema.virtual("user",{
    ref: "user",
    localField: "userId",
    foreignField: "_id"
})

const DeathFormModel = mongoose.model("death-form", deathFormSchema);
module.exports = {DeathFormModel};