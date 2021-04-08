const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    postalCode:{
        type: String,
        required: true
    },
    phone:{
        type: String
    },
    dateCreated:
    {
        type: Date,
        default: Date.now()
    },
    type:{
        type:String,
        default: "User"
    }
});

userSchema.pre("save", function(next){
    //salt random generated characters or strings
    bcrypt.genSalt(10)
    .then((salt)=>{
        bcrypt.hash(this.password, salt)
        .then((encryptPassword=>{
            this.password = encryptPassword;
            next();
        }))
        .catch(err=>console.log(`Error occurred when hashing ${err}`))
    })
    .catch(err=>console.log(`Error occurred when salting ${err}`))
})
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;