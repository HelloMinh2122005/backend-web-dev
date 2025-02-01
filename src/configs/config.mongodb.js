const config = {
    app: {
        port: process.env.PORT
    },
    db: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME
    }
}

module.exports = config