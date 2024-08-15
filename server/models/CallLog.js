const mongoose = require('mongoose');

const CallLogSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    endedAt: Date,
    status: String,
    customerNumber: String,
    transcript: String,
    extractedInfo: {
        name: String,
        email: String,
        phone: String
    }
});

module.exports = mongoose.model('CallLog', CallLogSchema, 'userinfo');
