const express=require('express');
const Router=express.Router();
const path=require('path');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
const Register=require("../source/models/registers");

Router.get('/forgot_p',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../final/forgotpassword.html'))
});

Router.post('/forgot_p', (req, res) => {
  const { email } = req.body;
  Register.findOne({ email })
 .then(user => {
      if (!user) {
          return res.send({ Status: "User don't exist" });
      }
      
      const token = user.tokens;
      var transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "672894e717119b",
            pass: "7297fb2ef291f8"
          }
      });

      var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'yfriend@yahoo.com',
        subject: 'Reset your password',
        text: `http://localhost:3/reset-password/${token}/`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          res.send({ Status: "Success" });
        }
      });
  })
});

module.exports=Router;