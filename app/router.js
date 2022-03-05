const express = require('express')

const router = express.Router()

//import Account controller
const acont = require('./controller/account-controller')
//import Student controller
const scont = require('./controller/student-controller')
//import multer
const uploadStudentImage = require('./middleware/upload-image')
//import verifyJwtToken
const verifyJwtToken = require('./middleware/verifyJwtToken') 

//Login api
router.post('/login',acont.login)

//create student api
router.post('/insertStudent',verifyJwtToken,uploadStudentImage.single('student_img'),scont.createStudent)

//find all student record api
router.get('/getAllStudentRecord',verifyJwtToken,scont.findAllStudent)

//delete student record api
router.delete('/deleteRecord/:student_id',verifyJwtToken,scont.deleteStudentRecord)

//update student record api
router.patch('/updateStudentRecord/:student_id',verifyJwtToken,uploadStudentImage.single('student_img'),scont.updateStudent)
module.exports = router