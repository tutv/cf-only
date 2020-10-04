const got = require('got')

exports.createRequester = (options = {}) => {
    const defaultOptions = {
        method: 'GET',
        timeout: 120 * 1000,
        responseType: 'json',
        resolveBodyOnly: true,
    }

    const mergedOptions = got.mergeOptions(defaultOptions, options)

    return got.extend(mergedOptions)
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
