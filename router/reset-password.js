const express=require('express');
const Router=express.Router();
const Register=require("../source/models/registers");
const path=require('path');

Router.get('/reset-password',async(req,res)=>{
    res.sendFile(path.join(__dirname,'../final/resetpassword.html'));
    try {
        const token=req.query.token;
        const tokenData=await Register.findOne({token});
        if(tokenData)
        {
            const password=req.body.password;
            const newPassword=await bcrypt.hash(password,10);
           const userData= await Register.findByIdAndUpdate({_id:tokenData._id},{$set:{password:newPassword}},{new:true})
            res.status(200).send({success:true,msg:"User password has been reset",data:userData})
        }
        else{
            res.status(200).send({success:true,msg:'This link has been expired'});
        }
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
})

module.exports=Router;