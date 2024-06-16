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

    Router.post('/', async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const Username = await Register.findOne({ username });
    
            if (!Username) {
                res.status(400).send("Invalid Username");
                return;
            }
    
            const isMatch = await bcrypt.compare(password, Username.password);
    
            if (isMatch) {
                const token = await Username.generateAuthToken();
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 6000000),
                    httpOnly: true,
                    // secure:true
                });
                res.redirect('/home');
            } else {
                res.send('Invalid Login Details');
            }
        } catch (error) {
            res.status(400).send("Error occurred");
        }
    });
    


module.exports=Router;