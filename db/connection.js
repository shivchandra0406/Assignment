const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/assignment',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    //findAndModify:false
}).then(()=>{
    console.log('DB connect...');
}).catch(err=>{
    console.log(err,"problem in connection");
})