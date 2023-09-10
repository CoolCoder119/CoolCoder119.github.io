var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var height = canvas.height;
var width = canvas.width;

var playerColor = "red";
var projectiles = [];
var enemies = [];
var projectileColor = "pink";
var enemyColor = "teal";
var enemyRadius = 23;
var enemySpeed = 0.5;
var maxEnemyHealth = 20;
var gameFrame = 0;
var playerRadius = 20;
var playerSpeed = 5;
var projectileRadius = 10;
var projectileSpeed = 14;
var projectileShoot = 10;
var player;
var enemySummonTick = 100;


var score = 0;
var gameOver = false;

function gameover() {
    gameOver = true;
    ctx.fillStyle = "darkred";
    ctx.font =  width/10 + "px Standard Font";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", width/2,height/2);    

    setTimeout(resetGame(),2000);
};
function resetGame() {
    enemies = [];
    player = new Player(width/2,height/2, playerRadius,playerColor);
    gameOver = false;
    score = 0;
    document.getElementById("score").innerHTML = "Score: 0";
};

function getDistance(x1,y1,x2,y2) {
    var xDistance = x2-x1;
    var yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance,2) + 
        Math.pow(yDistance,2));
}
function drawHealthBar(x,y,width,height,health,maxHealth,yOffset) {
    var xPosition = x - width/2;
    var yPosition = y - yOffset;
    ctx.fillStyle = "red";
    ctx.fillRect(xPosition,yPosition,width,height);
    ctx.fillStyle = "limegreen";
    ctx.fillRect(xPosition,yPosition,width*(health/maxHealth),height);
};

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

    enemies.forEach((enemy) => {
        if (getDistance(this.x,this.y,enemy.x,enemy.y) < this.radius + enemy.radius) {
            gameover();
        }
      });
};

var Enemy = function(x,y,radius,color,xVel,yVel,speedMultiplier,health) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.xVel = xVel;
    this.yVel = yVel;
    this.speedMultiplier = speedMultiplier;
    this.maxHealth = health;
    this.health = this.maxHealth;
}
Enemy.prototype.draw = function() {
    circle(this.x,this.y,this.radius,this.color);
    drawHealthBar(this.x,this.y,100,10,this.health,this.maxHealth,this.radius + 15);
}
Enemy.prototype.update = function() {
    var xDiff = player.x - this.x;
    var yDiff = player.y - this.y;
    var angle = Math.atan2(yDiff,xDiff);
    this.xVel = Math.cos(angle) * this.speedMultiplier;
    this.yVel = Math.sin(angle) * this.speedMultiplier;
    this.x += this.xVel;
    this.y += this.yVel;
}

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
    var i = 0;
    enemies.forEach((enemy) => {
        if (getDistance(this.x,this.y,enemy.x,enemy.y) < this.radius + enemy.radius) {
            this.markedForDeletion = true;
            enemy.health -=1;
            if (enemy.health < 1) {
                score += enemy.maxHealth;
                document.getElementById("score").innerHTML = "Score: " + score;
                enemies.splice(i,1);        
            }
        }
        i++;
      });
}



resetGame();
function gameLoop() {
    if (gameOver) {
        return
    }
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
      enemies.forEach((enemy) => {
        enemy.draw();
        enemy.update();
      });
    if (gameFrame % enemySummonTick === 0) {
        var x = Math.random() * width;
        var y = Math.random() * height;
        if (Math.random() < 0.5) {
            x = 0;
        } else if (Math.random() < 0.5) {
            y = 0;
        } else if (Math.random() < 0.5) {
            x = width;
        } else {
            y = height;
        }
        var xDiff = player.x - x;
        var yDiff = player.y - y;
        var angle = Math.atan2(yDiff,xDiff);
        var xVel = Math.sin(angle) * enemySpeed;
        var yVel = Math.cos(angle) * enemySpeed;
        var random1 = Math.round(Math.random() * 365);
        var random2 = Math.round(Math.random() * 365);
        var random3 = Math.round(Math.random() * 365);
        var color = "rgb(" + random1 + ","+random2 + ","+random3 + ")";
        var enemyHealth = Math.round(Math.random() * maxEnemyHealth);
        var Radius = enemyHealth * 3 + 10;
        var enemy = new Enemy(x,y,Radius,color,xVel,yVel,enemySpeed,enemyHealth);
        enemies.push(enemy)
    }
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