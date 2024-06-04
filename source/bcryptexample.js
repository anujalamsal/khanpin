const bcrypt=require('bcryptjs');

const securePassword=async (password)=>{

const hashPassword=await bcrypt.hash(password,10);
console.log(hashPassword);

const passwordMatch=await bcrypt.compare('Anuja',hashPassword);
console.log(passwordMatch);

};

securePassword('anuja');