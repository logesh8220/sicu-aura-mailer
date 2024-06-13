const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3000;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'websites.sicu.aura@gmail.com',
    pass: process.env.PASS
  }
});

app.use(express.json());
app.use(cors());

// mailer
app.post('/sendEmail', (req, res) => {
  const { to, subject, text, html, header } = req.body;


  const recipients = to.split(',').map(email => email.trim());

  const mailOptions = {
    from: `${header} <websites.sicu.aura@gmail.com>`,
    to: recipients.join(','), 
    subject: subject,
    cc: 'sicu.aura.official@gmail.com',
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
