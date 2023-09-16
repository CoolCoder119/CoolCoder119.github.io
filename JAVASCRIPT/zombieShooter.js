
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var height = canvas.height;
var width = canvas.width;

var MULTIPLIER = width/1536;

var projectiles = [];
var enemies = [];
var powerups = [];

var playerColor = "red";
var projectileColor = "pink";
var enemyColor = "teal";

var enemyInfo = function(health,radius,speed) {
    this.health = health
    this.radius = radius;
    this.speed = speed;
}

var basicEnemy = new enemyInfo(1,16*MULTIPLIER,1*MULTIPLIER);
var mediumEnemy = new enemyInfo(5,20*MULTIPLIER,0.6*MULTIPLIER);
var hardEnemy = new enemyInfo(30,40*MULTIPLIER,0.2);
var ultraEnemy = new enemyInfo(100,60*MULTIPLIER,0.1);

var gameFrame = 0;


var playerRadius = 20*MULTIPLIER;
var playerSpeed = 3*MULTIPLIER;
var hasPowerup = true;
var powerupMaxLength = 300;
var powerUpLength = powerupMaxLength;


var projectileRadius = 8*MULTIPLIER;
var projectileSpeed = 10*MULTIPLIER;
var projectileDamage = 1;

var player;


var enemySummonTick = 50;
var bulletSummonTick = 20;
var powerupSummonTick = 1000;



var powerupColor = "yellow";
var powerupWidth = 100*MULTIPLIER;
var powerupHeight = 100*MULTIPLIER;

var score = 0;
var gameOver = false;





function gameover() {
    gameOver = true;
    ctx.fillStyle = "darkred";
    ctx.font =  width/10 + "px Standard Font";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", width/2,height/2);    


    document.querySelector(".deadDiv").style.display = "inline-block";
    document.querySelector("#finalScore").innerHTML = "Score: " +score;
};
function resetGame() {

    player = new Player(width/2,height/2, playerRadius,playerColor);
    score = 0;
    document.getElementById("score").innerHTML = "Score: 0";
    enemies = [];
    gameOver = false;
    gameLoop();
};

document.querySelector(".restartButton").onclick = function() {
    document.querySelector(".deadDiv").style.display = "none";
    resetGame();
};

function getDistance(x1,y1,x2,y2) {
    var xDistance = x2-x1;
    var yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance,2) + 
        Math.pow(yDistance,2));
}
function touching(x1,x2,y1,y2,width1,width2,height1,height2) {
    return x1+width1 > x2 &&
           y1+height1 > y2 &&
           x1 <= x2+width2 &&
           y1 <= y2+height2;
}
function drawBar(x,y,width,height,health,maxHealth,yOffset) {
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
    this.x = width/2;
    this.y = height/2 + 1;
}
var Mouse = new mouse();
var Player = function(x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xOffset = this.radius;
    this.yOffset = this.radius;
    this.width = radius*2;
    this.height = radius*2;
    this.color = color;
    this.speed = playerSpeed;
}
Player.prototype.draw = function() {
    circle(this.x,this.y,this.radius,this.color);

    var powerupBarX = width * 0.5;
    var powerupBarY = width * 0.75;
    var powerupBarWidth = width * 0.4;
    var powerupBarHeight = height * 0.05;
    drawBar(powerupBarX,powerupBarY,powerupBarWidth,powerupBarHeight,powerUpLength,powerupMaxLength);
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
      powerups.forEach((powerup) => {
            var x = this.x-this.xOffset;
            var y = this.y-this.yOffset;
            var width = this.width;
            var height = this.height;
            var isTouching = touching(x,powerup.x,y,powerup.y,width,powerup.width,height,powerup.height);
            if (isTouching) {
                powerup.markedForDeletion = true;
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
    drawBar(this.x,this.y,(this.radius * 2) / 0.75,5,this.health,this.maxHealth,this.radius * 1.2);
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
            enemy.health -=projectileDamage;
            if (enemy.health < 1) {
                score += enemy.maxHealth;
                document.getElementById("score").innerHTML = "Score: " + score;
                enemies.splice(i,1);        
            }
        }
        i++;
      });
}

var Powerup = function(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = powerupColor;
    this.markedForDeletion = false;
}
Powerup.prototype.draw = function() {
    ctx.fillRect(this.x,this.y,this.width,this.height);
}

var summonNewProjectile = function() {
    var x = player.x - player.radius;
    var y = player.y - player.radius;
    const angle = Math.atan2(
    Mouse.y-y,
    Mouse.x-x
    );
    const xVel = Math.cos(angle) * projectileSpeed;
    const yVel = Math.sin(angle) * projectileSpeed;

    var projectile = new Projectile(player.x, player.y,xVel,yVel,projectileRadius,projectileColor);
    projectiles.push(projectile)
}

var summonNewEnemy = function() {
    var x = Math.random() * width;
    var y = Math.random() * height;
    x = 0;
    var xDiff = player.x - x;
    var yDiff = player.y - y;
    var angle = Math.atan2(yDiff,xDiff);
    var xVel = Math.sin(angle) * enemySpeed;
    var yVel = Math.cos(angle) * enemySpeed;
    var random1 = Math.round(Math.random() * 365);
    var random2 = Math.round(Math.random() * 365);
    var random3 = Math.round(Math.random() * 365);
    var random4 = Math.random();
    var color = "rgb(" + random1 + ","+random2 + ","+random3 + ")";
    var enemyHealth = Math.round(Math.random() * 100);
    var Radius;
    var enemySpeed;
    var enemyHealth;
    if (random4 < 0.5) {
        var Radius = basicEnemy.radius;
        var enemySpeed = basicEnemy.speed;
        var enemyHealth = basicEnemy.health;
    } else if (random4 < 0.8) {
        var Radius = mediumEnemy.radius;
        var enemySpeed = mediumEnemy.speed;
        var enemyHealth = mediumEnemy.health;
    } else if (random4 < 0.95) {
        var Radius = hardEnemy.radius;
        var enemySpeed = hardEnemy.speed;
        var enemyHealth = hardEnemy.health;            
    } else {
        var Radius = ultraEnemy.radius;
        var enemySpeed = ultraEnemy.speed;
        var enemyHealth = ultraEnemy.health;             
    }
    var enemy = new Enemy(x,y,Radius,color,xVel,yVel,enemySpeed,enemyHealth);
    enemies.push(enemy)
}

var summonNewPowerup = function() {
    var thisPowerupWidth = powerupWidth;
    var thisPowerupHeight = powerupHeight;
    var x = Math.random() * width;
    var y = Math.random() * height;
    var powerup = new Powerup(x,y,thisPowerupWidth,thisPowerupHeight);
    powerups.push(powerup);
    powerupSummonTick = 1000;
}





resetGame();


function gameLoop() {
    if (gameOver) {
        return;
    }
    ctx.fillStyle = "rgba(0,0,0,0.1)";

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
      powerups.forEach((powerup,i) => {
        powerup.draw();
        if (powerup.markedForDeletion) {
            powerups.splice(i,1);
            console.log("splcied");
        }
      });
    if (gameFrame % enemySummonTick === 0) {
        summonNewEnemy();
    }
    if (gameFrame % bulletSummonTick === 0) {
        summonNewProjectile();
    }
    if (gameFrame % powerupSummonTick === 0) {
        summonNewPowerup();
    }
    gameFrame++;
    requestAnimationFrame(gameLoop);
}






addEventListener('click', (event) => {
    ctx.fillStyle = "aqua";

});

addEventListener('mousemove', (event) => {
    Mouse.x = event.x;
    Mouse.y = event.y;
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