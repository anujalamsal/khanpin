const mongoose=require('mongoose');

const foodSchema=new mongoose.Schema({

   name:{
    type:String,
    required:true
   },

   taste:{
    type:String,
    required:true
   },

   link:{
      type:String,
      required:true
   },

   image:
   {
      type:String,
      required:true
   },
   
   level:
   {
      type:String,
      required:true
   },

   type:{
    type:String,
    required:true
   }
});

const Suggestion=new mongoose.model("Suggestion",foodSchema);
module.exports=Suggestion;