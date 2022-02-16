const nodemailer = require("nodemailer");


const user = process.env.EMAIL_ADDRESS;
const pass = process.env.EMAIL_PASSWORD;

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

  module.exports.sendPasswordCode = (name, email, link) => {
    transport.sendMail({
      from: user,
      to: email,
      subject: "we've made it easy to get back",
      html: `Hi ${name},,<br/><br/>
      Sorry to hear you’re having trouble logging into Instagram. We got a message that you forgot your password. If this was you, you can get right back into your account or reset your password now.
      
      <a style="text-decoration : 'none' ; color : '#fafafa'" href='http://localhost:3000/accounts/password/reset/comfirm/${link}' >
      <btn style="background-color:'blue' ; color : '#fafafa' ; padding : '5px' ">Reset Your Password</btn>
      </a>`
    }).catch(err => console.log(err));
  };