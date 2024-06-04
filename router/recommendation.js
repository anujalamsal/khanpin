const express=require('express');
const Router=express.Router();
const path=require('path');

Router.get('/recommendation',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../final/recommendation.html'))
});

module.exports=Router;