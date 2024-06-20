require('dotenv').config();
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
const resetpassword=require('../router/reset-password');
const button=require('../router/button');
const signout=require('../router/signout');


const Details=require('./models/food_details');
const authenticData=require('./data_for_db/authentic_data');
const genericData=require('./data_for_db/generic_data');

app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// console.log(process.env.SECRET_KEY);

authenticData.forEach((data) => {
  Details.findOne({ name: data.name }).exec()
 .then((foundData) => {
    if (foundData) {
      console.log('User already exists');
    } else {
      const detail = new Details({
        name: data.name,
        taste: data.taste,
        province: data.province,
        image: data.img,
        link: data.link,
        type: 'authentic',
        level:data.level
      });
      detail.save();
    }
  })
 .catch((err) => {
    console.error(err);
  });
});

genericData.forEach((data) => {
  Details.findOne({ name: data.name }).exec()
 .then((foundData) => {
    if (foundData) {
      console.log('User already exists');
    } else {
      const detail = new Details({
        name: data.name,
        taste: data.taste,
        province: data.province,
        image: data.img,
        link: data.link,
        type: 'generic',
        level: data.level
      });
      detail.save();
    }
  })
 .catch((err) => {
    console.error(err);
  });
});




//   const userVar=await jwt.verify(token,"thisprojectiscreatedforpromotionofauthenticfood");
//   console.log(userVar)

// }



app.use('/',index);

app.use('/',signup);

app.use('/',home);

app.use('/',forgotpassword);

app.use('/',recommendation);

app.use('/',map);

app.use('/',resetpassword);

app.use('/',button);

app.use('/',signout);


app.post('/getElement',async(req,res)=>{
  let payload=req.body.payload.trim();
  // console.log(payload);
  let search=await Details.find({name:{$regex:new RegExp('^'+payload+'.*','i')}}).exec();
  search=search.slice(0,10);
  res.send({payload:search});
})


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})