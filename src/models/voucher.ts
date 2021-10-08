
const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    voucher: [{
        type: String
    }],
    max_quantity: Number,
    voucher_release: Number
})

export default mongoose.model('Voucher', voucherSchema);