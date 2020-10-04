const ranges = require('../src/store/ip-ranges')
const sleep = require('../src/helpers/sleep')


setImmediate(async () => {
    try {
        const allIps = ranges.allIPs()
        console.log('allips', allIps)

        await sleep(1000 * 10)

        console.log(ranges.allIPs())

        process.exit(0)
    } catch (e) {
        console.log(e)
        process.exit(1)

    }
})
