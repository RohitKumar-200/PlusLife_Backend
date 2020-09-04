const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: String,
    phoneNo: Number,
    altPhoneNo: Number,
    email: String,
    gender: String,
    age: Number,
    address: String,
    degree: String,
    specialization: String,
    workExperience: Number,
    about: String,
    fees: Number,
    emergencyFees: Number,
    timings: String,
    weekDays: String,
    clinicPhoto: {
        type: String,
        default: ''
    },
    profilePic: {
        type: String,
        default: ''
    },
    certificates: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model("Doctors",doctorSchema);