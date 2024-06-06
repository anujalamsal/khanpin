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
const button=require('../router/button')

const Details=require('./models/food_details');
const authenticData=require('./data_for_db/authentic_data');
const genericData=require('./data_for_db/generic_data');

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

app.use('/',index);

app.use('/',signup);

app.use('/',home);

app.use('/',forgotpassword);

app.use('/',recommendation);

app.use('/',map);

app.use('/',resetpassword);

app.use('/',button);

















app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})