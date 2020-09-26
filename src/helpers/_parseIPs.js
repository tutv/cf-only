module.exports = (str) => {
    if (!str || typeof str !== 'string') return []

    return str.split('\n')
        .map(str => str.trim())
        .filter(Boolean)
}

