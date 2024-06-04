const express=require('express');
const app=express();
const port=process.env.PORT || 3;
const path=require('path');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
require('./db/connect');
const Register=require("./models/registers");

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'../public')));

const index=require('../router/index');
const signup=require('../router/signup');
const home=require('../router/home');
const recommendation=require('../router/recommendation');
const forgotpassword=require('../router/forgotpassword');
const map=require('../router/map');


app.use('/',index);

app.use('/',signup);

app.use('/',home);

app.use('/',forgotpassword);

app.use('/',recommendation);

// app.get('/home',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'../final/home.html'))
// })



app.use('/',map);



// app.post("/login",async(req,res)=>{

//     try {
//         const username=req.body.username;
//         const password=req.body.password;
//         const Username=await Register.findOne({username});

//         const isMatch=bcrypt.compare(password,Username.password);
    

//     if(isMatch){
//             res.status(201).sendFile(path.resolve(__dirname,'../final/home.html'))
        
//     }
//     else{
//         res.send('User not found');
//     }

//     } 

    
//     catch (error) {
//         res.status(400).send("Invalid Username")
//     }




// });


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})