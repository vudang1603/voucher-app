const mongoose = require('mongoose');
import { Agenda } from "agenda/es";
require('dotenv').config();
const dbUrl = process.env.DB_URL;

const agenda = new Agenda({ db: { address: dbUrl } });

agenda.define("check db connection", async (job) => {
    mongoose.connect(dbUrl)
    .then(db => console.log("DB is still connected successfully"))
    .catch(err => console.log("Error connecting DB: " + err.message))
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
