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
exports.addNewVoucher = void 0;
const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.DB_URL;
const clientEmail = 'nguyenvudang.1999@gmail.com';
const voucher_1 = require("./models/voucher");
const sendMail_1 = require("./sendMail");
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
const addNewVoucher = function (cb) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield mongoose.connect(dbUrl, { useNewUrlParser: true });
        let session = yield conn.startSession();
        try {
            var newVoucherCode = makeid(15);
            const transactionResults = yield session.withTransaction(() => __awaiter(this, void 0, void 0, function* () {
                const addVoucherCode = yield voucher_1.default.updateOne({ $expr: { $lt: ['$voucher_release', '$max_quantity'] } }, {
                    $push: {
                        voucher: newVoucherCode
                    },
                    $inc: { voucher_release: 1 }
                }, { session, returnOriginal: false });
                if (addVoucherCode.modifiedCount > 0) {
                    (0, sendMail_1.sendingEmail)(clientEmail, newVoucherCode);
                }
                else {
                    yield session.abortTransaction();
                    console.log("Out of Voucher.");
                    cb('Out of Voucher.');
                }
            }));
            if (transactionResults) {
                console.log("New voucher code was successfully created.");
            }
            else {
                console.log("The transaction was intentionally aborted.");
            }
        }
        catch (e) {
            console.log("The transaction was aborted due to an unexpected error: " + e);
        }
        finally {
            yield session.endSession();
        }
    });
};
exports.addNewVoucher = addNewVoucher;
//# sourceMappingURL=transaction.js.map