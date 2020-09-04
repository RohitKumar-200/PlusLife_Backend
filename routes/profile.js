const express = require('express');
const router = express.Router();
const Authentications = require('../models/authenticate');
const Doctors = require("../models/doctors");
const Patients = require("../models/patients");

router.get('/', async (req, res)=>{
    try{
        const email = req.query.email;
        const designationjson = await Authentications.findOne({email: email}, {_id:0, designation: 1});
        if(designationjson){
            const designation = designationjson.designation;
            if(designation == 'patient') {
                const patientDetails = await Patients.findOne({email: email});
                res.json(patientDetails);
            } else if(designation == 'doctor') {
                const doctorDetails = await Doctors.findOne({email: email});
                res.json(doctorDetails);
            }
        } else {
            throw new Error ("Invalid Email");
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({"errorMessage": err});
    }
});

module.exports = router;