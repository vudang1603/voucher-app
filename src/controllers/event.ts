import Event from '../models/event';
import eventEdit from '../models/eventEdit';
import User from '../models/user';

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


export const event = {
    getEvent: async (request, h) => {
        try {
            var event = await Event.find({});
            return h.view('event', {events: event});
        } catch (err) {
            return h.response(err).code(500);
        }
    },

    postEvent: async (request, h) => {
        try {
            const event = new Event({
                content: request.payload.content
            });
            await event.save();
            return h.redirect('/events')
        } catch (err) {
            return h.response(err).code(500);
        }
    },

    editableEvent: async (request, h) => {
        try {
            const eid = request.params.eventId;
            const uid = request.params.userId;
            request.session.user = uid;
            var error;
            await checkEditable(eid, uid, function(err) {
                error = new Error(err);
            })
            if(error) {
                return Boom.boomify(error, { statusCode: 409 });
            } else {
                return h.response('Allowed');
            }
        } catch (err) {
            return h.response(err).code(500);
        }
    },

    releaseEvent: async (request, h) => {
        try {
            var userId = request.session.user;
            var eventId = request.params.eventId;
            const edit = await eventEdit.findOne({eventId: eventId, userEdit: userId});
            if(!edit) {
                return Boom.boomify(new Error('Not allowed to release'), { statusCode: 409 });
            }
            var event = await Event.findOne({_id: eventId});
            var content = request.query.content;
            event.content = content;
            await event.save();
            await eventEdit.deleteOne({eventId: eventId})
            return h.response('release');
        } catch (err) {
            return h.response(err).code(500);
        }
    },

    maintainEvent: async (request, h) => {
        try {
            var eventId = request.params.eventId;
            await eventEdit.findOneAndUpdate({eventId: eventId},{expire_at: Date.now()})
            return h.response('timeout reset!');
        } catch (err) {
            return h.response(err).code(500);
        }
    }
}







