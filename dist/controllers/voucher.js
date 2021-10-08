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
exports.genNewVoucher = exports.setMaxQuantity = exports.voucherApi = void 0;
const voucher_1 = require("../models/voucher");
const transaction_1 = require("../transaction");
const Boom = require('@hapi/boom');
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
            max_quantity: maxQuantity,
            voucher_release: 0
        }, { upsert: true });
        return h.redirect('/voucher');
    }
    catch (err) {
        return h.response(err).code(500);
    }
});
exports.setMaxQuantity = setMaxQuantity;
const genNewVoucher = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var error;
        yield (0, transaction_1.addNewVoucher)(function cb(err) {
            if (err) {
                error = new Error(err);
            }
        });
        if (error) {
            return Boom.boomify(error, { statusCode: 456 });
        }
        else {
            return h.redirect('/voucher');
        }
    }
    catch (err) {
        return h.response(err).code(500);
    }
});
exports.genNewVoucher = genNewVoucher;
//# sourceMappingURL=voucher.js.map