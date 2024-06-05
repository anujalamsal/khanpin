const mongoose=require('mongoose');

const foodetails=new mongoose.Schema({

   name:{
    type:String,
    required:true
   },

   taste:{
    type:String,
    required:true
   },

   province:{
    type:String,
    required:false
   },

   image:{
    type:String,
    required:true
   },

   link:{
    type:String,
    required:true
   },

   type:{
      type:String,
      required:true
   }

});

const Details=new mongoose.model("Details",foodetails);
module.exports=Details;