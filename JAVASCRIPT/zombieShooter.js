var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var height = canvas.height;
var width = canvas.width;

var playerColor = "red";
var projectiles = [];
var projectileColor = "pink";
var gameFrame = 0;
var playerRadius = 30;
var playerSpeed = 6;
var projectileRadius = 20;
var projectileSpeed = 14;

var circle = function(x,y,radius,color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,radius, 0, Math.PI * 2, false);
    ctx.fill();
};

var mouse = function() {
    this.keyW = false;
    this.keyA = false;
    this.keyS = false;
    this.keyD = false;
}
var Mouse = new mouse();
var Player = function(x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = playerSpeed;
}
Player.prototype.draw = function() {
    circle(this.x,this.y,this.radius,this.color);
}
Player.prototype.update = function() {
    if (Mouse.keyW && this.y - this.radius< 0 !== true) {
        this.y -= this.speed;
    } 
    if (Mouse.keyA && this.x - this.radius< 0 !== true) {
        this.x -= this.speed;
    } 
    if (Mouse.keyS && this.y + this.radius > height !== true) {
        this.y += this.speed;
    } 
    if (Mouse.keyD && this.x + this.radius > width !== true) {
        this.x += this.speed;
    }
};

var Projectile = function(x,y,xVel, yVel,radius,color) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
    this.radius = radius;
    this.color = color
    this.markedForDeletion = false;
}
Projectile.prototype.draw = function() {
    circle(this.x,this.y,this.radius,this.color);
}
Projectile.prototype.update = function() {
    this.x += this.xVel;
    this.y += this.yVel;
    if (this.x + this.radius < 0) {
        this.markedForDeletion = true;
    }
    if (this.x - this.radius > width) {
        this.markedForDeletion = true;
    }
    if (this.y + this.radius < 0) {
        this.markedForDeletion = true;
    }
    if (this.y - this.radius > height) {
        this.markedForDeletion = true;
    }
}




var player = new Player(width/2,height/2, playerRadius,playerColor);

function gameLoop() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,width,height);
    player.update();
    player.draw();
    var i = 0;
    projectiles.forEach((projectile) => {
        projectile.update();
        projectile.draw();
        if (projectile.markedForDeletion) {
            projectiles.splice(i,1);
        }
        i++;
      });
    gameFrame++;
    requestAnimationFrame(gameLoop);
}






addEventListener('click', (event) => {
    ctx.fillStyle = "aqua";
    var x = player.x - player.radius;
    var y = player.y - player.radius;
    const angle = Math.atan2(
    event.clientY - y,
    event.clientX - x
    );
    const xVel = Math.cos(angle) * projectileSpeed;
    const yVel = Math.sin(angle) * projectileSpeed;

    var projectile = new Projectile(player.x, player.y,xVel,yVel,projectileRadius,projectileColor);
    projectiles.push(projectile)
});

document.addEventListener('keydown', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "w") {
        Mouse.keyW = true;
    } 
    if (code === "s") {
        Mouse.keyS = true;
    } 
    if (code === "a") {
        Mouse.keyA = true;
    }
    if (code === "d") {
        Mouse.keyD = true;
    }
  }, false);
document.addEventListener('keyup', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "w") {
        Mouse.keyW = false;
    } 
    if (code === "s") {
        Mouse.keyS = false;
    } 
    if (code === "a") {
        Mouse.keyA = false;
    } 
    if (code === "d") {
        Mouse.keyD = false;
    }
  }, false);
gameLoop();