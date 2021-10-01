const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.DB_URL;
const clientEmail = 'nguyenvudang.1999@gmail.com'
import { error } from 'console';
import Voucher from './models/voucher';
import {sendingEmail} from './sendMail';

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

export const addNewVoucher = async function (cb) {
    const conn = await mongoose.connect(dbUrl, { useNewUrlParser: true });
    let session = await conn.startSession();
    try {
        var newVoucherCode = makeid(15);
        const transactionResults = await session.withTransaction( async () => {
            const addVoucherCode = await Voucher.updateOne({}, {
                $push :{
                    voucher: newVoucherCode
                },
                $inc: { max_quantity: -1 }            
            }, {session})
            const checkMaxQuantity = await Voucher.findOne({});
            if(checkMaxQuantity.max_quantity <= 0 ){
                await session.abortTransaction();
                console.log("Out of Voucher.");
                cb('Out of Voucher.');
            }
        });
        if (transactionResults) {
            sendingEmail(clientEmail, newVoucherCode);
            console.log("New voucher code was successfully created.");
        } else {
            console.log("The transaction was intentionally aborted.");
        }
    }
    catch(e){
        console.log("The transaction was aborted due to an unexpected error: " + e);
    } finally {
        await session.endSession();
    }
}

