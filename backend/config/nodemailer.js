require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.SENDER_EMAIL}`,
    pass: `${process.env.SENDER_EMAIL_PASSWORD_GAPP}`,
  },
});

module.exports = transporter;