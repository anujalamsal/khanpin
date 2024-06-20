const express=require('express');
const Router=express.Router();
const auth=require('../source/middleware/auth');
const path=require('path');

Router.post('/signout',auth,async(req,res)=>{
    try {
        console.log(req.user);
        res.clearCookie("jwt");
        console.log("Logout Successfully");
        await req.user.save();
        res.sendFile(path.resolve(__dirname, '../final/index.html'));
        // res.sendFile(path.resolve(__dirname, '../final/resetpassword.html'));
        

    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports=Router;