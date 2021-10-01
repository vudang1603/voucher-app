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
exports.editEvent = exports.releaseEvent = exports.editableEvent = exports.postEvent = exports.getEvent = void 0;
const event_1 = require("../models/event");
const Boom = require('@hapi/boom');
const server_1 = require("../server");
function checkEditable(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const value = yield server_1.cache.get(id);
        return value;
    });
}
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
const getEvent = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var event = yield event_1.default.find({});
        return h.view('event', { events: event });
    }
    catch (err) {
        return h.response(err).code(500);
    }
});
exports.getEvent = getEvent;
const postEvent = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.postEvent = postEvent;
const editableEvent = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var eventId = request.params.eventId;
        var id = makeid(10);
        const val = yield checkEditable(eventId);
        if (val) {
            return h.response('Not Allowed').code(409);
        }
        else {
            yield server_1.cache.set(eventId, { Available: false });
            return h.redirect('/events/' + eventId + '/editable/edit');
        }
    }
    catch (err) {
        return h.response(err).code(500);
    }
});
exports.editableEvent = editableEvent;
const releaseEvent = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var eventId = request.params.eventId;
        var event = yield event_1.default.findOne({ _id: eventId });
        var content = request.query.content;
        event.content = content;
        yield event.save();
        yield server_1.cache.drop(eventId);
        return h.redirect('/events');
    }
    catch (err) {
        return h.response(err).code(500);
    }
});
exports.releaseEvent = releaseEvent;
const editEvent = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var event = yield event_1.default.findOne({ _id: request.params.eventId });
        return h.view('editEvent', { event: event });
    }
    catch (err) {
        return h.response(err).code(500);
    }
});
exports.editEvent = editEvent;
//# sourceMappingURL=event.js.map