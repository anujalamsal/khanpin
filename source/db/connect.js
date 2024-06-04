const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://batsanuja:VvWesKHJ1d9fRpI2@loginregister.qelbyfx.mongodb.net/");
    mongoose.connection.once('open', function(){
      console.log('Conection has been made!');
    }).on('error', function(error){
        console.log('Error is: ', error);
    
});
