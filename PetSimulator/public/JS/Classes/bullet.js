var Bullet = function(x,y,radius,color,id,xVel,yVel) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.id = id;
    this.xVel = xVel;
    this.yVel = yVel;
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
Bullet.prototype.checkTouchingBlock = function() {
    var touching = false;
    this.block;
    this.blockTouched;
    for (var c = 0; c < columns; c++) {
        for (var r = 0; r < rows; r++) {
            var block = getBlockAt(c,r);
            if (block === 1 || block === 2) {
                var x = r*blockWidth;
                var y = c*blockHeight;
                if (
                        this.x + this.radius >= x &&
                        this.y + this.radius >= y &&
                        this.x - this.radius <= x+blockWidth &&
                        this.y - this.radius <= y+blockHeight
                ) {
                    touching = true;
                    this.block = map[c][r];
                    this.blockTouched = maphealth[c][r];
                    this.c = c;
                    this.r = r;
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
        if (this.block === 1) {
            this.blockTouched.health -= 1;
            if (this.blockTouched.health < 1) {
                map[this.blockTouched.column][this.blockTouched.row] = 0;
                maphealth[this.blockTouched.column][this.blockTouched.row] = 0;

                var r = this.blockTouched.row;
                var c = this.blockTouched.column;
                socket.emit('updateMapBackend', { row: r, column: c});
            }
        }
    }

    for (const id in players) {
        if (id !== socket.id) {
            var otherPlayer = players[id];
            var distance = getDistance(this.x,this.y,otherPlayer.x,otherPlayer.y);
            if (distance < this.radius+otherPlayer.radius) {
                this.markedForDeletion = true;
                otherPlayer.health -= 10;
                socket.emit('damage',{id: id,damage: 10});
            }       
        }
    }
}