var bgImage,bgSprite;
var spaceShip_Img;
var comet2_Img,comet3_Img;
var ogroup;
var gamestate="play";


function preload(){
  bgImage=loadImage("my game/galaxy.jpg");
  spaceShip_Img=loadImage("my game/spaceship2.jpg")
  comet2_Img=loadImage("my game/comet2.jpg")
  comet3_Img=loadImage("my game/comet3.jpg")
}


function setup(){
  createCanvas(windowWidth,windowHeight);
  bgSprite=createSprite(windowWidth/2,windowHeight/2,50,50);
  bgSprite.addImage(bgImage);
  bgSprite.scale=9
  bgSprite.velocityX=-2;

  bgShip=createSprite(300,500,10,10);
  bgShip.addImage(spaceShip_Img);
  bgShip.scale=0.5

  bgShip.debug=true;
  bgShip.setCollider("circle",50,0,70);

  ogroup=new Group();

}


function draw(){
  background('white');
  
  //gamestate play
  if (gamestate=="play") {
    //score = score+1;
      //resetting the background
      if (bgSprite.x<500){
        bgSprite.x = windowWidth/2 
      }

      if (keyDown("UP_ARROW")){
        bgShip.y=bgShip.y-10;
        
      }

      if (keyDown("DOWN_ARROW")){
        bgShip.y=bgShip.y+10;
      }

      if (bgShip.y>windowHeight){
        bgShip.y=windowHeight
      }
      if (bgShip.y<0){
        bgShip.y=0
      }
      spawnobstacle();

      if(bgShip.isTouching(ogroup)){
        gamestate="end"
        console.log("game over")
        //ds.play();
      }
   
  }
  else{
     // gamestate end 
      if (gamestate=="end"){
        bgSprite.velocityX=0;
        ogroup.setVelocityXEach(0);
        bgShip.velocityY=0;
        ogroup.setLifetimeEach(-1)
        /*cgroup.setVelocityXEach(0);
        trex.changeAnimation("stop",trex_collide);
        cgroup.setLifetimeEach(-1)
        gameover.visible = true;
        restart.visible = true;
        if(mousePressedOver(restart)){
          reset()
        }*/
    
      }
      
  }

 

  

  drawSprites();
}

function spawnobstacle(){
  var obstacle;
  if (frameCount % 60 === 0 ) {
    obstacle = createSprite(900,random(0,windowHeight),40,50)
    obstacle.velocityX= -10
    //obstacle.scale= 0.2
    obstacle.lifetime=250
    var r= Math.round(random(1,2))
    obstacle.debug = true;
    //obstacle.setCollider("circle",-250,250,150); 

    switch(r){
      case 1: obstacle.addAnimation("obstacle",comet2_Img);
              obstacle.scale= 0.2
              obstacle.setCollider("circle",-250,250,150);
              break;
      case 2: obstacle.addAnimation("obstacle",comet3_Img);
              obstacle.scale= 0.4
              obstacle.setCollider("circle",-150,150,100);
              break;
      default:obstacle.addAnimation("obstacle",comet2_Img);
              obstacle.scale= 0.2
              obstacle.setCollider("circle",-250,250,150);
              break;
     /* case 3: obstacle.addAnimation("obstacle",comet2_Img);
              break;        
      case 4: obstacle.addAnimation("obstacle",comet3_Img);
              obstacle.scale= 0.2
              break;  
      case 5: obstacle.addAnimation("obstacle",comet2_Img);
              break;        
      case 6: obstacle.addAnimation("obstacle",comet3_Img);
              break;*/

    }
    ogroup.add(obstacle)
  }
}
