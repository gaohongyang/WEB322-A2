const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    rentTitle:{
        type: Array,
        required: true
    },
    sellTitle:{
        type: Array,
        required: true
    },
    pay:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    dateCreated:
    {
        type: Date,
        default: Date.now()
    }
})

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;