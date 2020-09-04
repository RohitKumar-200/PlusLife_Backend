const mongoose = require("mongoose");

const AuthenticateSchema = new mongoose.Schema({
    email: String,
    password: String,
    designation: String
});

module.exports = mongoose.model("Authentications", AuthenticateSchema);