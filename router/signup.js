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

            console.log('the success part is'+registerUser);

            const token=await registerUser.generateAuthToken();
            console.log('the token part is '+token);

             await registerUser.save();

             res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 31536000000 
              });
              
            res.status(201).sendFile(path.resolve(__dirname,'../final/home.html'))
        }

        else
        {
            res.send('Password are not matching');
        }

} catch (error) {
    

    res.status(400).send(error);
    console.log('the error part page');
}
});

module.exports=Router;