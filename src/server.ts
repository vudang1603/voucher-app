const Hapi = require('@hapi/hapi');
const Ejs = require('ejs');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

import { voucherRoutes } from './routes/voucher';
import { eventRoutes } from './routes/event';

const server = new Hapi.server({
    port: 4000,
    host: 'localhost'
})


const swaggerOptions = {
    info: {
        title: 'Test API Documentation',
        version: '0.0.1',
    },
};


const plugins = [
    {
        plugin: Inert
    },
    {
        plugin: Vision
    },
    {
        plugin: HapiSwagger,
        options: swaggerOptions
    },
    { 
        plugin: require('hapi-server-session'),
        options: {
            cookie: {
                isSecure: false, // never set to false in production
            },
        },
    }
];


export const init = async () => {  
    await server.register(plugins);

    server.views({
        engines: { ejs: Ejs },
        relativeTo: __dirname,
        path: '../views'
    });

    server.route({
        method: "GET",
        path: '/',
        handler: async (request, h) => {
            return h.view('index');
        }
    })
    voucherRoutes(server);
    eventRoutes(server);


    await server.start();
    console.log(`Server running on port ${server.info.port}`);
}

process.on('uncaughtRejection', (err)=>{
    console.log(err);
    process.exit(1);
});

