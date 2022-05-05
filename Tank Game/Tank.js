function Tank(x,y){
  this.pos=createVector(x,y);  
  this.vel=createVector(0,0);
  this.direction = createVector(0,0.1);
  this.aftershotangle;
  this.aftershotplacex ;
  this.aftershotplacey ;  
  this.aftershotmove  = createVector(0,0);
  this.w=20;
  this.h=60;
  this.r=30;
  this.angle2 = 0.05;
  this.angle3; 
  this.counter = 4;
  this.firedistance=createVector(0,0);
  this.paletspeed=0;
  this.firecount=0;
  this.paletchange=false;
  this.upgradespeed=0;
  this.volume =0;
  this.volume2 =0;  
  this.life=5;
 
this.update=function(){ 

  this.angle = atan2((this.pos.x-mouseX),(this.pos.y-mouseY));
    
  this.angle3 =atan2((this.direction.x),(this.direction.y));
  this.friction=p5.Vector.mult(this.vel,-0.15);
  this.aftershotmove=p5.Vector.mult(this.firedistance,0.01);  
  this.pos.add(this.vel); 
  this.vel.add(this.friction); 
  if(control)
   this.counter +=5.0+this.upgradespeed;  
  if(!control){
   this.counter=4;   
  }  
  this.paletspeed+=this.vel.mag()/10;
  if(this.paletspeed>1.9) { 
  this.paletspeed=0;  
  }
    this.volume=map(this.vel.mag(),0,5,0.01,0.08);
    this.volume2=map(this.vel.mag(),0,5,0.001,0.1);
}    
this.render=function(){
    imageMode(CENTER);
     push();
    translate(this.pos.x,this.pos.y);
    rotate(-this.angle3);
    if(tank.life>0)
     image(palet[0],0,0,this.h,this.h);
   
    
    pop();
   if(this.vel.mag()>2.5 && this.paletspeed/3 ==0){
     
       paletizi.push(new Paletizi(this.pos.x,this.pos.y,-this.angle3))
        this.paletspeed=0;
    }
    push();
    
    if(this.counter<10)
    var a=map(this.counter,4,10,1,10);
    else
    var a=map(this.counter,10,64,10,1);     
    translate(this.pos.x-this.aftershotmove.x*a,this.pos.y-this.aftershotmove.y*a);
     
    rotate(-this.angle);
    if(tank.life>0)
     image(üst,0,0,this.h,this.h);
    
    pop();
    
       
}    
 this.move=function(){  
   if(keyIsDown(87)&&this.vel.mag()<4){
        
        this.direction.setMag(0.6);
        this.vel.sub(this.direction); 
    }
   
   if(this.vel.mag()>0.2&&keyIsDown(65) &&keyIsDown(83)||this.vel.mag()>0.2 &&keyIsDown(65)&&keyIsDown(87)){
     if(keyIsDown(87))
     this.direction.rotate(-this.angle2);
    
    }
   if(this.vel.mag()>0.2&&keyIsDown(68) &&keyIsDown(83)||this.vel.mag()>0.2 &&keyIsDown(68)&&keyIsDown(87)){
      if(keyIsDown(87))
     this.direction.rotate(this.angle2);
    
    } 
     if (mouseIsPressed){
         control=true;
     }
     if (floor(this.counter)>62)
           control=false;  
     if (control ){
         if(floor(this.counter)==4){ 
            fires.push(new fireball(this.pos.x,this.pos.y,-this.angle-1.5)); 
             shootsound1.play(0.2); 
         }
         
         this.firedistance = p5.Vector.fromAngle(-this.angle-1.5, 80); 
         if(floor(this.counter)<15){
          push();
         translate(this.pos.x+this.firedistance.x,this.pos.y+this.firedistance.y);
         rotate(-this.angle-1.5);
              image(boom[floor(this.counter)],0,0,200,200);
          pop();  
         this.aftershotangle = -this.angle-1.5; 
         this.aftershotplacex = this.pos.x+this.firedistance.x;
         this.aftershotplacey = this.pos.y+this.firedistance.y;
         var b = this.firedistance;
         b.setMag(0.5);
         this.vel.sub(b) ; 
         }
         else{
         push();      
         translate( this.aftershotplacex,this.aftershotplacey );     
         rotate(this.aftershotangle);  
           image(boom[floor(this.counter)],0,0,200,200);
             pop();
         }
        
         
         
        
     }
 
}

}