const mongoose = require('mongoose');

const StudenSchema = new mongoose.Schema({
    studentName:{
        type:String,
        trim:true,
        required:[true,'student name is required field']
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        required:[true,'email is required field'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address is not valid']
    },
    mobileNumber:{
        type:Number,
        required:[true,'mobileNumber is required field'],
        unique:true,
        validate: {
            validator: (number) =>{
                var num = number
                console.log(number,num.toString().length);
                if(num.toString().length===10)
                    return number
                else
                    throw new Error('Minimum and Maximum only 10 digits allowed')
            }
          }
    },
    username:{
        type:String,
        minLength:4,
        maxLength:25,
        required:[true,'username is required field'],
        match:[/^[A-Za-z]+$/,'Only allowed character']
    },
    student_img:{
        type:String,
        required:[true,'student image is required field'],
        get:(image)=>{
            if(image){
                return `${process.env.FILE_LOCATION}${image}`
            }
            return;
        }
    }
},{timestamps:true})

StudenSchema.set('toJSON',{getters:true})

module.exports =mongoose.model('Student',StudenSchema,'student')