const express = require('express');
const router = express.Router();
const DoctorTokens = require("../models/doctorTokens");
const Meetings = require("../models/meetings");

router.get('/', async (req, res)=>{
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const date = yesterday.getDate();

    await DoctorTokens.deleteMany({ date: date });
    await Meetings.deleteMany({ date: date});

    res.status(200).send();
});

module.exports = router;