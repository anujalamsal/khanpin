const express=require('express');
// const { Module } = require('module');
const Router=express.Router();
const path=require('path');

Router.get('/forgot_p',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../final/forgotpassword.html'))
});


module.exports=Router;