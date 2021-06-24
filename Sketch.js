var pc,npc,npc1,wepons,npcGroup,npcImage1,weapon1,wp1IMG,weapon2,weapon3,wp2IMG,wp3IMG,gameOverIMG
var pcImage,npcImage,bgImage,bg,wall,wall2,wall3,wall4
var PLAY=1;
var END=0;
var invisibleBlock,invisibleBlockGroup
var gameState=PLAY;
var score = 0;
var weaponsGroup
var bulletGroup
var weaponsCaught=false;

function setup() {
  createCanvas(displayWidth-20,displayHeight-120);
 // wall=createSprite(450,450,10,0)
 // wall2=createSprite(950,450,10,00)
 // wall3=createSprite(700,100,500,10)
  bg=createSprite(width/2,height-50,30,30)
  bg.addImage(bgImage)
  bg.velocityY=1
  pc=createSprite(850,390,1,1)
  pc.addImage(pcImage)
  pc.debug=true
  pc.setCollider("rectangle",0,0,150,150)
  pc.mirrorY(1)
  pc.mirrorX(-1)
  pc.rotation=360
  pc.scale=0.5
  npcGroup=createGroup()
  weaponsGroup=createGroup()
  bulletGroup=createGroup()
  
  
  
 
}
function preload(){
   pcImage=loadImage("images/pc.png")
   bgImage=loadImage("images/bagroung.jpg")
   npcImage=loadImage("images/ob1.png")
   npcImage1=loadImage("images/ob2.png")
   wp1IMG=loadImage("images/weapon1.png")
   wp2IMG=loadImage("images/weapon2.png")
   wp3IMG=loadImage("images/weapon3.png")
   gameOverIMG=loadImage("images/game over.jfif")
 
   
}
function draw() {
  background(0);
  
  
  console.log("score")
  
  if (gameState===PLAY) {
    if (bg.y>height-100) {
      bg.y=height/2
      
  }
  if(keyDown("right_arrow")){
    pc.x=pc.x+3;
 }
   if(keyDown("left_arrow")){
    pc.x=pc.x-3;
 }

  if (npcGroup.isTouching(pc)) {
    gameState=END;
  } 
  if (weaponsGroup.isTouching(pc)) {
    weaponsCaught=true;

  }
  if (weaponsCaught&&(keyDown("space"))) {
   var bullet=createSprite(pc.x,pc.y,5,10)
   bullet.shapeColor="red"
   bullet.velocityY=-2
   bulletGroup.add(bullet)
  }
  for (let index = 0; index < npcGroup.length; index++) {
    if (npcGroup.get(index)!=null&&bulletGroup.isTouching(npcGroup.get(index))) {
      npcGroup.get(index).destroy()
      bulletGroup.destroyEach();
      weaponsCaught=false
      score=score+50
    }
    
  }
  score = score + Math.round(getFrameRate()/75);
  console.log(weaponsCaught)
  
  spawnNpc();
  weapons();
  } 
  else {
    npcGroup.destroyEach();
    bg.velocityY=0;
    pc.velocityY=0;
    gameOver=createSprite(700,400,10,10)
    gameOver.addImage(gameOverIMG)
    gameOver.scale=6

  }
  
 
 
 

drawSprites();
stroke("red")
strokeWeight(2)
text("Score: "+ score, 500,50);
}

function spawnNpc(){
  if (frameCount % 120 === 0){
    var npc = createSprite(600,165,10,40);
   
    npc.x=Math.round(random(500,1000))
    npc.velocityY = 2;
    
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: npc.addImage(npcImage);
               break;
       case 2: npc.addImage(npcImage1);
               break;
               default: break;
     }   
     npcGroup.add(npc)
    }

   }  


function weapons(){
    if (frameCount % 150 === 0) {
      weapon1 = createSprite(600,50,40,10);
      weapon1.debug=true
     weapon1.y=Math.round(random(250,400));
     weapon1.x=Math.round(random(550,900))
        var rand  = Math.round(random(1,3));
        switch(rand){
        case 1: weapon1.addImage(wp1IMG)
                break;
        case 2: weapon1.addImage(wp2IMG)   
                break;
        case 3: weapon1.addImage(wp3IMG)          
                break;
        }
        weapon1.scale = 1;
        weapon1.velocityY = 3;
        
        weaponsGroup.add(weapon1)
      
        
    }

}


 
 

