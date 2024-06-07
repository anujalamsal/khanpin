const express=require('express');
const Router=express.Router();
const path=require('path');
const Suggestion=require('../source/models/suggestion');

// const app=express();
// app.set('views',path.join(__dirname,'../views'));
// app.use(express.static(path.join(__dirname,'../public')));
// app.set('view engine', 'ejs');


// Router.get('/recommendation',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'../final/recommendation.html'))
// });

Router.post('/recommendation',async(req,res)=>{
    // console.log(req.body.msg);
    try {
        const suggestions = await Suggestion.find().exec(); 
        res.render('recommendation', { suggestions: suggestions });
        // res.redirect('/recommendation')
      } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving suggestions');
      }
    }

)

module.exports=Router;