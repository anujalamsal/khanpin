const express=require('express');
const app=express();
const port=process.env.PORT || 3;
const path=require('path');

require('./db/connect');


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

app.use('/',map);


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})