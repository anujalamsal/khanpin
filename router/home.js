const express=require('express');
const Router=express.Router();
const path=require('path');
require('dotenv').config();
const jwt=require('jsonwebtoken');
const Register=require("../source/models/registers");
const auth=require('../source/middleware/auth');
Router.use(express.static(path.join(__dirname,'../public')));


Router.get('/home',auth,(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'../final/home.html'))
    console.log('router handler called');
    res.render("home", { user_id: req.user_id });
});

module.exports=Router;