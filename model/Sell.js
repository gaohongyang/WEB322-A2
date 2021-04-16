const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    sell:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    }
})

const sellModel = mongoose.model('sell', sellSchema);
module.exports = sellModel;