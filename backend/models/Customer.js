const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    name: {
        first: String,
        last: String
    },
    birthday: String,
    gender: String,
    lastContact: { type: Date, default: Date.now },
    customerLifetimeValue: Number
})

const Customer = mongoose.model('Customer', CustomerSchema)

module.exports = Customer