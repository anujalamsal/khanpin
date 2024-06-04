const express=require('express');
const Router=express.Router();
const path=require('path');

Router.get('/map',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../final/map.html'))
});

module.exports=Router;