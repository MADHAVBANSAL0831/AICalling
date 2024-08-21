require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const sendMessageRoutes = require('./routes/send-message');
const googleCalendar = require('./routes/calendar');
// const extractedInfo = require('./routes/extractInfo');
const callLogsRoutes = require('./routes/callLogs'); // Add this line


const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

// Routes
app.use('/api', apiRoutes);
app.use('/api/messages', sendMessageRoutes); // Changed base path to avoid conflicts
app.use('/calendar', googleCalendar);
app.use('/imf', callLogsRoutes); // Add this line

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});