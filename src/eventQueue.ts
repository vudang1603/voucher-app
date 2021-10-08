const Queue = require('bull');

const REDIS_PORT = process.env.REDIS_PORT
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PASS = process.env.REDIS_PASS

const eventQueue = new Queue('editable event', 
    { redis: 
        { port: REDIS_PORT, host: REDIS_HOST, password: REDIS_PASS }
    });

const waitingJobs = {

}
    
const timeout = setTimeout(async ()=>{}, 60 * 1000);
 

eventQueue.process(async function (job, done) {
    const eventId= job.data.eventId;
    job.timeout = timeout;
    waitingJobs[job.id] = job;
    console.log('process: '+job.id);
})


eventQueue.on('completed', function (job, result) {
    console.log(result)
  })

export const getJobStatus = async function (id){
    const job = waitingJobs[id];
    if (!job) {        
        return('Job nod found OR job already processed. Job id: ' + id)
    };
    if (job.timeout) {
        clearTimeout(job.timeout)
    }
    console.log('Job: '+ job);
}

export const addUserEdit = async function(userId, eventId){
    const data = {
        eventId: eventId
    }
    await eventQueue.add(data);
}