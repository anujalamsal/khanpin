const express=require('express');
const Router=express.Router();
const path=require('path');
const Suggestion=require('../source/models/suggestion');
const bodyParser = require('body-parser');
// const Register=require('../source/models/registers');
const auth=require('../source/middleware/auth')

Router.use(bodyParser.urlencoded({ extended: false }));

// const app=express();
// app.set('views',path.join(__dirname,'../views'));
// app.use(express.static(path.join(__dirname,'../public')));
// app.set('view engine', 'ejs');


// Router.get('/recommendation',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'../final/recommendation.html'))
// });

const getUserIdMiddleware = (req, res, next) => {
  res.locals.user_id = req.user._id;
  next();
}



Router.post('/recommendation',auth,getUserIdMiddleware,async(req,res)=>{
    
  
    // console.log('router handler called');
    // console.log("Home user_id" + res.locals.user_id);
    // res.render("home", { user_id: res.locals.user_id });
  
  const user_id=res.locals.user_id;


  // const user=req.body.user_id;
  
  // if(user)
  // {
  //     console.log("Recommendation.js user_id"+user);

  //   try {
  //       const suggestions = await Suggestion.find().exec(); 
  //       console.log(suggestions);
  //       res.render('recommendation', { suggestions: suggestions, user_id:user });
  //       // res.redirect('/recommendation')
  //     } catch (err) {
  //       console.error(err);
  //       res.status(500).send('Error retrieving suggestions');
  //     }
  // }  
  
  
    // var user_id= res.locals.user_id;
    console.log("Recommendation.js user_id"+user_id);

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