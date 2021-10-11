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
require('dotenv').config();
const dbUrl = process.env.DB_URL;
const eventEdit_1 = require("./models/eventEdit");
const checkEditable = function (eid, uid, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventFind = yield eventEdit_1.default.findOne({ eventId: eid });
        if (!eventFind) {
            const editEvent = new eventEdit_1.default();
            editEvent.eventId = eid;
            editEvent.userEdit = uid;
            yield editEvent.save();
        }
        else {
            cb('Not allowed');
        }
    });
};
exports.checkEditable = checkEditable;
//# sourceMappingURL=editable.js.map