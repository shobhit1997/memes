// const path= require('path');
// const publicPath = path.join(__dirname,'../public');
const express=require('express');
const  app=express();
const bodyParser=require('body-parser');
// const formRouter=require('./routes/formRouter');
const loginRouter=require('./routes/loginRoute');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
var json2xls = require('json2xls');
// app.use(express.static(publicPath));
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'x-auth');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,content-type, Accept , x-auth , username , token');
  
	next();
});
app.use(json2xls.middleware);
app.use('/api/data',loginRouter);
// app.use('/api/form',formRouter);
module.exports=app;