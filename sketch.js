//Create variables here
var dog, happyDog;
var database;
var foodS;
var foodStock;
var feedDog;
var addFoods;
var fedTime, lastFed;
var foodObj;

function preload()
{ 
  dog1= loadImage("images/Dog.png")
  dogHappy= loadImage("images/happydog.png")
  //milk= loadImage("images/Milk.png")
  //load images here
  
}

function setup() {
  database= firebase.database();
	createCanvas(1000, 500);
  dog= createSprite(800,250,5,5)
  dog.scale= 0.2
  dog.addImage(dog1);

  foodObj= new food();

  foodStock= database.ref('Food');
  foodStock.on("value", readStock);


  feed= createButton("Feed the dog");
  feed.position(600,95);
  feed.mousePressed(feedDog);

  addFood= createButton("Add Food");
  addFood.position(750,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87)

  foodObj.display();
  /*if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage("happydog",dogHappy);
    console.log("happydog")
    //foodS= foodS - 1
  }*/
  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed= data.val();
  })


fill(255,255,254);
textSize(15);
if (lastFed>=12) {
  text("Last Feed : " + lastFed%12  + "PM", 350,30)
} else if(lastFed==0) {
  text("Last Feed : 12 AM", 350, 30);
} else{
  text("Last Feed : " + lastFed + "AM", 350, 30)
}
drawSprites();
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

/*function writeStock(x) {
  if (x<=0) {
    x = 0;
  }
  else {
    x= x-1
  }

database.ref('/').update({
  Food:x
})*/



function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods() {
  foodS++
  database.ref('/').update({
    Food:foodS
  })
  }



