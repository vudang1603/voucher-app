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
exports.init = void 0;
const Hapi = require('@hapi/hapi');
const Ejs = require('ejs');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const voucher_1 = require("./routes/voucher");
const event_1 = require("./routes/event");
const server = new Hapi.server({
    port: 4000,
    host: 'localhost'
});
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
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    yield server.register(plugins);
    server.views({
        engines: { ejs: Ejs },
        relativeTo: __dirname,
        path: '../views'
    });
    server.route({
        method: "GET",
        path: '/',
        handler: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
            return h.view('index');
        })
    });
    (0, voucher_1.voucherRoutes)(server);
    (0, event_1.eventRoutes)(server);
    yield server.start();
    console.log(`Server running on port ${server.info.port}`);
});
exports.init = init;
process.on('uncaughtRejection', (err) => {
    console.log(err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map