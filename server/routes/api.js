const express = require('express');
const router = express.Router();
const callService = require('../services/callService');
const openaiService = require('../services/openaiService');
const CallLog = require('../models/CallLog');

// New demo transcript route
router.post('/demo-transcript', async (req, res) => {
    try {
        const demoTranscript = req.body.transcript || "My name is Jane Doe, my email is jane.doe@example.com, and my phone number is 987-654-3210.";
        console.log('Demo transcript to be processed:', demoTranscript);

        const extractedInfo = await openaiService.processTranscript(demoTranscript);
        console.log('Extracted info from OpenAI:', extractedInfo);

        const newCallLog = new CallLog({
            createdAt: new Date(),
            endedAt: new Date(),
            status: 'completed',
            customerNumber: 'N/A',
            transcript: demoTranscript,
            extractedInfo: extractedInfo
        });

        await newCallLog.save();
        console.log('Demo call info stored successfully:', newCallLog);

        res.json(newCallLog);
    } catch (error) {
        console.error('Error processing demo transcript:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
