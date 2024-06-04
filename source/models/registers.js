const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const employeeSchema=new mongoose.Schema({
username:{
    type:String,
    required:true
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
tokens:[{
    token:{
        type:String,
        required:true
    }

}]
});

//generating token
employeeSchema.methods.generateAuthToken=async function(){
try {
    console.log(this._id);
    const token=jwt.sign({_id:this._id.toString()},"khanpintherecipebook")
    console.log(token);
    this.tokens=this.tokens.concat({token});
    await this.save();
    return token

} catch (error) {
    
    res.send('The error part'+error);
    console.log('The error part'+error)

    
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