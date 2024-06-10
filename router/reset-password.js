const express=require('express');
const Router=express.Router();
const Register=require("../source/models/registers");
const path=require('path');
const bcrypt=require('bcrypt');
const expressJson=express.json();

Router.use(expressJson)

Router.get('/reset-password/:token', (req, res) => {
    const token = req.params.token;
    console.log(token);
    Register.findOne({ tokens: token })
   .then(user => {
    console.log(user); 
    if (!user) {
            return res.status(401).send({ error: 'Invalid token' });
        }
        else
        {

        }
        res.sendFile(path.resolve(__dirname, '../final/resetpassword.ejs'));
    })
   .catch(err => {
        console.log(token); 
        res.status(401).send({ error: 'Invalid '+ err });
    });
});

Router.post('/reset-password', async (req, res) => {
    try {
        if (req.body.password === req.body.cpassword) {
            
            const token = req.body.token;
            console.log(token);
            Register.findOne({ tokens: token })
           .then(async (user) => {
                if (!user) {
                    return res.status(401).send({ error: 'Invalid token' });
                }
                const password = req.body.password;
                const newPassword = await bcrypt.hash(password, 10);
                const userData = await Register.findByIdAndUpdate({ _id: user._id }, { $set: { password: newPassword } }, { new: true });
                res.status(200).send({ success: true, msg: "User password has been reset", data: userData });
            })
           .catch(err => {
                console.log(token);
                res.status(401).send({ error: 'Invalid token' });
            });
        } else {
            res.status(400).send({ success: false, msg: 'Passwords do not match' });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
});

module.exports=Router;