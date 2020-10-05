const Schedule = require('../helpers/Schedule')
const _fetchIps = require('./_fetchIps')
const sleep = require('../helpers/sleep')

// const EVERY_HOUR = '0 0 */1 * * *'
const EVERY_HOUR = 1000 * 60 * 60
const MAXIMUM_RETRIES = 5

const renewListIp = stores => () => {
    return new Promise(async (resolve, reject) => {
        let retry = 0

        const run = async () => {
            console.log(`STARTING FETCH NEW CLOUDFLARE IPs...`)
            try {
                const [ipsV4, ipsV6] = await _fetchIps()

                stores.ipsV4 = ipsV4
                stores.ipsV6 = ipsV6
                stores.allIPs = [].concat(ipsV4, ipsV6)

                resolve(true)

                console.log(`FETCHED...`)
            } catch (e) {
                console.log('Failed to renew cloudflare ip: ', e.message)

                if (retry > MAXIMUM_RETRIES) {
                    console.log('MAXIMUM_RETRIES')

                    reject(false)

                    return false
                }

                console.log(`RETRY...${retry}`)

                await sleep(1000 * 2)

                retry++

                run()
            }
        }

        run()
    })
}

module.exports = (stores) => {
    Schedule.schedule('RENEW_LIST_IP', EVERY_HOUR, renewListIp(stores))
    // Schedule.schedule('RENEW_LIST_IP', 1000 * 2, renewListIp(stores))

    return true
}
