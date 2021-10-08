import { number } from "joi";

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    content: String,
    userEditor: {
        type: Number,
        max: 1,
        default: 0
    }
})

export default mongoose.model('Event', eventSchema);