const express=require('express');
const axios=require('axios');
const router=express.Router();
const randomstring = require("randomstring");
const request = require('request');
const jwt=require('jsonwebtoken');
var meme=require('../meme');
router.route('/images').
post(function(req,res){
  var body=req.body;
  var liked=body.liked;
  var skip=body.page;
  var v1=['education'];
  var v2=['mystery'];
  var v3=['others'];
  var v4=['game'];
  var v5=['sports'];
  var v6=['lifestyle','lazy','drunk','tired','food'];
  var v7=['love','friend','relationship','dogs'];
  var v7=['political'];
  var v8=['cartoon'];
  var v9=['celebrity'];
  var v10=['superhero'];
  var finalarray=new Array();
  liked.forEach(like=>{
    if(v1.includes(like)){
      finalarray=finalarray.concat(v1);
    }
    else if(v2.includes(like)){
      finalarray=finalarray.concat(v2);
    }
    else if(v3.includes(like)){
      finalarray=finalarray.concat(v3);
    }
    else if(v4.includes(like)){
      finalarray=finalarray.concat(v4);
    }
    else if(v5.includes(like)){
      finalarray=finalarray.concat(v5);
    }
    else if(v6.includes(like)){
      finalarray=finalarray.concat(v6);
    }
    else if(v7.includes(like)){
      finalarray=finalarray.concat(v7);
    }
    else if(v8.includes(like)){
      finalarray=finalarray.concat(v8);
    }
    else if(v9.includes(like)){
      finalarray=finalarray.concat(v9);
    }
    else if(v10.includes(like)){
      finalarray=finalarray.concat(v10);
    }
  });
  if(finalarray.length>0){
    meme.find({category: { $in: finalarray }}).then(function(memes){
    res.send(memes.slice(1,5));
    }
  
  );
}
});
router.route('/images1')
  .get(function(req,res){
    meme.find().then(function(memes){
      res.send(memes.slice(10,20));
    });
  });
module.exports=router;