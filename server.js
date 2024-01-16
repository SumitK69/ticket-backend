const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const SendMail = require("./mailing");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("hello world");
});
app.post("/api", async (req, res) => {
  const { unique_id } = req.body;
  const { creation_time } = req.body;
  const { email } = req.body;
  const { complaint } = req.body;

  console.log("email", email);
  //! sending to user
  try {
    const send_to = email;
    const host_email = process.env.EMAIL;
    const subject = creation_time;
    const User_message = `<div><h1>Unique ID: ${unique_id}</h1>
    <h3>Complaint will be treated as soon as possible.</h3></div>`;

    const Host_message = `<div><h1>User ID: ${email}</h1>
    <h2>Complaint Unique ID: ${unique_id}</h2>
    <h2>Creation Time: ${creation_time}</h2>
    <h3>Complaint content: ${complaint}</h3></div>`;
    await SendMail(subject, User_message, send_to, host_email);
    await SendMail(subject, Host_message, host_email, host_email);
    res
      .status(200)
      .json({ success: true, message: "email sent", entered_email: send_to });
  } catch (error) {
    res.status(500).json(error.message);
  }
  console.log("process.env.MAIL", process.env.EMAIL);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
// ToDO: create two separate mail to send(to us for record and to them)
// TODO: if something not working restart this server
