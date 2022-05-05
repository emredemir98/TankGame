function Explosion(x,y){
   this.pos=createVector(x,y);  
   this.alpha=85;
   this.counters=0;
this.update=function(){
this.alpha-=0.3;
this.a=p5.Vector.fromAngle(0,10);
this.b=p5.Vector.fromAngle(3.13,28);
}

this.render=function(){
 
  push(); 
  translate(x,y);
  stroke(255, 102, 102,30-this.counters*4);
  strokeWeight(80-this.counters*5);
    noFill();
  if((this.counters)<8) 
  ellipse(0,0,0+this.counters*70,0+this.counters*70,);   
  image(boom3[floor(this.counters)],0,0,150,150);  
 
     pop(); 
   
   this.counters +=0.3;  
    
    
}

}