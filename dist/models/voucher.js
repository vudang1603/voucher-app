"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const voucherSchema = new mongoose.Schema({
    voucher: [{
            type: String
        }],
    max_quantity: Number,
    voucher_release: Number
});
exports.default = mongoose.model('Voucher', voucherSchema);
//# sourceMappingURL=voucher.js.map