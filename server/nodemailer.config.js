const nodemailer = require("nodemailer");
const config = require('./auth.config')

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `Hi ${name},<br/><br/>
      Someone tried to sign up for an Instagram account with ${email}. If it was you, enter this confirmation code in the app:
      
      <h2 style="text-align:'center'">${confirmationCode}</h2>`,
    }).catch(err => console.log(err));
  };