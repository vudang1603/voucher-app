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
exports.genNewVoucher = exports.setMaxQuantity = exports.voucherApi = exports.getApi = exports.testApi = void 0;
const test_1 = require("../models/test");
const voucher_1 = require("../models/voucher");
const transaction_1 = require("../transaction");
const testApi = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var person = new test_1.default(request.payload);
        var result = yield person.save();
        return h.response(result);
    }
    catch (err) {
        return h.response(err).code(500);
    }
});
exports.testApi = testApi;
const getApi = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var person = yield test_1.default.find().exec();
        return h.view('person', { person: person });
    }
    catch (err) {
        return h.response(err).code(500);
    }
});
exports.getApi = getApi;
const voucherApi = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var vouchers = yield voucher_1.default.findOne({});
        if (!vouchers) {
            vouchers = {
                voucher: []
            };
        }
        return h.view('voucher', { vouchers: vouchers });
    }
    catch (err) {
        return h.response(err).code(500);
    }
});
exports.voucherApi = voucherApi;
const setMaxQuantity = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maxQuantity = request.payload.quantity;
        yield voucher_1.default.updateOne({}, {
            voucher: [],
            max_quantity: maxQuantity
        }, { upsert: true });
        return h.view('voucher');
    }
    catch (err) {
        return h.response(err).code(500);
    }
});
exports.setMaxQuantity = setMaxQuantity;
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
const genNewVoucher = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var newVoucherCode = makeid(10);
        yield (0, transaction_1.addNewVoucher)(newVoucherCode);
        return h.redirect('/voucher');
    }
    catch (err) {
        return h.response(err).code(500);
    }
});
exports.genNewVoucher = genNewVoucher;
//# sourceMappingURL=test.js.map