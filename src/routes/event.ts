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
        options :{
            description: 'Get event page',
            tags : ['api'],
            handler: getEvent
        }
        
    })

    server.route({
        method: 'POST',
        path: '/events',
        options :{
            description: 'Post new events',
            tags : ['api'],
            handler: postEvent
        }
        
    })

    server.route({
        method: 'POST',
        path: '/events/{eventId}/editable/me',
        options :{
            description: 'Check event is available to edit',
            tags : ['api'],
            handler: editableEvent
        }
        
    })

    server.route({
        method: 'GET',
        path: '/events/{eventId}/editable/edit',
        options :{
            description: 'Get edit page',
            tags : ['api'],
            handler: editEvent
        }
        
    })

    server.route({
        method: 'GET',
        path: '/events/{eventId}/editable/release',
        options :{
            description: 'Release event edited',
            tags : ['api'],
            handler: releaseEvent
        }
        
    })
}
