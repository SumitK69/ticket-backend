const nodemailer = require("nodemailer");
require("dotenv").config();

const SendMail = async (subject, message, send_to, sent_from) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL, // replace with your email address
      pass: process.env.WORD, // replace with your email password
    },
  });
  // Email content
  const mailOptions = {
    from: sent_from, // replace with your email address
    to: send_to, // replace with the recipient's email address
    subject: subject,
    html: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = SendMail;
