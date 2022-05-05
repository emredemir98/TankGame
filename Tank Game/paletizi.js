function Paletizi(x,y,angle){
   this.pos=createVector(x,y);  
   this.alpha=85;

this.update=function(){
this.alpha-=0.3;
this.a=p5.Vector.fromAngle(0,10);
this.b=p5.Vector.fromAngle(3.13,28);
}

this.render=function(){
 
push();
noStroke();    
fill(0,this.alpha);   
translate(this.pos.x,this.pos.y);  

rotate(angle);
rect(this.a.x,this.a.y,15,10,4);
rect(this.b.x,this.b.y,15,10,4);   
  
pop();
    
}













}