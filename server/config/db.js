const mongoose = require('mongoose')
module.exports = () => {

    try {
        mongoose.connect(process.env.DB_URI)
        console.log('Connected to MONGODB! COOL')
    } catch (error) {
        console.log('MONGODB Connecion Error -->', error.message)
        process.exit(1)

    }
}