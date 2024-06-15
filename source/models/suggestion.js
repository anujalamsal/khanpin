const mongoose=require('mongoose');

const foodSchema_s=new mongoose.Schema({

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
   },

   id:{
      type:String,
      required:true
   }
});

const Suggestion=new mongoose.model("Suggestion",foodSchema_s);
module.exports=Suggestion;