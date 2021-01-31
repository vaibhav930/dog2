//Create variables here
var dog , happyDog,dogImage ;
var database , foods, foodStock;
var addFoods , feedDog, feed;
var fedTime , lastFed, addFood;
var foodObj;


function preload()
{
  dogImage = loadImage("dogImg.png")
  happyDog= loadImage("dogImg1.png")
}

function setup() {
  database=firebase.database()
  createCanvas(500,500);

  dog = createSprite(250,250)
  dog.addImage(dogImage)
  dog.scale=0.2

  foodStock=database.ref('food');
  foodStock.on("value",readStock)

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed= data.val();
  })

food = new Food();
feed= createButton("feed the dog")
feed.position(700,95);
feed.mousePressed(feedDog)

addFood= createButton("Add food")
addFood.position(800,95)
addFood.mousePressed(addFoods);

}


function draw() {  
background(46,139,87)
  textSize (20)
  fill("white")
  textSize (20)
fill("yellow")
display();

fill(255,255,254);
textSize(15);
if(lastFed>=12){
 text("Last Feed :"+ lastFed%12 + " PM", 350,30 );
 }else if(lastFed == 0){
   text("Last Feed : 12AM",350,30)
 }else{
   text("Last Feed : "+ lastFed + "AM",350,30)
 }


//if(keyWentDown(UP_ARROW)){
//writeStock(foods)
//dog.addImage(happyDog)
//}

drawSprites();
  text("Note-press UP arrow key to feed tom milk",100, 50)
  text("Food Remaining :"+ foods,100,150)
}

function readStock(data){
foods=data.val();


}
function writeStock(x){
if(x<=0){
x=0;
}else{
  x=x-1
}

database.ref('/').update({
food:x
})
}

function feedDog(){
dog.addImage(happyDog)

foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  food:foodObj.getFoodStock(),
  FeedTime:hour()
  })
  }

function addFoods(){

foods++;
database.ref('/').update({
  food:foods
   })
  }








