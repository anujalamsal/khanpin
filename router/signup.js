const express=require('express');
const Router=express.Router();  
const path=require('path');
const Register=require("../source/models/registers");


Router.get('/signup',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../final/signup.html'))
});

Router.post('/signup',async (req,res)=>{
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

module.exports=Router;