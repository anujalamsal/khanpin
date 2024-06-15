const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);
    mongoose.connection.once('open', function(){
      console.log('Conection has been made!');
    }).on('error', function(error){
        console.log('Error is: ', error);
    
});
