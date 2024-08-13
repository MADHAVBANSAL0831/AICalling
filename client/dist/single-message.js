const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors'); // Import the cors package

const app = express();

// Use CORS middleware
app.use(cors());

app.use(bodyParser.json());

// Your Twilio credentials (should be stored securely, e.g., using environment variables)
const accountSid = 'AC3384b9969d736016bc322ab80d84e2e2';
const authToken = 'c65bc27de598e662e6977bfa55e8e76f'; // Ensure this is securely stored and not hardcoded in production.
const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const { toNumber, message } = req.body;

  client.messages
    .create({
      body: message,
      from: '+18552974391', // Your Twilio phone number
      to: toNumber,
    })
    .then((message) => {
      console.log(`Message sent successfully. Message SID: ${message.sid}`);
      res.status(200).send({ success: true, sid: message.sid });
    })
    .catch((error) => {
      console.error(`Failed to send message: ${error.message}`);
      res.status(500).send({ success: false, error: error.message });
    });
});




const fs = require('fs');
const csv = require('csv-parser');
const sgMail = require('@sendgrid/mail');

// Set SendGrid API Key
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

// Function to send email
function sendEmail(to, subject, text) {
  const msg = {
    to: to,
    from: 'your-email@example.com', // Your verified sender email address
    subject: subject,
    text: text,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log(`Email sent to ${to}`);
    })
    .catch((error) => {
      console.error(`Error sending email to ${to}:`, error);
    });
}

// Endpoint to handle bulk email sending from CSV
app.post('/send-bulk-emails', (req, res) => {
  const results = [];

  fs.createReadStream('path_to_your_csv_file.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      results.forEach((row) => {
        sendEmail(row.email, 'Your Subject Here', 'Your email content here');
      });
      res.status(200).send({ success: true, message: 'Emails sent successfully.' });
    })
    .on('error', (error) => {
      res.status(500).send({ success: false, message: error.message });
    });
});




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
