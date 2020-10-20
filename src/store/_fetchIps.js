const {fetchIpsV4, fetchIpsV6} = require('../services/CloudflareService')
const _parseIPs = require('../helpers/_parseIPs')

const _fetchIps = async () => {
    const [ipsV4Raw, ipsV6Raw] = await Promise.all([fetchIpsV4(), fetchIpsV6()])

    const _ipsV4 = _parseIPs(ipsV4Raw)
    const _ipsV6 = _parseIPs(ipsV6Raw)

    return [_ipsV4, _ipsV6]
}

module.exports = _fetchIps

