const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    doctorEmail: String,
    patientEmail: String,
    tokenNo: Number,
    date: Number,
    meetingUrl: String,
    documents: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Meetings', meetingSchema);