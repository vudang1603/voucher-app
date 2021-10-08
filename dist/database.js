"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const es_1 = require("agenda/es");
require('dotenv').config();
const dbUrl = process.env.DB_URL;
const agenda = new es_1.Agenda({ db: { address: dbUrl } });
agenda.define("check db connection", (job) => __awaiter(void 0, void 0, void 0, function* () {
    switch (mongoose.connection.readyState) {
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
}));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield agenda.start();
        yield agenda.every("1 minutes", "check db connection");
    });
})();
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("DB is connected"))
    .catch(err => console.log("Error connecting DB: " + err.message));
//# sourceMappingURL=database.js.map