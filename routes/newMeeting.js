const express = require("express");
const router = express.Router();
const Meetings = require("../models/meetings");
const DoctorTokens = require("../models/doctorTokens");
const Authentications = require('../models/authenticate');
const verify = require("./verifyToken");

router.use(verify);

router.post("/", async (req, res) => {
    const doctorEmail = req.body.doctorEmail;
    const date = req.body.date;
    try {
        const userDetails = await Authentications.findOne({_id: req.user._id});
        const patientEmail = userDetails.email;
        let doctorTokenDetails = await DoctorTokens.findOne({
            doctorEmail: doctorEmail,
            date: date,
        });
        if (!doctorTokenDetails) {
            doctorToken = new DoctorTokens({
                doctorEmail: doctorEmail,
                date: date,
                currentTokenNo: 0,
                totalTokens: 0,
            });
            doctorTokenDetails = await doctorToken.save();
        }
        doctorTokenDetails.totalTokens += 1;
        await DoctorTokens.updateOne(
            { doctorEmail: doctorEmail, date: date },
            doctorTokenDetails
        );
        // Till now doctorTokens is updated
        const newMeeting = new Meetings({
            doctorEmail: doctorEmail,
            patientEmail: patientEmail,
            tokenNo: doctorTokenDetails.totalTokens,
            date: date,
            meetingUrl: req.body.meetingUrl,
            documents: req.body.documents
        });
        const newMeetingDetails = await newMeeting.save();
        res.json({
            doctorTokenDetails: doctorTokenDetails,
            newMeetingDetails: newMeetingDetails,
        });
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
