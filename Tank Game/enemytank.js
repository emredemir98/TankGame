function EnemyTank(x,y){
  this.pos=createVector(x,y);  
  this.afterpos=createVector(0,0);
  this.vel=createVector(0,1);
  this.direction = createVector(0,0.1);
  this.aftershotangle;
  this.aftershotplacex ;
  this.aftershotplacey ;  
  this.aftershotmove  = createVector(0,0);
  this.w=20;
  this.h=60;    
  this.angle2 = 0.05;
  this.angle3; 
  this.counters = 0;
  this.firedistance=createVector(0,0);
  this.paletspeed=0;
  this.paletchange=false;
  this.ex=false;
  this.live=true;  
  this.r=35;
  this.speed=random(5,1);
  this.afterspeed=this.speed;
  this.distance;
  this.volume=0;
  this.volume2=0;  
this.update=function(){ 
  this.pos.add(this.vel); 
  this.vel.add(this.friction);
  this.friction=p5.Vector.mult(this.vel,-0.15);
   this.angle3 =atan2((this.vel.x),(this.vel.y));
 this.angle4 = atan2((tank.pos.y-this.pos.y),(tank.pos.x-this.pos.x))+135;
   this.distance=dist(tank.pos.x,tank.pos.y,this.pos.x,this.pos.y) 
  this.volume = 150/this.distance; 
  if(this.volume>1)
    this.volume=1;   
    this.paletspeed+=this.vel.mag()/10;
  if(this.paletspeed>1.9) { 
  this.paletspeed=0;  
  }
    if(this.distance<300  )
    {
       this.speed*=0.9; 
    }
    else if(this.distance>300 && this.speed<this.afterspeed && this.counters==0){
        
        this.speed+=this.afterspeed/50; 
    }
  
    if(this.speed <0.1 )
        this.move();
    else
     this.counters=0;  
    if(this.ex)
        this.explode();
      this.vel.x=-cos(this.angle4)*this.speed;
this.vel.y=-sin(this.angle4)*this.speed; 
}    
this.render=function(){
   this.angle4 = atan2((tank.pos.y-this.pos.y),(tank.pos.x-this.pos.x))+135;
   
    
    /*if(this.vel.mag()>1.5 && this.paletspeed/3 ==0){
     
       paletizi.push(new Paletizi(this.pos.x,this.pos.y,-this.angle3))
        this.paletspeed=0;
    }*/
    push();
    
       
    translate(this.pos.x,this.pos.y);
   
    rotate(this.angle4-135);
    if(this.counters<1){
     this.afterpos.x=this.pos.x;
      this.afterpos.y=this.pos.y;   
    }
     image(tank2img,0,0,this.h+10,this.h);
    pop();
  
}    
 this.move=function(){
  this.angle4 = atan2((tank.pos.y-this.pos.y),(tank.pos.x-this.pos.x));
     
     if (floor(this.counters)<62){
         if(floor(this.counters==4)) 
            fires2.push(new fireball2(this.pos.x,this.pos.y,this.angle4)); 
             
         
        this.counters+=1;
         this.firedistance = p5.Vector.fromAngle(this.angle4, 80); 
         if(floor(this.counters)<15){
          push();
         translate(this.pos.x+this.firedistance.x,this.pos.y+this.firedistance.y);
         rotate(this.angle4);
              image(boom[floor(this.counters)],0,0,200,200);
          pop();  
         this.aftershotangle = this.angle4 ;
         this.aftershotplacex = this.pos.x+this.firedistance.x;
         this.aftershotplacey = this.pos.y+this.firedistance.y;
         var c = this.firedistance;
         c.setMag(0.5);
         this.vel.sub(c) ; 
         }
         else{
         push();      
         translate( this.aftershotplacex,this.aftershotplacey );     
         rotate(this.aftershotangle);  
           image(boom[floor(this.counters)],0,0,200,200);
             pop();
         }
     }
     else
      this.counters  = 0 ;
 }
 this.explode=function(){ 
       explosion.push(new Explosion(this.afterpos.x,this.afterpos.y));
     this.ex=false;
     this.live=false;
 }

}
