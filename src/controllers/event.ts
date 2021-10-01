import Event from '../models/event';
const Boom = require('@hapi/boom')
import {cache} from '../server'

async function checkEditable(id) {
    const value = await cache.get(id);
    return value;
}


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

export const getEvent = async (request, h) => {
    try {
        var event = await Event.find({});
        return h.view('event', {events: event});
    } catch (err) {
        return h.response(err).code(500);
    }
}

export const postEvent = async (request, h) => {
    try {
        const event = new Event({
            content: request.payload.content
        });
        await event.save();
        return h.redirect('/events')
    } catch (err) {
        return h.response(err).code(500);
    }
}

export const editableEvent = async (request, h) => {
    try {
        var eventId = request.params.eventId
        var id = makeid(10);
        const val = await checkEditable(eventId);
        if(val){
            return h.response('Not Allowed').code(409)
        } else {
            await cache.set(eventId, { Available: false });
            return h.redirect('/events/'+eventId+'/editable/edit');
        }
    } catch (err) {
        return h.response(err).code(500);
    }
}

export const releaseEvent = async (request, h) => {
    try {
        var eventId = request.params.eventId
        var event = await Event.findOne({_id: eventId});
        var content = request.query.content;
        event.content = content;
        await event.save();
        await cache.drop(eventId);
        return h.redirect('/events');
    } catch (err) {
        return h.response(err).code(500);
    }
}

export const editEvent = async (request, h) => {
    try {
        var event = await Event.findOne({_id: request.params.eventId});
        return h.view('editEvent', {event: event});
    } catch (err) {
        return h.response(err).code(500);
    }
}



