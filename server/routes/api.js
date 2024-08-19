const express = require('express');
const router = express.Router();
const callService = require('../services/callService');
const openaiService = require('../services/openaiService');
const CallLog = require('../models/CallLog');

// New demo transcript route
router.post('/demo-transcript', async (req, res) => {
    try {
        const demoTranscript = req.body.transcript;
        console.log(demoTranscript);
        
        

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
        // console.log('Demo call info stored successfully:', newCallLog);

        res.json(extractedInfo);
    } catch (error) {
        // console.error('Error processing demo transcript:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
