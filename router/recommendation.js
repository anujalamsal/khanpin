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
    
  const user_id=req.body.user_id;

    try {
        const suggestions = await Suggestion.find().exec(); 
        console.log(suggestions);
        res.render('recommendation', { suggestions: suggestions, user_id:user_id });
        // res.redirect('/recommendation')
      } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving suggestions');
      }
    }

)

module.exports=Router;