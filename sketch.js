var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var invisibleGround;
var cloud;
var obstacleGroup,cloudsGroup;
var score = 0;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloud = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");





}

function setup() {
  createCanvas(600, 200);

  //create a trex sprite
  trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;
    
  //create a ground sprite
  ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;
invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;  
 obstacleGroup = new Group(); 
 cloudsGroup = new Group(); 
}

function draw() {
  background(180);
  text("SCORE " + score,500,50);
  score = score + Math.round(frameCount/60);
  if (gameState === PLAY) {
    if (keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10;

      //jump when the space button is pressed
    }
  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.x / 2

    }
    spawnClouds();
  spawnObstacles();
  if (obstacleGroup.isTouching(trex)) {
    gameState = END;
  }

      
  }
  else if (gameState === END) {
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

  }
  

  trex.collide(invisibleGround);
  
  drawSprites();
}
function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
      default:break;
    
    }
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}
function spawnClouds() {
  if (frameCount % 60 === 0) {
    var clouds = createSprite(600,100,40,10);
    clouds.addImage(cloud);
    clouds.scale = 0.2;
    clouds.velocityX = -3
    clouds.y = Math.round(random(10,60));
    clouds.depth = trex.depth;
    trex.depth = trex.depth + 1
    clouds.lifetime = 200;
    cloudsGroup.add(clouds);
  } 

  }
  