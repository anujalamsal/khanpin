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

const Details=require('./models/food_details');
const authenticData=require('./data_for_db/authentic_data');
const genericData=require('./data_for_db/generic_data');



app.use('/',index);

app.use('/',signup);

app.use('/',home);

app.use('/',forgotpassword);

app.use('/',recommendation);

app.use('/',map);

app.use('/',resetpassword);

authenticData.forEach((data) => {
    const detail = new Details({
      name: data.name,
      taste: data.taste,
      province: data.province,
      image: data.img,
      link: data.link,
      type: 'authentic', // assuming you want to store the type as 'authentic'
    });
    detail.save((err)=> {
        if (err) {
          console.error(`Error saving ${data.name}: ${err}`);
        } else {
          console.log(`Saved ${data.name}`);
        }
      });
    });

    genericData.forEach((data) => {
        const detail = new Details({
          name: data.name,
          taste: data.taste,
          province: data.province,
          image: data.img,
          link: data.link,
          type: 'generic', // assuming you want to store the type as 'generic'
        });
        detail.save((err) => {
          if (err) {
            console.error(`Error saving ${data.name}: ${err}`);
        } else {
          console.log(`Saved ${data.name}`);
        }
      });
    });
  


















app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})