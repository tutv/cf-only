const getUserIP = (req) => {
    const IP = req.ip
    const forwarded = req.headers['x-forwarded-for']

    if (forwarded) {
        if (forwarded.indexOf(',') === -1) {
            return forwarded
        }

        const ips = forwarded.split(',')
        return ips ? ips[0] : IP
    }

    return req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        IP
}

exports.getUserIP = getUserIP