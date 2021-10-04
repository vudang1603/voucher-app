"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = void 0;
const event_1 = require("../controllers/event");
const Boom = require('@hapi/boom');
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
const eventRoutes = (server) => {
    server.route({
        method: 'GET',
        path: '/events',
        options: {
            description: 'Get event page',
            tags: ['api'],
            handler: event_1.getEvent
        }
    });
    server.route({
        method: 'POST',
        path: '/events',
        options: {
            description: 'Post new events',
            tags: ['api'],
            handler: event_1.postEvent
        }
    });
    server.route({
        method: 'POST',
        path: '/events/{eventId}/editable/me',
        options: {
            description: 'Check event is available to edit',
            tags: ['api'],
            handler: event_1.editableEvent
        }
    });
    server.route({
        method: 'GET',
        path: '/events/{eventId}/editable/edit',
        options: {
            description: 'Get edit page',
            tags: ['api'],
            handler: event_1.editEvent
        }
    });
    server.route({
        method: 'GET',
        path: '/events/{eventId}/editable/release',
        options: {
            description: 'Release event edited',
            tags: ['api'],
            handler: event_1.releaseEvent
        }
    });
};
exports.eventRoutes = eventRoutes;
//# sourceMappingURL=event.js.map