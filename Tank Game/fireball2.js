function fireball2(x,y,angle){
  this.pos=createVector(x,y);  
  this.vel=createVector(0,0);    
  this.counter=0;
  this.control=true;
this.update=function(){
 this.vel=p5.Vector.fromAngle(angle,5);
  
 this.pos.add(this.vel);    
 if(this.control)
   this.counter +=2;  
  if(!this.control){
   this.counter=4;
  } 
   
}
this.render=function(){
    if(this.control){
        push();
        if(floor(this.counter)>20)
     this.counter=15;
    }
     image(boom2[floor(this.counter)],this.pos.x,this.pos.y,175,175);
 
        pop();

}
}