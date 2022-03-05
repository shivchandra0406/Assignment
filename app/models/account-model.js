const mongoose = require('mongoose')

const AccountSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        lowercase: true,
        required:[true,'email is required field']
    },
    password:{
        type:String,
        minLength:8,
        required:[true,'email is required field']
    },
    accountType:{
        type:String,
        enum:[1,0],
        required:[true,'accountType is required field']
    }
})
module.exports = mongoose.model('Account',AccountSchema,'account')