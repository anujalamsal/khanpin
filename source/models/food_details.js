const mongoose=require('mongoose');

const foodetais=new mongoose.Schema({

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
   }

});

const History=new mongoose.model("History",foodSchema);
module.exports=History;