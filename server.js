const express = require('express')
require('dotenv').config()

const app = express();
app.use(express.json());
//var cookieParser = require('cookie-parser')
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

require('./db/connection')
//require router
app.use(require('./app/router'))
app.use('/StudentImage',express.static('StudentImage'))

app.get('/',(req,res)=>{
    return res.status(200).json({message:'Welcome'})
})

const port = process.env.PORT ||3000

app.listen(port,()=>{
    console.log(`server listing port ${port}`);
})


