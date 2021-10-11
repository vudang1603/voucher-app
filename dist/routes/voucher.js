"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voucherRoutes = void 0;
const voucher_1 = require("../controllers/voucher");
const Joi = require('joi');
const fs = require('fs');
const voucherRoutes = (server) => {
    server.route({
        method: 'GET',
        path: '/voucher',
        options: {
            description: 'Get voucher page',
            tags: ['api'],
            handler: voucher_1.voucher.voucherApi
        }
    });
    server.route({
        method: 'POST',
        path: '/voucher',
        options: {
            description: 'Set max quantity voucher',
            tags: ['api'],
            handler: voucher_1.voucher.setMaxQuantity
        }
    });
    server.route({
        method: 'GET',
        path: '/voucher/new-voucher',
        options: {
            description: 'Get new voucher',
            tags: ['api'],
            handler: voucher_1.voucher.genNewVoucher
        }
    });
};
exports.voucherRoutes = voucherRoutes;
//# sourceMappingURL=voucher.js.map