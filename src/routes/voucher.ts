import {Server} from '@hapi/hapi';
import {voucherApi, setMaxQuantity, genNewVoucher} from '../controllers/voucher'
const Joi = require('joi');
const fs = require('fs');

export const voucherRoutes = (server: Server) => {
    server.route({
        method: 'GET',
        path:'/voucher',
        options :{
            description: 'Get voucher page',
            tags : ['api'],
            handler: voucherApi
        }
        
    })

    server.route({
        method: 'POST',
        path:'/voucher',
        options :{
            description: 'Set max quantity voucher',
            tags : ['api'],
            handler: setMaxQuantity
        }
        
    })

    server.route({
        method: 'GET',
        path:'/voucher/new-voucher',
        options :{
            description: 'Get new voucher',
            tags : ['api'],
            handler: genNewVoucher
        }
        
    })

    
}    