const express = require("express");
const router = express.Router();
const Doctors = require("../models/doctors");
const Patients = require("../models/patients");
const Authentications = require("../models/authenticate");
const bcrypt = require('bcryptjs');

// Doctor Account Registration
router.post("/doctor", async (req, res) => {
    const newDoctor = new Doctors({
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        altPhoneNo: req.body.altPhoneNo,
        email: req.body.email,
        gender: req.body.gender,
        age: req.body.age,
        address: req.body.address,
        degree: req.body.degree,
        specialization: req.body.specialization,
        workExperience: req.body.workExperience,
        about: req.body.about,
        fees: req.body.fees,
        emergencyFees: req.body.emergencyFees,
        timings: req.body.timings,
        weekDays: req.body.weekDays,
        clinicPhoto: req.body.clinicPhoto,
        profilePic: req.body.profilePic,
        certificates: req.body.certificates,
    });

    //Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newAccount = new Authentications({
        email: req.body.email,
        password: hashedPassword,
        designation: "doctor",
    });

    try {
        const user = await Authentications.findOne({ email: req.body.email });
        if (user) {
            res.status(400).json({ message: "email already taken" });
        } else {
            const doctor = await newDoctor.save();
            const login = await newAccount.save();
            res.json({ doctorDetails: doctor, loginDetails: login });
        }
    } catch (err) {
        res.json({ message: err });
    }
});

// Patient Account Registration
router.post("/patient", async (req, res) => {
    const newPatient = new Patients({
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        altPhoneNo: req.body.altPhoneNo,
        email: req.body.email,
        gender: req.body.gender,
        age: req.body.age,
        address: req.body.address,
        profilePic: req.body.profilePic
    });

    //Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newAccount = new Authentications({
        email: req.body.email,
        password: hashedPassword,
        designation: "patient",
    });

    try {
        const user = await Authentications.findOne({ email: req.body.email });
        if (user) {
            res.status(400).json({ message: "email already taken" });
        } else {
            const doctor = await newPatient.save();
            const login = await newAccount.save();
            res.json({ doctorDetails: doctor, loginDetails: login });
        }
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
