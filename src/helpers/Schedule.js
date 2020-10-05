class Job {
    constructor(name, rule, callback) {
        this.callback = callback
        this.name = name
        this.rule = rule

        this._timeout = null
    }

    reschedule(rule) {
        this.cancel(false)

        this.rule = rule || this.rule

        this.schedule()
    }

    schedule() {
        this._timeout = setTimeout(() => {
            this.callback()
        }, this.rule)
    }

    cancel(reschedule) {
        reschedule = (typeof reschedule == 'boolean') ? reschedule : false

        if (this._timeout) {
            clearTimeout(this._timeout)
        }

        if (reschedule) {
            this.schedule()
        }
    }

    cancelNext(reschedule) {
        reschedule = (typeof reschedule == 'boolean') ? reschedule : false

        if (this._timeout) {
            clearTimeout(this._timeout)
        }

        if (reschedule) {
            this.schedule()
        }
    }

}

const schedule = {
    scheduleJob: function (name, rule, callback) {
        const job = new Job(name, rule, callback)

        job.schedule()

        return job
    }
}

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

    job.callback = decoratedCallback

    return job
}
