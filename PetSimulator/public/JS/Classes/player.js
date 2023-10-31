var Player = function(x,y,radius,color,speed,id) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.xVel = 0;
    this.yVel = 0;
    this.id = id;

    this.maxHealth = playerHealth;
    this.health = playerHealth;

    this.Mouse = {
        x: width,
        y: height,
        keW: false,
        keyA: false,
        keyS: false,
        keyD: false,
        down: false
    }
}
Player.prototype.draw = function() {
    ctx.fillStyle = this.color;
    circle(this.x-scrollX,this.y-scrollY,this.radius,true);
    drawBar(this.x-scrollX,this.y-scrollY,this.radius * 4,this.radius * 0.5,this.health,this.maxHealth,this.radius * -1.3);
} 
Player.prototype.checkTouchingBlock = function() {
    if (!map || maphealth) return false;

    var touching = false;
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
                }
            }
        }
    } 
    return touching;
}
Player.prototype.tryMove = function() {
    this.x += this.xVel;
    if (this.checkTouchingBlock()) {
        this.x -= this.xVel;
    }


    this.y += this.yVel;
    if (this.checkTouchingBlock()) {
        this.y -= this.yVel;
    }
}
Player.prototype.update = function() {
    if (this.Mouse.keyW) {
        this.yVel = 0 - this.speed;
    } else if (this.Mouse.keyS) {
        this.yVel = this.speed;
    } else {
        this.yVel = 0;
    }
    if (this.Mouse.keyA) {
        this.xVel = 0 - this.speed;
    } else if (this.Mouse.keyD) {
        this.xVel = this.speed;
    } else {
        this.xVel = 0;
    }
    this.tryMove();


}