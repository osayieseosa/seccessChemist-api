const mongoose = require('mongoose')

const drugSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true
    },
    price: {
        type: Number,
        required: true
    },
    comnName: {
        type: String,
        default: "none"
    },
    desc: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Drug',drugSchema)