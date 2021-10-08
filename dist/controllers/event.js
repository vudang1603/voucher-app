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
exports.maintainEvent = exports.releaseEvent = exports.editableEvent = exports.postEvent = exports.getEvent = void 0;
const event_1 = require("../models/event");
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
let timer;
const runTimer = (id) => {
    timer = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield event_1.default.findOneAndUpdate({ _id: id }, {
            $inc: { userEditor: -1 }
        });
    }), 60 * 1000);
};
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
        const id = request.params.eventId;
        var error;
        yield (0, editable_1.checkEditable)(id, function (err) {
            error = new Error(err);
        });
        if (error) {
            return Boom.boomify(error, { statusCode: 409 });
        }
        else {
            runTimer(id);
            var event = yield event_1.default.findOne({ _id: request.params.eventId });
            return h.view('editEvent', { event: event });
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
        yield event_1.default.findOneAndUpdate({ _id: eventId }, {
            $inc: { userEditor: -1 }
        });
        return h.redirect('/events');
    }
    catch (err) {
        return h.response(err).code(500);
    }
});
exports.releaseEvent = releaseEvent;
const maintainEvent = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var eventId = request.params.eventId;
        clearTimeout(timer);
        runTimer(eventId);
    }
    catch (err) {
        return h.response(err).code(500);
    }
});
exports.maintainEvent = maintainEvent;
//# sourceMappingURL=event.js.map