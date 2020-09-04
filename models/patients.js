const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: String,
    phoneNo: Number,
    altPhoneNo: Number,
    email: String,
    gender: String,
    age: Number,
    address: String,
    profilePic: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model("Patients",patientSchema);