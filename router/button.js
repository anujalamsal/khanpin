const express=require('express');
const Router=express.Router();
const authentic_food=require('../source/data_for_db/authentic_data');
const generic_food=require('../source/data_for_db/generic_data');
const History=require('../source/models/history');
const Suggestion=require('../source/models/suggestion');

Router.post('/button',(req,res)=>{
const name=req.body.id;
const type=req.body.className;
const id=req.body.user_id;
console.log("Button.js user_id:"+id);

console.log(name+'\n'+type);

if(type==='a-food')
{

   const data= authentic_food.find((element)=>{
        return element.name===name
    });

    //to store in history
  { if(data)
    {  
    History.findOne({ name: data.name, id:id}).exec()
    .then((foundData) => {
    if (foundData) {
      console.log('User already exists');
    } else {
      const detail = new History({
        name: data.name,
        taste: data.taste,
        province: data.province,
        image: data.img,
        link: data.link,
        type: 'authentic',
        level:data.level,
        id:id
      });
      detail.save();
    }
  })
 .catch((err) => {
    console.error(err);
  });}
}

if(data)
{
  const taste=data.taste;
  const level=data.level;
  console.log(taste +'/n'+ level);

authentic_food.forEach((element)=>{
  if(element.taste===taste && element.level===level && element!=data)
  {
    Suggestion.findOne({ name: element.name, id:id }).exec()
    .then((foundData) => {
      console.log(foundData);
    if (foundData) {
      console.log('User exists');
    } else {
      const suggestion = new Suggestion({
        name: element.name,
        taste: element.taste,
        image: element.img,
        link: element.link,
        type: 'authentic',
        level:element.level,
        id:id
      });
      suggestion.save();
    }
    })
    
  }
})
  
}  
}

else if(type==='g-food')
{
  console.log("Generic food contianer");
    const data= generic_food.find((element)=>{
        return element.name===name
    });

    {if(data)
      {History.findOne({ name: data.name, id:id }).exec()
          .then((foundData) => {
             if (foundData) {
               console.log('User already exists');
             } else {
               const detail = new History({
                 name: data.name,
                 taste: data.taste,
                 province: data.province,
                 image: data.img,
                 link: data.link,
                 type: 'generic',
                 level:data.level,
                 id:id
               });
               detail.save();
             }
           })
          .catch((err) => {
             console.error(err);
           });}
          }

          {if(data){
            const taste=data.taste;
            const level=data.level;
          
          authentic_food.forEach((element)=>{
            if(element.taste===taste && element.level===level && element!=data)
            {
              Suggestion.findOne({ name: element.name, id:id }).exec()
              .then((foundData) => {
                console.log(foundData);
              if (foundData) {
                console.log('User  exists');
              } else {
                const suggestion = new Suggestion({
                  name: element.name,
                  taste: element.taste,
                  image: element.img,
                  link: element.link,
                  type: 'authentic',
                  level:element.level,
                  id:id
                });
                suggestion.save();
              }
              })
              
            }
          })
            
          }  

}   

}})




module.exports=Router;



