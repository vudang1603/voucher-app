import {Server} from '@hapi/hapi';
import {event} from '../controllers/event'
const Boom = require('@hapi/boom')
const Joi = require('joi');



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
            handler: event.getEvent
        }
        
    })

    server.route({
        method: 'POST',
        path: '/events',
        options :{
            description: 'Post new events',
            tags : ['api'],
            handler: event.postEvent
        }
        
    })

    server.route({
        method: 'POST',
        path: '/events/{eventId}/editable/{userId}',
        options :{
            description: 'Check event is available to edit',
            tags : ['api'],
            handler : event.editableEvent
        }
        
    })

    server.route({
        method: 'GET',
        path: '/events/{eventId}/editable/release',
        options :{
            description: 'Release event edited',
            tags : ['api'],
            handler: event.releaseEvent
        }
        
    })

    server.route({
        method: 'POST',
        path: '/events/{eventId}/editable/maintain',
        options :{
            description: 'Maintain event',
            tags : ['api'],
            handler: event.maintainEvent
        }  
    })
}
