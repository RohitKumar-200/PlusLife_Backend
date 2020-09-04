const express = require("express");
const router = express.Router();
const Authentications = require("../models/authenticate");
const Doctors = require("../models/doctors");
const Patients = require("../models/patients");
const verify = require("./verifyToken");

router.use(verify);

router.get("/", async (req, res) => {
    try {
        const userDetails = await Authentications.findOne(
            {
                _id: req.user._id,
            },
            { _id: 0, email: 1, designation: 1 }
        );
        const email = userDetails.email;
        const designation = userDetails.designation;
        if (designation == "patient") {
            const patientDetails = await Patients.findOne({ email: email });
            res.json(patientDetails);
        } else if (designation == "doctor") {
            const doctorDetails = await Doctors.findOne({ email: email });
            res.json(doctorDetails);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ errorMessage: err });
    }
});

module.exports = router;
