const express=require('express');
const Router=express.Router();  
const path=require('path');
const Register=require("../source/models/registers");
const cookieParser=require("cookie-parser");
Router.use(cookieParser());

Router.get('/signup',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../final/signup.html'))
    // res.render("/signup")
});

Router.post('/signup',async (req,res)=>{
    
    const password=req.body.password;
    const cpassword=req.body.cpassword;
    console.log('Done');
    // console.log(res);
    try {
        // console.log(res);
    console.log("Signup Page done");
    if(password===cpassword)
        {
            // console.log(res);
            const registerUser=new Register({
                username:req.body.username,
                email:req.body.email,
                password:password,
                cpassword:cpassword
            })

            const token=await registerUser.generateAuthToken();
            console.log('Token part is '+token);

        

            const register_part=await registerUser.save();
            console.log(register_part);

            res.cookie("jwt",token,{
                expires:new Date(Date.now()+6000000),
                httpOnly:true,
                // secure:true
            });
            console.log('Cookie is saved');

            
            // res.status(201).sendFile(path.resolve(__dirname,'../final/home.html'))
            res.status(201).redirect('/home');
        }

        else
        {
            res.send('Password are not matching');
        }

} catch (error) {
    
    
    res.status(400).send(error);
    console.log('the error part page'+error);
}
});

module.exports=Router;