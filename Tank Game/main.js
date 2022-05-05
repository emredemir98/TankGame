var tank;
var tank2=[];
var boom=[];
var boom2=[];
var boom3=[];
var boom4=[];
var SpriteCount =0;
var palet = [];
var control = false;
var control2 = true;
var fires=[];
var fires2=[];
var paletizi=[];
var explosion=[];
var mapp=[];
var level=1;
var enemyspeed=1;
function preload(){
   shootsound1 = new Sound('Sounds/shoot1.mp3',100,0.5);
   shootsound2 = new Sound('Sounds/shoot2.mp3',100,1); 
   ridesound1 = new Sound('Sounds/ride.mp3',1,0.1);
   ridesound3 = new Sound('Sounds/ride3.mp3',1,0.1);  
   exsound1 = new Sound('Sounds/explosion1.wav',100,0.1);   
   exsound2 = new Sound('Sounds/explosion2.wav',5,1);   
   hitsound1 = new Sound('Sounds/hit.mp3',10,5);   
   tankimg = loadImage("Tanks.png");
   tank2img = loadImage("Tanks2.png"); 
   backimg = loadImage("backimg.jpg");  
    
   boom[0]=loadImage("Sprites/Sprite_Effects_Explosion_000.png");
   boom[1]=loadImage("Sprites/Sprite_Effects_Explosion_001.png");
   boom[2]=loadImage("Sprites/Sprite_Effects_Explosion_002.png");
   boom[3]=loadImage("Sprites/Sprite_Effects_Explosion_003.png");
   boom[4]=loadImage("Sprites/Sprite_Effects_Explosion_004.png");
   boom[5]=loadImage("Sprites/Sprite_Effects_Explosion_005.png");
   boom[6]=loadImage("Sprites/Sprite_Effects_Explosion_006.png");
   boom[7]=loadImage("Sprites/Sprite_Effects_Explosion_007.png"); 
   boom[8]=loadImage("Sprites/Sprite_Effects_Explosion_008.png");
   boomimg=loadImage("Sprites/boom.png")
   boom2img=loadImage("Sprites/boom2.png") 
   boom3img=loadImage("Sprites/boom3.png")
   boom4img=loadImage("Sprites/fire.png")   
   wall1 = loadImage("Sprites/wall1.png");
   wall2 = loadImage("Sprites/wall2.png"); 
   wall3 = loadImage("Sprites/wall3.png");   
   wall4 = loadImage("Sprites/wall4.png"); 
}
function Sound(src,maxStreams = 1 ,vol =1.0){
  this.streamNum = 0;
  this.streams = [];
  for(var i = 0;i<maxStreams;i++){

      this.streams.push(new Audio(src));
      
  }
    this.play=function(voli){
    
      this.streamNum =(this.streamNum+1)% maxStreams;
      this.streams[this.streamNum].volume = voli;
      this.streams[this.streamNum].play();
      
    }
   
      this.stop = function () {
                this.streams[this.streamNum].pause();
                this.streams[this.streamNum].currentTime = 0;
      }

}
p5.disableFriendlyErrors = true; 
function setup(){   
   createCanvas(windowWidth,windowHeight);
   palet[0] = tankimg.get(1295,730,270,310);
   üst = tankimg.get(95,75,240,320,);  
   tank = new Tank(windowWidth/10,windowHeight/2);
   tank2img =tank2img.get(9,4,200,140);
    for(var i=0;i<8;i++){
    for(var j=0;j<8;j++){
     boom[SpriteCount]=boomimg.get(j*512,i*512,512,512); 
     SpriteCount++;   
    }
    }
    SpriteCount=0;
     for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
     boom3[SpriteCount]=boom3img.get(j*128,i*128,128,128); 
     SpriteCount++;   
    }
    }
     SpriteCount=0;
    for(var i=0;i<8;i++){
    for(var j=0;j<8;j++){
     boom2[SpriteCount]=boom2img.get(j*512,i*512,512,512); 
     SpriteCount++;   
    }
    }
     SpriteCount=0;
    for(var i=0;i<4;i++){
    for(var j=0;j<5;j++){
     boom4[SpriteCount]=boom4img.get(j*480,i*480,480,480); 
     SpriteCount++;   
    }
    }
}
function draw(){
   background(backimg);
    cursor(CROSS);
    
    if(tank.vel.mag()>0){
     ridesound1.play(tank.volume);
     ridesound3.play(tank.volume2);
    }
    for(var i=0;i<paletizi.length;i++){
      paletizi[i].update();   
     paletizi[i].render();
     if(paletizi[i].alpha<0  ){
        paletizi.splice(paletizi,1);
     }
    }
    
   tank.update();
   tank.render();
    if(tank.life>0)
   tank.move();
    
     for(var i=0;i<tank2.length;i++){
      tank2[i].render();
      tank2[i].update();
     }
  for(var i=0;i<fires.length;i++){
      fires[i].update();
      fires[i].render();
      if(fires[i].pos.x<0||fires[i].pos.y<0||fires[i].pos.x>width||fires[i].pos.y>height)
     fires.splice(i,1);
 } 
  for(var i=0;i<fires2.length;i++){
      fires2[i].update();
      fires2[i].render();
      if(fires2[i].pos.x<0||fires2[i].pos.y<0||fires2[i].pos.x>width||fires2[i].pos.y>height)
     fires2.splice(i,1);
 }  
    for(var j=0;j<tank2.length;j++){
    for(var i=0;i<fires.length;i++){      
    if(pointCircle(fires[i].pos.x,fires[i].pos.y,tank2[j].pos.x,tank2[j].pos.y,tank2[j].r)==true){
     tank2[j].ex = pointCircle(fires[i].pos.x,fires[i].pos.y,tank2[j].pos.x,tank2[j].pos.y,tank2[j].r);
     fires.splice(i,1); 
     
       tank2[j].r=0.01;
        
      break;
    }
       
    }
      if(!tank2[j].live){
        exsound1.play(tank2[j].volume);
          hitsound1.play(tank2[j].volume);
           console.log(tank2[j].volume); 
        tank2.splice(j,1);
       
      }
    }

    for(var i=0;i<fires2.length;i++){      
    if(pointCircle(fires2[i].pos.x,fires2[i].pos.y,tank.pos.x,tank.pos.y,tank.r)==true && tank.life){
      
      fires2.splice(i,1);  
        tank.life--;
        if(tank.life==0){
        explosion.push(new Explosion(tank.pos.x,tank.pos.y));    
       exsound2.play(1);
        Reset();
        }
        else
         hitsound1.play(0.3);  
            
      break;
    }
       
    }
      
    
    if(frameCount%floor(100-pow(level,3))==0){
        
        tank2.push(new EnemyTank(random(0,width),random(-40,-100)))
        level+=0.05;
    }
    for(var i=0;i<explosion.length;i++){
       explosion[i].update();
       explosion[i].render();
        if(explosion[i].counters > 15)
            explosion.splice(i,1);
    }
    hit();
   
}
function pointCircle( px, py,  cx,  cy,  r) {

 
   var distX = px - cx;
   var distY = py - cy;
   var distance = sqrt( (distX*distX) + (distY*distY) );

 
  if (distance <= r) {
    return true;
  }
  return false;
}
function hit(){
      for(i=tank2.length-1;i>=0;i--){
      for(j=i-1;j>=0;j--) 
    {    
  const v = p5.Vector.sub(tank2[i].pos, tank2[j].pos);
    const dist = v.mag();
    if (dist <= tank2[i].r+ tank2[j].r) {
      const unitNormal = p5.Vector.div(v, v.mag());
      const unitTangent = createVector(-unitNormal.y,unitNormal.x)

      const correction = p5.Vector.mult(unitNormal, tank2[i].r + tank2[j].r);
      const newV = p5.Vector.add(tank2[j].pos, correction);
      tank2[i].pos = newV;
      
      const a = tank2[i].vel;
      const b = tank2[j].vel;

      const a_n = a.dot(unitNormal);
      const b_n = b.dot(unitNormal);
      const a_t = a.dot(unitTangent);
      const b_t = b.dot(unitTangent);

      const a_n_final = (a_n * (tank2[i].r - tank2[j].r) +
        2 * tank2[j].r*b_n) / (tank2[i].r + tank2[j].r);
      const b_n_final = (b_n * (tank2[j].r - tank2[i].r) + 
        2 * tank2[i].r * a_n) / (tank2[i].r + tank2[j].r);

      const a_n_after = p5.Vector.mult(unitNormal, a_n_final);
      const b_n_after = p5.Vector.mult(unitNormal, b_n_final);
      const a_t_after = p5.Vector.mult(unitTangent, a_t);
      const b_t_after = p5.Vector.mult(unitTangent, b_t);

      const a_after = p5.Vector.add(a_n_after, a_t_after);
      const b_after = p5.Vector.add(b_n_after, b_t_after);

      tank2[i].vel = a_after;
      tank2[j].vel = b_after;
    }
    }
  }
    }
    
function Reset(){
    
 
   tank = new Tank(windowWidth/10,windowHeight/2);
   tank2=[];
 paletizi=[];
 level=1;
 enemyspeed=1;
    
    
    
}


