const express = require("express");
const router = express.Router();
const Authentications = require("../models/authenticate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;
    try {
        const user = await Authentications.findOne({ email: inputEmail });
        if (!user) {
            res.status(400).json({ errorMessage: "Invalid Email" });
        } else {
            const validPass = await bcrypt.compare(
                inputPassword,
                user.password
            );
            if (!validPass) {
                res.status(400).json({ errorMessage: "Invalid Password" });
            } else {
                const token = jwt.sign(
                    { _id: user._id },
                    process.env.TOKEN_SECRET
                );
                res.header("Access-Control-Expose-Headers", "auth-token");
                res.header("auth-token", token).json({designation: user.designation});
            }
        }
    } catch (err) {
        res.status(400).json({ errorMessage: err });
    }
});

module.exports = router;
