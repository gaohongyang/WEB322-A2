const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    rent:{
        type: String,
        required: true
    },
    time:{
        type: String,
        default: "1 Month"
    },
    location:{
        type: String,
        default: "Oakville"
    },
    userId:{
        type: String,
        required: true
    }
})

const rentModel = mongoose.model('rent', rentSchema);
module.exports = rentModel;