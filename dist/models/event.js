"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    content: String,
    userEditor: {
        type: Number,
        max: 1,
        default: 0
    }
});
exports.default = mongoose.model('Event', eventSchema);
//# sourceMappingURL=event.js.map