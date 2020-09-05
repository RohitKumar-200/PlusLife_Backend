const express = require("express");
const router = express.Router();
const Meetings = require("../models/meetings");
const verify = require("./verifyToken");

router.use(verify);

router.delete("/", async (req, res) => {
    try {
        const meetingId = req.body.meetingId;
        const removed = await Meetings.deleteOne({ _id: meetingId });
        res.json(removed);
    } catch (err) {
        res.status(400).json({ errorMessage: err });
    }
});

module.exports = router;
