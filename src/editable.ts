require('dotenv').config();
const dbUrl = process.env.DB_URL;
import eventEdit from './models/eventEdit';

export const checkEditable = async function (eid, uid, cb) {
    const eventFind = await eventEdit.findOne({eventId: eid});
    if(!eventFind){
        const editEvent = new eventEdit();
        editEvent.eventId = eid;
        editEvent.userEdit = uid;
        await editEvent.save();
    } else {
        cb('Not allowed');
    }
}

