const crypto = require('crypto')

exports.hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('base64')
}