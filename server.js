const app = require('./src/app')
require('dotenv').config()

// Start the server
app.listen(process.env.PORT, () => {
    console.log('Server listening on port', process.env.PORT)
})