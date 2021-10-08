const Queue = require('bull');
const nodemailer = require('nodemailer')
require('dotenv').config();
const REDIS_PORT = process.env.REDIS_PORT
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PASS = process.env.REDIS_PASS
const MAIL_PASS = process.env.MAIL_PASS
const emailQueue = new Queue('email', 
    { redis: 
        { port: REDIS_PORT, host: REDIS_HOST, password: REDIS_PASS }
    });
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dang.vunguyen@hdwebsoft.co',
      pass: MAIL_PASS
    }
  });

export const sendingEmail = function (email, code) {
    emailQueue.add({
        email: email,
        code: code
    });

    emailQueue.process(async function (job, done) {
        console.log('Sending an email!')
        return await sendMail(job.data.email, job.data.code)
    });
}

async function sendMail(email: string, code: string){
    var mailOptions = {
        from: 'dang.vunguyen@hdwebsoft.co',
        to: email,
        subject: 'Voucher App',
        text: 'New Voucher code: ' + code
    };
    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}





