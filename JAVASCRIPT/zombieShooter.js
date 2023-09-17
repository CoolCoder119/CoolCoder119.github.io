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
var bombs = [];
var explosions = [];

var playerColor = "red";
var projectileColor = "pink";
var enemyColor = "teal";

var enemyInfo = function(health,radius,speed) {
    this.health = health
    this.radius = radius;
    this.speed = speed;
}

var basicEnemy = new enemyInfo(3,30*MULTIPLIER,1*MULTIPLIER);
var mediumEnemy = new enemyInfo(8,50*MULTIPLIER,0.6*MULTIPLIER);
var hardEnemy = new enemyInfo(20,70*MULTIPLIER,0.4);
var ultraEnemy = new enemyInfo(400,120*MULTIPLIER,0.2);

var gameFrame = 0;


var playerRadius = 20*MULTIPLIER;
var playerSpeed = 3*MULTIPLIER;
var hasPowerup = false;
var powerupMaxLength = 500;
var powerUpLength = powerupMaxLength;


var projectileRadius = 8*MULTIPLIER;
var projectileSpeed = 10*MULTIPLIER;
var projectileDamage = 2;

var player;


var enemySummonTick = 50;
var regularBulletSummonTick = 20;
var bulletSummonTick = regularBulletSummonTick;
var powerupBulletSummonTick = 5;
var powerupSummonTick = 1000;



var powerupColor = "brown";
var powerupWidth = 100*MULTIPLIER;
var powerupHeight = 100*MULTIPLIER;
var powerupTypes = ["Bomb","QuickShot"];

var bombColor = "tan";

var explosionDamage = 400;
var explosionRadius = 300;

var score = 0;
var gameOver = false;

var bombImage0 = document.querySelector("idleBomb0");
var bombImage1 = document.querySelector("idleBomb1");
var bombImage2 = document.querySelector("idleBomb2");
var bombImages = [bombImage0,bombImage1,bombImage2];



function gameover() {
    gameOver = true;
    ctx.fillStyle = "darkred";
    ctx.font =  width/10 + "px Standard Font";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", width/2,height/2);    

    setTimeout(() => {
        document.querySelector(".deadDiv").style.display = "inline-block";
        document.querySelector("#finalScore").innerHTML = "Score: " +score;   
    }, 1000);
};
function resetGame() {

    player = new Player(width/2,height/2, playerRadius,playerColor);
    score = 0;
    document.getElementById("score").innerHTML = "Score: 0";
    enemies = [];
    projectiles = [];
    bombs = [];
    explosions= [];
    hasPowerup = false;
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


    if (hasPowerup) {
        var powerupBarX = width * 0.5;
        var powerupBarY = height * 0.75;
        var powerupBarWidth = width * 0.4;
        var powerupBarHeight = height * 0.05;
        drawBar(powerupBarX,powerupBarY,powerupBarWidth,powerupBarHeight,powerUpLength,powerupMaxLength,0);
        powerUpLength--;
        if (powerUpLength < 1) {
            hasPowerup = false;
            bulletSummonTick = regularBulletSummonTick;
        }
    }
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
                giveHeroPowerup(powerup);
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
    this.index = 0;
    this.image = document.querySelector("#zombie");
}
Enemy.prototype.draw = function() {
    ctx.drawImage(this.image,0,0,761,901,this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
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
        }
        i++;
      });
}

var Powerup = function(x,y,width,height,powerupColor,type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = powerupColor;
    this.markedForDeletion = false;
    this.type = type;
}
Powerup.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
}

