'use strict'

const mongoose = require('mongoose')
const { db: { port, host, name } } = require('../configs/config.mongodb')

const connectionString = `mongodb://${host}:${port}/${name}`;

class Database {
    constructor() {
        this._connect()
    }

    _connect(type = 'mongodb') {
        mongoose.connect(connectionString, {
            maxPoolSize: 100
        }).then(_ => {
            console.log('Database connected')
        }).catch(err => {
            console.error('Database connection ERROR: ', err)
        })
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Database()
        }
        return this.instance
    }
}

module.exports = Database.getInstance()