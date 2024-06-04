const express=require('express');
const Router=express.Router();
const path=require('path');

Router.use(express.static(path.join(__dirname,'../public')));

Router.get('/home',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../final/home.html'))
});

module.exports=Router;