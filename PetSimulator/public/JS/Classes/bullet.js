var Bullet = function(x,y,radius,color,velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.xVel = velocity.x;
    this.yVel = velocity.y;
    this.blockTouched;
    this.block; 
    this.c;
    this.r;
    this.markedForDeletion = false;
}
Bullet.prototype.draw = function() {
    ctx.fillStyle = this.color;
    circle(this.x-scrollX,this.y-scrollY,this.radius);    
}
