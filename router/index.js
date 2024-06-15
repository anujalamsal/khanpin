const express=require('express');
const Router=express.Router();
const path=require('path');
const Register=require("../source/models/registers");
const bcrypt=require('bcryptjs');
require('../source/db/connect');
const cookieParser=require("cookie-parser");
Router.use(express.static(path.join(__dirname,'../public')));

Router.use(cookieParser());

Router.get('/',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../final/index.html'))
    });

Router.post('/',async(req,res)=>{

    
        try {
            const username=req.body.username;
            const password=req.body.password;
            const Username=await Register.findOne({username});

            const isMatch=bcrypt.compare(password,Username.password);
    
            const token=await Username.generateAuthToken();
            console.log('Token part is '+token);

            res.cookie("jwt",token,{
                expires:new Date(Date.now()+600000),
                httpOnly:true,
                // secure:true
            });
            console.log(`This is the cookie ${req.cookies.jwt}`);
            // console.log('Cookie is saved');
    
        if(isMatch)
        {

            // res.status(201).sendFile(path.resolve(__dirname,'../final/home.html'));
            res.redirect('/home')

        }

        else
        {
            res.send('Invalid Login Details');
        }




        } 
    
        
        catch (error) {
            res.status(400).send("Invalid Username")
        }
    
    
    
    
});
    


module.exports=Router;