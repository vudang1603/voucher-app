"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendingEmail = void 0;
const Queue = require('bull');
const nodemailer = require('nodemailer');
require('dotenv').config();
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PASS = process.env.REDIS_PASS;
const MAIL_PASS = process.env.MAIL_PASS;
const emailQueue = new Queue('email', { redis: { port: REDIS_PORT, host: REDIS_HOST, password: REDIS_PASS }
});
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dang.vunguyen@hdwebsoft.co',
        pass: MAIL_PASS
    }
});
const sendingEmail = function (email, code) {
    emailQueue.add({
        email: email,
        code: code
    });
    emailQueue.process(function (job, done) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending an email!');
            return yield sendMail(job.data.email, job.data.code);
        });
    });
};
exports.sendingEmail = sendingEmail;
function sendMail(email, code) {
    var mailOptions = {
        from: 'dang.vunguyen@hdwebsoft.co',
        to: email,
        subject: 'Voucher App',
        text: 'New Voucher code: ' + code
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}
//# sourceMappingURL=sendMail.js.map