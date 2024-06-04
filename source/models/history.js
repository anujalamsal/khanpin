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

   province:{
    type:String,
    required:false
   }
});

const History=new mongoose.model("History",foodSchema);
module.exports=History;