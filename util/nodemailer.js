const nodemailer = require('nodemailer')
require('dotenv').config()

async function main(addressToSendEmailTo, subject, content, html) {
 

    let transporter = nodemailer.createTransport({
        host: "poczta.o2.pl",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.MYMAIL_LOGIN, 
          pass: process.env.MYMAIL_PASS
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"LKPSHOP" <lkp25@o2.pl>', // sender address
        to: addressToSendEmailTo, // list of receivers
        subject: subject, // Subject line
        text: content, // plain text body
        html: html, // html body
      });
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    }
    
    // main().catch(console.error);

    module.exports = main