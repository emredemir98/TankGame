function fireball(x,y,angle){
  this.pos=createVector(x,y);  
  this.vel=createVector(0,0);    
  this.counter=0;
  this.control=true;
this.update=function(){
 this.vel=p5.Vector.fromAngle(angle-0.07,25);
 
 this.pos.add(this.vel);    
 if(this.control)
   this.counter +=1;  
  if(!this.control){
   this.counter=4;
    
  }     
}
this.render=function(){
    if(this.control){
        push();
        if(floor(this.counter)>20)
     this.counter=10;
    }
     image(boom2[floor(this.counter)],this.pos.x,this.pos.y,200,200);
 
        pop();
    
}
}