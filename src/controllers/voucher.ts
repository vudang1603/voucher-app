import Voucher from '../models/voucher';
import {addNewVoucher} from '../transaction'
const Boom = require('@hapi/boom')

export const voucher = {
    voucherApi: async (request, h) => {
        try {
            var vouchers = await Voucher.findOne({});
            if(!vouchers) { vouchers = {
                voucher: []
            } }
            return h.view('voucher', {vouchers: vouchers})
        } catch (err) {
            return h.response(err).code(500);
        }
    },

    setMaxQuantity: async (request, h) => {
        try {
            const maxQuantity = request.payload.quantity;
            await Voucher.updateOne({},{
                voucher: [],
                max_quantity: maxQuantity,
                voucher_release: 0
            }, {upsert: true});
            return h.redirect('/voucher');
        } catch (err) {
            return h.response(err).code(500);
        }
    },

    genNewVoucher: async (request, h) => {
        try {
            var error;
            await addNewVoucher(function cb(err){
                if(err) {
                    error = new Error(err);
                }
            });
            if(error) {
                return Boom.boomify(error, { statusCode: 456 });
            } else {
                return h.redirect('/voucher')
            }
            
        } catch (err) {
            return h.response(err).code(500)
        }
    }
}
