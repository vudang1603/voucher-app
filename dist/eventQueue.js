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
exports.addUserEdit = exports.getJobStatus = void 0;
const Queue = require('bull');
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PASS = process.env.REDIS_PASS;
const eventQueue = new Queue('editable event', { redis: { port: REDIS_PORT, host: REDIS_HOST, password: REDIS_PASS }
});
const waitingJobs = {};
const timeout = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () { }), 60 * 1000);
eventQueue.process(function (job, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventId = job.data.eventId;
        job.timeout = timeout;
        waitingJobs[job.id] = job;
        console.log('process: ' + job.id);
    });
});
eventQueue.on('completed', function (job, result) {
    console.log(result);
});
const getJobStatus = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const job = waitingJobs[id];
        if (!job) {
            return ('Job nod found OR job already processed. Job id: ' + id);
        }
        ;
        if (job.timeout) {
            clearTimeout(job.timeout);
        }
        console.log('Job: ' + job);
    });
};
exports.getJobStatus = getJobStatus;
const addUserEdit = function (userId, eventId) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            eventId: eventId
        };
        yield eventQueue.add(data);
    });
};
exports.addUserEdit = addUserEdit;
//# sourceMappingURL=eventQueue.js.map