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
exports.event = void 0;
const event_1 = require("../models/event");
const eventEdit_1 = require("../models/eventEdit");
const Boom = require('@hapi/boom');
const editable_1 = require("../editable");
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
exports.event = {
    getEvent: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            var event = yield event_1.default.find({});
            return h.view('event', { events: event });
        }
        catch (err) {
            return h.response(err).code(500);
        }
    }),
    postEvent: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const event = new event_1.default({
                content: request.payload.content
            });
            yield event.save();
            return h.redirect('/events');
        }
        catch (err) {
            return h.response(err).code(500);
        }
    }),
    editableEvent: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const eid = request.params.eventId;
            const uid = request.params.userId;
            request.session.user = uid;
            var error;
            yield (0, editable_1.checkEditable)(eid, uid, function (err) {
                error = new Error(err);
            });
            if (error) {
                return Boom.boomify(error, { statusCode: 409 });
            }
            else {
                return h.response('Allowed');
            }
        }
        catch (err) {
            return h.response(err).code(500);
        }
    }),
    releaseEvent: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            var userId = request.session.user;
            var eventId = request.params.eventId;
            const edit = yield eventEdit_1.default.findOne({ eventId: eventId, userEdit: userId });
            if (!edit) {
                return Boom.boomify(new Error('Not allowed to release'), { statusCode: 409 });
            }
            var event = yield event_1.default.findOne({ _id: eventId });
            var content = request.query.content;
            event.content = content;
            yield event.save();
            yield eventEdit_1.default.deleteOne({ eventId: eventId });
            return h.response('release');
        }
        catch (err) {
            return h.response(err).code(500);
        }
    }),
    maintainEvent: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            var eventId = request.params.eventId;
            yield eventEdit_1.default.findOneAndUpdate({ eventId: eventId }, { expire_at: Date.now() });
            return h.response('timeout reset!');
        }
        catch (err) {
            return h.response(err).code(500);
        }
    })
};
//# sourceMappingURL=event.js.map