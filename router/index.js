const express=require('express');
const Router=express.Router();
const path=require('path');
const Register=require("../source/models/registers");
const bcrypt=require('bcryptjs');
require('../source/db/connect');

Router.get('/',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../final/index.html'))
    });

Router.post("/",async(req,res)=>{

        try {
            const username=req.body.username;
            const password=req.body.password;
            const Username=await Register.findOne({username});
    
            const isMatch=bcrypt.compare(password,Username.password);
        
    
        if(isMatch){
                res.status(201).sendFile(path.resolve(__dirname,'../final/home.html'))
            
        }
        else{
            res.send('User not found');
        }
    
        } 
    
        
        catch (error) {
            res.status(400).send("Invalid Username")
        }
    
    
    
    
});
    


module.exports=Router;