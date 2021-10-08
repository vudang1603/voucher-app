import Event from '../models/event';
const Boom = require('@hapi/boom')
import {checkEditable} from '../editable';


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

let timer;
const runTimer = (id) => {
    timer = setTimeout(async () => {
        await Event.findOneAndUpdate({_id: id}, {
            $inc: {userEditor: -1}          
        })
    }, 60* 1000)
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
        const id = request.params.eventId;
        var error;
        await checkEditable(id, function(err) {
            error = new Error(err);
        })
        if(error) {
            return Boom.boomify(error, { statusCode: 409 });
        } else {
            runTimer(id);
            var event = await Event.findOne({_id: request.params.eventId});

            return h.view('editEvent', {event: event});
        }
    } catch (err) {
        return h.response(err).code(500);
    }
}

export const releaseEvent = async (request, h) => {
    try {
        var eventId = request.params.eventId;
        var event = await Event.findOne({_id: eventId});
        var content = request.query.content;
        event.content = content;
        await event.save();
        await Event.findOneAndUpdate({_id: eventId}, {
            $inc: {userEditor: -1}          
        })
        return h.redirect('/events');
    } catch (err) {
        return h.response(err).code(500);
    }
}

export const maintainEvent = async (request, h) => {
    try {
        var eventId = request.params.eventId;
        clearTimeout(timer);
        runTimer(eventId);
    } catch (err) {
        return h.response(err).code(500);
    }
}





