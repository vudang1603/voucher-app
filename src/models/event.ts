const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    content: String
})

export default mongoose.model('Event', eventSchema);