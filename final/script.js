const generic_food=require('../source/data_for_db/generic_data');
const authentic_food=require('../source/data_for_db/authentic_data');

const genericFoodItems = document.querySelectorAll('.generic');
const authenticFoodItems = document.querySelectorAll('.authentic');

genericFoodItems.forEach((item) => {
  const name = item.dataset.name;
  const genericFood = generic_food.find(food => food.name === name);
  if (genericFood) {
    item.dataset.taste = genericFood.taste;
    item.dataset.level = genericFood.level;
    item.dataset.province = genericFood.province;
  }
});

authenticFoodItems.forEach((item) => {
  const name = item.dataset.name;
  const authenticFood = authentic_food.find(food => food.name === name);
  if (authenticFood) {
    item.dataset.taste = authenticFood.taste;
    item.dataset.level = authenticFood.level;
    item.dataset.province = authenticFood.province;
  }
});