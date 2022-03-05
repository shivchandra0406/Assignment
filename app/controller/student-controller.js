const Student = require('../models/student-model')
const fs = require('fs')

function errorValidation(email,mobileNumber,username){
    const Error = {}
    const emailregrex  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const number_regrex = /^\d+$/
    const usernameregrex = /^[A-Za-z]+$/
    if(emailregrex.test(email)===false){
        Error['email'] = 'Email is not Valid'
    }
    //console.log(mobileNumber.length ,typeof username);
    if(mobileNumber.length===10){
        if(number_regrex.test(mobileNumber)===false){
            Error['mobileNumber'] = 'mobileNumber only digit allowed'
        }
    }else{
        Error['mobileNumber'] = 'Maximum and Minimum 10 digit allowed'
    }
    console.log(username.length);
    if(username.length>=4 && username.length<=12){
        if(usernameregrex.test(username)===false){
            Error['username'] = 'username only character allowed'
        }
    }
    else{
        Error['username'] = 'username length only allowed greatter than equal to 4 and less than equal to 12 '
    }
    if(Error.email ||Error.mobileNumber ||Error.username){
        return {Status:true,Error}
    }else{
        return {Status:false}
    }

}


class StudentController{

    //create Student Record START
    async createStudent(req,res){
        try{
            if(req.file){
                const data = req.body
                data.student_img = req.file.filename
                const result = await Student.create(data)
                return res.status(200).json({Status:true,message:'Student Inserted successfully',result})
            }else{
                return res.status(406).json({message:'Please choose student image'})
            }
        }catch(err){
            console.log('create student error',err.message);
            const Error={}
            if(err.message.includes('Student validation failed')){
                Object.values(err.errors).forEach(properties=>{
                        //errors[properties.path]=properties.message
                        if(properties.path === 'mobileNumber.0'){
                            Error['mobileNumber']='mobileNumber only digit allowed'
                        }
                        else{
                            Error[properties.path]=properties.message
                        }
                })
            }else if(err.message.includes('E11000 duplicate key error collection')){
                return res.status(400).json({Status:false,message:'mobileNumber is already exist'})     
            }
        return res.status(400).json({Status:false,Error})
        }
    }
    //Create Student Record START

    //Find All Student Record SATRT 
    async findAllStudent(req,res){
        try{
            const data = await Student.find()
            return res.status(200).json({Status:true,data})
        }catch(err){
            console.log('Find All Student Error',err.message);
            return res.status(400).json({message:'somthing went wrong'})
        }
    }
    //Find All Student Record END

    //Delete single document START
    async deleteStudentRecord(req,res){
        try{
           const {student_id} = req.params
           const result = await Student.findByIdAndRemove({_id:student_id})
           if(result){
              const s = result.student_img.split('/')[4]
              let path1 =`./StudentImage/${s}`
              fs.unlink(path1,(err)=>{
                  if(err)
                    return
              })
              return res.status(200).json({Status:true,message:'Student delete successfully',result})
           }else{
                return res.status(406).json({Status:false,message:'Student not found'})
           }
        }catch(err){
            console.log('delete student error',err);
            return res.status(400).json({Status:'Error',message:'somthing went wrong'})
        }
    }
    //Delete single document END

    
    //Update Student Record START
    async updateStudent(req,res){
        try{
            const {student_id} = req.params
            const {studentName,mobileNumber,email,username} = req.body
            if(!studentName || !mobileNumber || !email ||!username){
                return res.status(406).json({Status:false,message:'studentName,mobileNumber,email and username are requird fields'})
            }
            else{
                const validation  = errorValidation(email,mobileNumber,username)
                if(validation.Status===true){
                    return res.status(406).json(validation)
                }
                const data = {
                    studentName,
                    email,
                    mobileNumber,
                    username
                }
                if(req.file){
                    data.student_img = req.file.filename
                    let result = await Student.findById(student_id)
                    if(result){
                        let img = result.student_img.split('/')[4]
                       fs.unlink(`./StudentImage/${img}`,(err)=>{
                           if(err)
                            return
                       })             
                    }
                    result = await Student.findByIdAndUpdate(student_id,{$set:data},{new:true})
                    return res.status(200).json({Status:true,message:'Update successfully',result})
                }else{
                    var result = await Student.findByIdAndUpdate(student_id,{$set:data},{new:true})
                    return res.status(200).json({Status:true,message:'Update successfully',result})
                }
            }
        }catch(err){
            console.log(err);
            return res.status(400).json({Stauts:'Error',message:'somting went wrong'})
        }
            
    }

}
module.exports = new StudentController()