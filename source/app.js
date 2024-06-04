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

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../final/index.html'))
});


app.get('/signup',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../final/signup.html'))
});

app.get('/home',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../final/home.html'))
})

app.get('/forgot_p',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../final/forgotpassword.html'))
})


app.get('/recommendation.html',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../final/recommendation.html'))
})

app.get('/map.html',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../final/map.html'))
})


app.post('/signup',async (req,res)=>{
    const password=req.body.password;
    const cpassword=req.body.cpassword;
    try {
    

    if(password===cpassword)
        {

            const registerUser=new Register({
                username:req.body.username,
                email:req.body.email,
                password:password,
                cpassword:cpassword
            })

            const registered= await registerUser.save();
            res.status(201).sendFile(path.resolve(__dirname,'../final/home.html'))
        }

        else
        {
            res.send('Password are not matching');
        }

} catch (error) {
    res.status(400).send(error);
}
});

app.post("/login",async(req,res)=>{

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


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})