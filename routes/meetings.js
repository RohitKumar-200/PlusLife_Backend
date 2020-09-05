const express = require("express");
const router = express.Router();
const Meetings = require("../models/meetings");
const DoctorTokens = require("../models/doctorTokens");
const Authentications = require("../models/authenticate");
const Doctors = require("../models/doctors");
const Patients = require("../models/patients");
const verify = require("./verifyToken");

router.use(verify);

router.get("/doctor", async (req, res) => {
    try {
        let meetingList = [];

        const userDetails = await Authentications.findOne(
            {
                _id: req.user._id,
            },
            { _id: 0, email: 1 }
        );
        const doctorEmail = userDetails.email;
        const meetings = await Meetings.find(
            {
                date: req.query.date,
                doctorEmail: doctorEmail,
            },
            {
                patientEmail: 1,
                tokenNo: 1,
                meetingUrl: 1,
                documents: 1,
            }
        );

        for (const e of meetings) {
            const patientDetails = await Patients.findOne(
                { email: e.patientEmail },
                { _id: 0, name: 1, age: 1, gender: 1 }
            );
            let obj = {
                patientName: patientDetails.name,
                email: e.patientEmail,
                age: patientDetails.age,
                gender: patientDetails.gender,
                tokenNo: e.tokenNo,
                meetingUrl: e.meetingUrl,
                documents: e.documents,
                meetingId: e._id,
            };
            meetingList.push(obj);
        }

        const tokenDetails = await DoctorTokens.findOne(
            {
                date: req.query.date,
                doctorEmail: doctorEmail,
            },
            { _id: 0, currentTokenNo: 1, totalTokens: 1, date: 1, _id: 1 }
        );
        res.json({ tokenDetails: tokenDetails, meetings: meetingList });
    } catch (err) {
        res.status(400).json({ errorMessage: err });
    }
});

router.get("/patient", async (req, res) => {
    try {
        let meetingList = [];

        const userDetails = await Authentications.findOne(
            { _id: req.user._id },
            { email: 1, _id: 0 }
        );
        const patientEmail = userDetails.email;
        let meetings = await Meetings.find(
            { patientEmail: patientEmail },
            {
                doctorEmail: 1,
                date: 1,
                tokenNo: 1,
                date: 1,
                meetingUrl: 1,
            }
        );

        for (let e of meetings) {
            const doctorToken = await DoctorTokens.findOne({
                date: e.date,
                doctorEmail: e.doctorEmail,
            });
            const doctorDetails = await Doctors.findOne(
                { email: e.doctorEmail },
                { name: 1, _id: 0 }
            );
            const obj = {
                doctorName: doctorDetails.name,
                doctorEmail: e.doctorEmail,
                tokenNo: e.tokenNo,
                date: e.date,
                meetingUrl: e.meetingUrl,
                currentTokenNo: doctorToken.currentTokenNo,
                meetingId: e._id,
            };
            meetingList.push(obj);
        }
        res.json(meetingList);
    } catch (err) {
        console.log(err);
        res.status(400).json({ errorMessage: err });
    }
});

module.exports = router;
