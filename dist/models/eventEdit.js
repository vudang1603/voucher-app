"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const eventEdit = new mongoose.Schema({
    eventId: {
        type: String,
        unique: true
    },
    userEdit: String,
    expire_at: { type: Date, default: Date.now, expires: 60 }
});
exports.default = mongoose.model('Edit', eventEdit);
//# sourceMappingURL=eventEdit.js.map