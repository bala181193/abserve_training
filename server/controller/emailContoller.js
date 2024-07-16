import nodemailer from "nodemailer";
import config from "../config/config";
const sgMail = require("@sendgrid/mail");
const _ = require("lodash");
const API_KEY =
  "";
sgMail.setApiKey(API_KEY);

export const emailSend = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: config.emailConfig.host,
      port: config.emailConfig.port,
      secure: config.emailConfig.secure,
      auth: {
        user: config.emailConfig.auth.user,
        pass: config.emailConfig.auth.pass,
      },
    });

    // Email content
    let mailOptions = {
      from: config.emailConfig.auth.user,
      to: req.body.email,
      subject: "Test Email",
      // text: 'Hello from Node.js!',
      html: '<h1 style="color:blue;">A Blue Heading</h1>',
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).json({ error: error });
      }
      console.log("Message sent: %s", info.messageId);
      return res.status(200).json({ message: "email sent suceesfully" });
    });
  } catch (err) {
    return res.status(400).json({ message: "server error", error: err });
  }
};

const sendSendgridMail = (messageBody) => {
  try {
    console.log("messageBodymessageBody", messageBody);
    const { to, subject, text, html } = messageBody;

    const msg = {
      to,
      from: "ba181193la@gmail.com", // Use the email address or domain you verified with SendGrid
      subject,
      text,
      // html,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent successfullyEmail sent successfully");
        //res.status(200).json({ message: "Email sent successfully" });
      })
      .catch((error) => {
        console.error(error && error.response && error.response.body);
        // res.status(500).json({ error: "Error sending email" });
      });
  } catch (err) {
    console.log(err.body);
  }
};
// sendSendgridMail({
//   to: "",
//   subject: "",
//   text: "hi",
//   html: "",
// });

const sample = () => {
    // return "111111";
    let OTP= "";
    for (let i = 0; i < 6; i++) {
     // OTP += digits[Math.floor(Math.random() * 10)];
     OTP += Math.floor(Math.random() * 10);
   }
   return OTP;
  
};
const sum=(a,b)=>{
  return a+b
}
 console.log( sample());
console.log( sum(5,5))
