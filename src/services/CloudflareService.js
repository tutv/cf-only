const createRequester = require('../helpers/createRequester')

const CloudFlareRequester = createRequester({
    prefixUrl: 'https://www.cloudflare.com',
    responseType: 'text',
})

exports.fetchIpsV4 = () => {
    return CloudFlareRequester('ips-v4')
}

exports.fetchIpsV6 = () => {
    return CloudFlareRequester('ips-v6')
}
