const schedule = require('node-schedule')

const decorateCallback = (job, rule, callback) => async () => {
    try {
        job.cancel()
        job.cancelNext()

        await Promise.resolve(callback())

        job.reschedule(rule)
    } catch (error) {
        console.log(`WARNING: Unhandled scheduler`, error)
    }
}

exports.schedule = (name, rule, callback) => {

    const job = schedule.scheduleJob(name, rule, () => {})

    const decoratedCallback = decorateCallback(job, rule, callback)

    job.job = decoratedCallback

    return job
}
