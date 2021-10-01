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
exports.testRoutes = void 0;
const test_1 = require("../controllers/test");
const Joi = require('joi');
const fs = require('fs');
const testRoutes = (server) => {
    server.route({
        method: 'POST',
        path: '/person',
        options: {
            validate: {
                payload: Joi.object({
                    firstname: Joi.string().required(),
                    lastname: Joi.string().required()
                })
            }
        },
        handler: test_1.testApi
    });
    server.route({
        method: 'GET',
        path: '/person',
        handler: test_1.getApi
    });
    server.route({
        method: 'GET',
        path: '/voucher',
        handler: test_1.voucherApi
    });
    server.route({
        method: 'POST',
        path: '/voucher',
        options: {
            description: 'Set max quantity voucher',
            tags: ['voucher'],
            handler: test_1.setMaxQuantity
        }
    });
    server.route({
        method: 'GET',
        path: '/voucher/new-voucher',
        options: {
            description: 'Get new voucher',
            tags: ['voucher'],
            handler: test_1.genNewVoucher
        }
    });
    server.route({
        method: 'GET',
        path: '/book',
        options: {
            description: 'Get books list',
            notes: 'Returns an array of books',
            tags: ['api'],
            handler: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
                const books = yield fs.readFile('./books.json', 'utf8');
                return h.response(JSON.parse(books));
            })
        }
    });
};
exports.testRoutes = testRoutes;
//# sourceMappingURL=test.js.map