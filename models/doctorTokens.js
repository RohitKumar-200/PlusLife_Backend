const mongoose = require('mongoose');

const DoctorTokensSchema = mongoose.Schema({
    doctorEmail: String,
    date: Number,
    currentTokenNo: Number,
    totalTokens: Number
});

module.exports = mongoose.model('doctorTokens',DoctorTokensSchema);