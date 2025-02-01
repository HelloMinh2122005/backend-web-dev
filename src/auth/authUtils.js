'use strict'

const jwt = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // access token
        const accessToken = jwt.sign(payload, privateKey, { expiresIn: '2 days', algorithm: 'RS256' })
        // refresh token
        const refreshToken = jwt.sign(payload, privateKey, { expiresIn: '7 days', algorithm: 'RS256' })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    createTokenPair
}