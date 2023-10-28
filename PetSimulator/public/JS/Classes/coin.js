var Coin = function(x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.markedForDeletion = false;
}
Coin.prototype.draw = function() {
    ctx.fillStyle = this.color;
    circle(this.x-scrollX,this.y-scrollY,this.radius,true);
} 