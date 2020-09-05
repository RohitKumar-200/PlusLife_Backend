const express = require("express");
const router = express.Router();
const DoctorTokens = require("../models/doctorTokens");
const verify = require("./verifyToken");

router.use(verify);

router.post("/", async (req, res) => {
    try {
        const removedToken = await DoctorTokens.updateOne(
            { _id: req.body.doctorToken },
            { currentTokenNo: req.body.newCurrentToken }
        );
        res.json(removedToken);
    } catch (err) {
        res.status(400).json({ errorMessage: err });
    }
});

module.exports = router;
