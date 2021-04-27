// const nodemailer = require('nodemailer');
// const mailGun = require('nodemailer-mailgun-transport');

const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: process.env.MAILGUN_NAME, domain: process.env.MAILGUN_HOST});
module.exports =(email,otp,name) => {
    return new Promise((resolve, reject)=> {
        let data = {
            from: 'noreply@athena21.live',
            to: email,
            subject: 'Confirm OTP | Athena21',
            template: "athena",
            'h:X-Mailgun-Variables': JSON.stringify({name: name, otp: otp, email: email})
        };
        mg.messages().send(data, function (error, body) {
          if(error) {
              console.log(error);
            //   logger.error(error);
            reject(error);
        }else {
            console.log('Mail sent to', to);
            resolve('ES');
        }
      });
  });    
}

// myfunc();



// const transporter = nodemailer.createTransport(mailGun(auth));

// const mailOptions = {
//     from: 'web@istetkmce.in',
//     to: 'sujithvi08@gmail.com',
//     subject: 'Test',
//     text: 'Hello'
// };

// transporter.sendMail(mailOptions, function(err, data){
//     if(err){
//         console.log('Error Occurs ', err);
//     } else {
//         console.log('Message sent ');
//     }
// })