var Bomb = function(x,y,radius) {
    this.x = x;
    this.y = y;
    this.xVel = 0;
    this.yVel = 0;
    this.radius = radius;
    this.color = "Red";
    this.markedForDeletion = false;
    this.index = 0;
    this.maxIndex = 2;
    this.image = bombImages[0];
    this.staggerFrames = 5;
    
}
Bomb.prototype.draw = function() {
    ctx.drawImage(this.image,0,0,1215,761,this.x-this.radius*2,this.y-this.radius*2,this.radius*4,this.radius*3);
}
Bomb.prototype.update = function() {
    var closestEnemy;
    var closestDistance = 999;
    var closestEnemyIndex;
    enemies.forEach((enemy,i) => {
        var distanceToEnemy = getDistance(this.x,this.y,enemy.x,enemy.y);
        if (distanceToEnemy < closestDistance) {
            closestDistance = distanceToEnemy;
            closestEnemy = enemy;
            closestEnemyIndex = i;
        }
      });
      this.xVel = 0;
      this.yVel = 0;
      if (closestEnemy) {
        if (closestDistance < this.radius + closestEnemy.radius) {
            this.markedForDeletion = true;
            summonNewExplosion(this);
        }

        var xDiff = closestEnemy.x - this.x;
        var yDiff = closestEnemy.y - this.y;
        var angle = Math.atan2(yDiff,xDiff);
        this.xVel = Math.cos(angle);
        this.yVel = Math.sin(angle);
        this.x += this.xVel;
        this.y += this.yVel;
      }
      else {
        console.log("no enemy!");
      }

      if (gameFrame % this.staggerFrames === 0) {
        this.index++;
        if (this.index > bombImages.length) {
            this.index === 0;   
        }
        this.image = bombImages[this.index];
      }
}

var Explosion = function(x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.markedForDeletion = false;
    this.exploded = false;
    this.frame = 0;
    this.afterAffectFrames = 20;
    this.opacity = 1;
}
Explosion.prototype.draw = function() {
    console.log(this.opacity);
    circle(this.x,this.y,this.radius,"rgba(365,0,0," + this.opacity + ")");
}   
Explosion.prototype.update = function() {
    enemies.forEach((enemy) => {
        var distance = getDistance(this.x,this.y,enemy.x,enemy.y)
        if (distance < this.radius + enemy.radius) {
            enemy.health -= explosionDamage;
            
        }
      });
    this.exploded = true;
    if (this.exploded) {
        this.frame++;
        this.opacity -= 1/this.afterAffectFrames;
        if (this.frame % this.afterAffectFrames === 0) {
            this.markedForDeletion = true;
        }
    }

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

var summonNewExplosion = function(bomb) {
    var explosion = new Explosion(bomb.x,bomb.y,explosionRadius,bomb.color);
    explosions.push(explosion);
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
    } else if (random4 < 0.85) {
        var Radius = mediumEnemy.radius;
        var enemySpeed = mediumEnemy.speed;
        var enemyHealth = mediumEnemy.health;
    } else if (random4 < 0.99) {
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
    var x = (Math.random() * (width - thisPowerupWidth));
    var y = (Math.random() * (height - thisPowerupHeight));
    var thisPowerupType = powerupTypes[Math.floor(Math.random() * powerupTypes.length)];

    var thisPowerupColor;
    if (thisPowerupType === "Bomb") {
        thisPowerupColor = "Red";
    } else {
        thisPowerupColor = "Yellow";
    }

    var powerup = new Powerup(x,y,thisPowerupWidth,thisPowerupHeight,thisPowerupColor,thisPowerupType);
    powerups.push(powerup);
    powerupSummonTick = 1000;
}

var giveHeroPowerup = function(powerup) {
    if (powerup.type === "Bomb") {
        var bomb = new Bomb(player.x,player.y,player.radius*3,bombColor);
        bombs.push(bomb)
    } else {
        hasPowerup = true;
        bulletSummonTick = powerupBulletSummonTick;
        powerUpLength = powerupMaxLength;
    }
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
    projectiles.forEach((projectile,i) => {
        projectile.update();
        projectile.draw();
        if (projectile.markedForDeletion) {
            projectiles.splice(i,1);
        }
      });
      enemies.forEach((enemy,i) => {
        enemy.draw();
        enemy.update();
        if (enemy.health < 1) {
            score += enemy.maxHealth;
            document.getElementById("score").innerHTML = "Score: " + score;
            enemies.splice(i,1);        
        }
      });
      bombs.forEach((bomb,i) => {
        bomb.draw();
        bomb.update();
        if (bomb.markedForDeletion) {
            bombs.splice(i,1);
        }
      });
      bombs.forEach((bomb,i) => {
        bomb.draw();
        bomb.update();
        if (bomb.markedForDeletion) {
            bombs.splice(i,1);
        }
      });
      explosions.forEach((explosion,i) => {
        explosion.draw();
        explosion.update();
        if (explosion.markedForDeletion) {
            explosions.splice(i,1);
        }
      });
      powerups.forEach((powerup,i) => {
        powerup.draw();
        if (powerup.markedForDeletion) {
            powerups.splice(i,1);
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