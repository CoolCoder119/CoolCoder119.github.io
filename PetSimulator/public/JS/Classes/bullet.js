var Bullet = function(x,y,radius,color,id,xVel,yVel) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.id = id;
    this.xVel = xVel;
    this.yVel = yVel;
    this.blockTouched;
    this.markedForDeletion = false;
}
Bullet.prototype.draw = function() {
    ctx.fillStyle = this.color;
    circle(this.x-scrollX,this.y-scrollY,this.radius);    
}
Bullet.prototype.checkTouchingBlock = function() {
    var touching = false;
    var blockTouched;
    for (var c = 0; c < columns; c++) {
        for (var r = 0; r < rows; r++) {
            var block = getBlockAt(c,r);
            if (block === 1 || block === 2) {
                var x = r*blockWidth;
                var y = c*blockHeight;
                if (
                        this.x + this.radius > x &&
                        this.y + this.radius > y &&
                        this.x - this.radius <= x+blockWidth &&
                        this.y - this.radius <= y+blockHeight
                ) {
                    touching = true;
                    this.blockTouched = maphealth[c][r];
                }
            }
        }
    } 
    return touching;
}
Bullet.prototype.update = function() {
    this.x += this.xVel;
    this.y += this.yVel;
    if (this.checkTouchingBlock()) {
        this.markedForDeletion = true;
        var blockTouched = this.blockTouched;
        if (blockTouched.canBeAttacked) {
            blockTouched.health -= 1;
            if (blockTouched.health === 0) {
                map[blockTouched.column][blockTouched.row] = 0;
                blockTouched = 0;
            }
        }
    }
}