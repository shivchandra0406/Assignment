const multer  = require('multer')
var fs = require('fs');
var path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = './StudentImage/'
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir,{ recursive: true });
        }
      cb(null, dir)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
    }
  })
  
  const uploadStudentImage = multer({ 
        storage: storage,
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png/;
            const mimetype = fileTypes.test(file.mimetype);
            const extname = fileTypes.test(path.extname(file.originalname));
            if (mimetype && extname) {
              return cb(null, true);
            }
            cb("Please upload the image jpeg,jpg and png type");
          }
    })

  module.exports  = uploadStudentImage