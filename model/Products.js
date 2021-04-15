const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    smallPoster:{
        type: String
    },
    largePoster:{
        type: String
    },
    rentPrice:{
        type: Number,
        required: true
    },
    sellPrice:{
        type: Number,
        required: true
    },
    featured:{
        type: Boolean,
        required: true
    },
    dateCreated:{
        type: Date,
        default: Date.now()
    }
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;