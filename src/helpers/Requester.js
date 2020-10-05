const request = require('request')

const _parseUrl = (url) => {
    const detector = /^(((https?:)\/\/)?(www\.)?([^\/]+))?(\/.*)?$/gi

    const parsed = detector.exec(url)

    if (!parsed) throw new Error(`Cannot parse ${url}`)

    const [, uri, , protocol, www, hostname, path] = parsed

    return {uri, protocol, hostname, path}
}

const got = (options) => {
    if (options.hostname) {
        const {uri: _uri} = _parseUrl(options.hostname)
        options.uri = _uri
    }

    delete options.hostname

    return (url) => {
        let uri = options.uri || ''

        const {uri: _uri, path} = _parseUrl(url)

        if (_uri) {
            uri = _uri
        }

        if (!uri) throw new Error('Missing URI')

        if (path) {
            uri += path
        } else {
            uri += '/'
        }

        const parsedOpts = Object.assign({}, options)
        parsedOpts.uri = uri

        return new Promise((resolve, reject) => {
            console.log(parsedOpts)
            const req = request(parsedOpts, (error, response, body) => {
                if (error) {
                    reject(error)

                    return
                }
                if (response.statusCode >= 400 && response.statusCode < 600) {
                    const _error = new Error(body)
                    _error.statusCode = response.statusCode
                    reject(_error)

                    return
                }

                resolve(body)
            })
        })
    }

}
exports.createRequester = (options = {}) => {
    const defaultOptions = {
        method: 'GET',
        // timeout: 120 * 1000,
        port: 443,
    }

    const mergedOptions = Object.assign(defaultOptions, options)

    return got(mergedOptions)
}

exports.parseResponse = (response) => {
    if (typeof response !== 'object') {
        throw new Error('Response is invalid.')
    }

    const {success, message} = response

    if (!success) {
        throw new Error(message)
    }

    return response
}
