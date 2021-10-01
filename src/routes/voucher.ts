import {Server} from '@hapi/hapi';
import {voucherApi, setMaxQuantity, genNewVoucher} from '../controllers/voucher'
const Joi = require('joi');
const fs = require('fs');

export const voucherRoutes = (server: Server) => {
    server.route({
        method: 'GET',
        path:'/voucher',
        handler: voucherApi
    })

    server.route({
        method: 'POST',
        path:'/voucher',
        options :{
            description: 'Set max quantity voucher',
            tags : ['voucher'],
            handler: setMaxQuantity
        }
        
    })

    server.route({
        method: 'GET',
        path:'/voucher/new-voucher',
        options :{
            description: 'Get new voucher',
            notes: 'Returns an array of books',
            tags : ['voucher'],
            handler: genNewVoucher
        }
        
    })

    server.route({
        method: 'GET',
        path: '/book',
        options: {
            description: 'Get books list',
            notes: 'Returns an array of books',
            tags: ['api'],
            handler: async (request, h) => {
                const books = await fs.readFile('./books.json', 'utf8');
                return h.response(JSON.parse(books));
            }
        }
    })
}    