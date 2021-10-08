const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.DB_URL;
import Event from './models/event';
export const checkEditable = async function (id, cb) {
    const conn = await mongoose.connect(dbUrl, { useNewUrlParser: true });
    let session = await conn.startSession();
    try {
        const transactionResults = await session.withTransaction( async () => {
            const addVoucherCode = await Event.findOneAndUpdate({_id: id}, {
                $inc: {userEditor: 1}          
            }, {session, returnOriginal: false}).then(async (result) => {
                if(result.userEditor > 1 || result.userEditor < 0){
                    await session.abortTransaction();
                    console.log("Not Allowed.");
                    cb('Not Allowed.');
                }
            })
        });
    }
    catch(e){
        console.log("The transaction was aborted due to an unexpected error: " + e);
    } finally {
        await session.endSession();
    }
}

