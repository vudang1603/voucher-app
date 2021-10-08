const mongoose = require('mongoose');
import { Agenda } from "agenda/es";
require('dotenv').config();
const dbUrl = process.env.DB_URL;

const agenda = new Agenda({ db: { address: dbUrl } });

agenda.define("check db connection", async (job) => {
    
    switch(mongoose.connection.readyState){
        case 0: 
            console.log('DB disconnected');
            break;
        case 1: 
            console.log('DB still connected');
            break;
        case 2: 
            console.log('DB still connecting');
            break;
        case 3: 
            console.log('DB still connecting');
            break;
    }
});

(async function () {

    await agenda.start();
  
    await agenda.every("1 minutes", "check db connection");
})();

mongoose.connect(dbUrl,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(db => console.log("DB is connected"))
.catch(err => console.log("Error connecting DB: " + err.message))
