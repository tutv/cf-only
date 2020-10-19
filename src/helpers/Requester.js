// const request = require('request')
const https = require('https')

const request = (options) => {

    // console.log(options)

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            // console.log('statusCode:', res.statusCode);
            // console.log('headers:', res.headers);

            let data = ''

            res.on('data', (d) => {
                data += d
            })

            res.on('end', () => {
                resolve(data)
            })
        })

        req.on('error', (e) => {
            reject(e)
        })

        req.end()
    })
}

const _parseUrl = (url) => {
    const detector = /^(((https?:)\/\/)?([^\/]+))?(\/.*)?$/gi

    const parsed = detector.exec(url)

    if (!parsed) throw new Error(`Cannot parse ${url}`)

    const [, uri, , protocol, hostname, path] = parsed

    return {uri, protocol, hostname, path}
}

const got = (options) => {

    options = Object.assign({port: 443, path: '/', method: 'GET'}, options)

    if (options.hostname) {
        const {uri: _uri, hostname} = _parseUrl(options.hostname)
        // options.uri = _uri
        options.hostname = `${hostname}`
    }

    // delete options.hostname

    return (url) => {
        let uri = options.uri || ''

        const {uri: _uri, path, hostname, port} = _parseUrl(url)

        const parsedOpts = Object.assign({}, options)

        // if (_uri) {
        //     uri = _uri
        // }

        // if (!uri) throw new Error('Missing URI')

        if (hostname) {
            parsedOpts.hostname = hostname
        }

        if (path) {
            parsedOpts.path = path
        }

        if (port) {
            parsedOpts.port = port
        }

        return request(parsedOpts)

        // if (path) {
        //     uri += path
        // } else {
        //     uri += '/'
        // }

        // parsedOpts.uri = uri

        // return new Promise((resolve, reject) => {
        //     console.log(parsedOpts)
        //     const req = request(parsedOpts, (error, response, body) => {
        //         if (error) {
        //             reject(error)

        //             return
        //         }
        //         if (response.statusCode >= 400 && response.statusCode < 600) {
        //             const _error = new Error(body)
        //             _error.statusCode = response.statusCode
        //             reject(_error)

        //             return
        //         }

        //         resolve(body)
        //     })
        // })
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
