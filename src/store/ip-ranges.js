const _parseIPs = require('../helpers/_parseIPs')


const _ipv4 = `
173.245.48.0/20
103.21.244.0/22
103.22.200.0/22
103.31.4.0/22
141.101.64.0/18
108.162.192.0/18
190.93.240.0/20
188.114.96.0/20
197.234.240.0/22
198.41.128.0/17
162.158.0.0/15
104.16.0.0/12
172.64.0.0/13
131.0.72.0/22
`

const _ipv6 = `
2400:cb00::/32
2606:4700::/32
2803:f800::/32
2405:b500::/32
2405:8100::/32
2a06:98c0::/29
2c0f:f248::/32
`

const ipv4s = _parseIPs(_ipv4)
const ipv6s = _parseIPs(_ipv6)


const _allIPs = [].concat(ipv4s, ipv6s)

exports.ipv4s = () => ipv4s
exports.ipv6s = () => ipv6s
exports.allIPs = () => _allIPs

