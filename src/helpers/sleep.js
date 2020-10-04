module.exports = (ms) => {
    return new Promise(rs => setTimeout(rs, ms))
}

