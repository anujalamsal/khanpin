require('dotenv').config();
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const employeeSchema=new mongoose.Schema({
username:{
    type:String,
    required:true,
    unique:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
},
cpassword:{
    type:String,
    required:true
},
tokens:{
    type:String,
    required:true
}


});


//generating token
employeeSchema.methods.generateAuthToken=async function(){
try {
    // console.log(this._id);
    const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
    // console.log(token);
    // this.tokens.token=token;

    // this.tokens=this.tokens.concat({token})
    this.tokens=token;
    await this.save();
    
    return token;

} catch (error) {
    
  return false

    
}

}


//converting password into hash
employeeSchema.pre("save",async function (next){

if(this.isModified("password"))
{


this.password=await bcrypt.hash(this.password,10);


this.cpassword=await bcrypt.hash(this.cpassword,10);

}


next();

})




const Register=new mongoose.model("Register",employeeSchema);
module.exports=Register;