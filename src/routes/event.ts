import {Server} from '@hapi/hapi';
import {getEvent, postEvent, editEvent, editableEvent, releaseEvent} from '../controllers/event'
const Boom = require('@hapi/boom')



function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

export const eventRoutes = (server: Server) => {

    server.route({
        method: 'GET',
        path: '/events',
        handler: getEvent
    })

    server.route({
        method: 'POST',
        path: '/events',
        handler: postEvent
    })

    server.route({
        method: 'POST',
        path: '/events/{eventId}/editable/me',
        handler: editableEvent
    })

    server.route({
        method: 'GET',
        path: '/events/{eventId}/editable/edit',
        handler: editEvent
    })

    server.route({
        method: 'GET',
        path: '/events/{eventId}/editable/release',
        handler: releaseEvent
    })
}
