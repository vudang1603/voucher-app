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
exports.checkEditable = void 0;
const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.DB_URL;
const event_1 = require("./models/event");
const checkEditable = function (id, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield mongoose.connect(dbUrl, { useNewUrlParser: true });
        let session = yield conn.startSession();
        try {
            const transactionResults = yield session.withTransaction(() => __awaiter(this, void 0, void 0, function* () {
                const addVoucherCode = yield event_1.default.findOneAndUpdate({ _id: id }, {
                    $inc: { userEditor: 1 }
                }, { session, returnOriginal: false }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result.userEditor > 1 || result.userEditor < 0) {
                        yield session.abortTransaction();
                        console.log("Not Allowed.");
                        cb('Not Allowed.');
                    }
                }));
            }));
        }
        catch (e) {
            console.log("The transaction was aborted due to an unexpected error: " + e);
        }
        finally {
            yield session.endSession();
        }
    });
};
exports.checkEditable = checkEditable;
//# sourceMappingURL=editable.js.map