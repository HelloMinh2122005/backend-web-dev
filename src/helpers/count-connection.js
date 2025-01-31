'use strict'
const os = require('os')
const process = require('process')
const mongoose = require('mongoose')
const _SECONDS = 5000

const getNumConnections = () => {
    const numConnections = mongoose.connections.length
    console.log(`Number of connections: ${numConnections}`)
    return numConnections
}

const checkOverLoad = () => {
    setInterval(() => {
        const numConnections = getNumConnections()
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
        const maxConnection = numCores * 5 // 5 connections per core

        console.log('Number connections: ', numConnections)
        console.log('Number of cores: ', numCores)
        console.log('Memory usage: ', memoryUsage / 1024 / 1024, 'MB')
        if (numConnections > maxConnection) {
            console.log(`Server is overloading. Number of connections: ${numConnections}`)
            console.log(`Number of cores: ${numCores}`)
            console.log(`Memory usage: ${memoryUsage}`)
        }
    }, _SECONDS)
}

module.exports = {
    getNumConnections,
    checkOverLoad
}