"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const PersonModel = new mongoose.Schema({
    firstname: String,
    lastname: String
});
exports.default = mongoose.model('Person', PersonModel);
//# sourceMappingURL=test.js.map