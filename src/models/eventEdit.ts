const mongoose = require('mongoose');

const eventEdit = new mongoose.Schema({
    eventId: {
        type: String,
        unique: true
    },
    userEdit: String,
    expire_at: {type: Date, default: Date.now, expires: 5*60} 
})


export default mongoose.model('Edit', eventEdit);
