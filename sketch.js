// creating the variables
var knife, layout; 
var pear, orange, apple;
var gameState;
var Sword, bgImg, appleImg, pearImg, textImg, bananaImg;
var bananaGroup, appleGroup, pearGroup;
var score;

function preload(){
   Sword = loadImage("Images/sword.png");
   bgImg = loadImage("Images/bg.png");
   appleImg = loadImage("Images/apple.png");
   pearImg = loadImage("Images/pear.png");
   textImg = loadImage("Images/gameOver.png");
   bananaImg = loadImage("Images/banana.png");
}

function setup() {
  createCanvas(600,1100);

  edges = createEdgeSprites();

  layout = createSprite(width/2, height/2,600, 1100);
  layout.addImage(bgImg);
  layout.scale = 1.75;
   
   knife = createSprite(400, 200, 50, 50);
   knife.addImage(Sword);
   knife.scale = 1.25;

   gameState = "start";

   bananaGroup = new Group();
   appleGroup = new Group();
   pearGroup = new Group();

   score = 0;

   bod1 = createSprite(width/2,1100,600,50);
   bod1.shapeColor = "black";
}

function draw() {
  background(0);  
  knife.x = mouseX;
  knife.y = mouseY;

  if(keyDown("space")){
    gameState = "play";
  }

  // defining the gameState play
  if(gameState === "play"){

  // spawning the bananas
    if(frameCount % 90 === 0){
      var banana = createSprite(random(100,550),-10, 10,10);
      banana.addImage(bananaImg);
      banana.scale = 0.3;
      banana.velocityY = 10 + 2*score;
      banana.lifetime = 200;
      bananaGroup.add(banana);
    }

  // spawning the bananas
    if(frameCount % 70 === 0){
      var apple = createSprite(random(100,550),-10, 10,10);
      apple.addImage(appleImg);
      apple.scale = 0.3;
      apple.velocityY = 10+ 2*score;
      apple.lifetime = 200;
      appleGroup.add(apple);
    }

  // spawning the bananas
    if(frameCount % 50 === 0){
      var pear = createSprite(random(100,550),-10, 10,10);
      pear.addImage(pearImg);
      pear.scale = 0.3;
      pear.velocityY = 10+ 2*score;
      pear.lifetime = 200;
      pearGroup.add(pear);
    }

    // writing the if conditions.
    if(knife.isTouching(pearGroup)){
      score = score + 1;
      pearGroup.destroyEach();
    }

    // writing the if conditions.
    if(knife.isTouching(appleGroup)){
      score = score + 1;
      appleGroup.destroyEach();
    }

    // writing the if conditions.
    if(knife.isTouching(bananaGroup)){
      score = score + 1;
      bananaGroup.destroyEach();
    }

  }

   // writing the if conditions.
   if(pearGroup.isTouching(bod1)){
    var gameOver = createSprite(width/2,height/2,10,10);
    gameOver.addImage(textImg);
    knife.destroy();
  }

  // writing the if conditions.
  if(bananaGroup.isTouching(bod1)){
    var gameOver = createSprite(width/2,height/2,10,10);
    gameOver.addImage(textImg);
    knife.destroy();
  }

  // writing the if conditions.
  if(appleGroup.isTouching(bod1)){
    var gameOver = createSprite(width/2,height/2,10,10);
    gameOver.addImage(textImg);
    knife.destroy();
  }

  drawSprites();

  fill("black");
  textSize(30);
  text("Player Score = " + score, 200, 1000);

  if(score === 50){
    fill("black");
    textSize(50);
    text("You win !!", 200,400); 
    knife.destroy();
    appleGroup.setLifetimeEach(1);
    bananaGroup.setLifetimeEach(1);
    pearGroup.setLifetimeEach(1);
   
  }

  // defining the start state
  if(gameState === "start"){
    fill("black");
    textSize(30);
    text("Welcom to the fruit ninja game !!", 100,200); 

    fill("black");
    textSize(30);
    text("Press space to start the game !!", 100,300); 

    fill("black");
    textSize(30);
    text("Attain a score of 50 to win the game !!", 60,900); 

  }

  
}