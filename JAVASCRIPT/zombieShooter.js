var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var height = canvas.height;
var width = canvas.width;


var MULTIPLIER = 1536/width;


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
var hasBulletPowerup = false;
var hasBombPowerup = false;
var powerupMaxLength = 500;
var powerUpLength = powerupMaxLength;


var projectileRadius = 8*MULTIPLIER;
var projectileSpeed = 5*MULTIPLIER;
var projectileDamage = 2;

var player;


var enemySummonTick = 50;
var regularBulletSummonTick = 20;
var bulletSummonTick = regularBulletSummonTick;
var powerupExplosionBulletSummonTick = 70;
var powerupBulletSummonTick = 5;
var powerupSummonTick = 300;



var powerupColor = "brown";
var powerupWidth = (443/4)*MULTIPLIER;
var powerupHeight = (360/4)*MULTIPLIER;
var powerupTypes = ["Bomb","QuickShot","Explosion"];

var bombColor = "tan";
var bombPowerupRadius = 150;

var explosionDamage = 300;
var powerupExplosionDamage = 100;
var explosionRadius = 250;

var score = 0;
var gameOver = false;

canvas.focus();

var bombImage0 = document.querySelector("#idleBomb0");
var bombImage1 = document.querySelector("#idleBomb1");
var bombImage2 = document.querySelector("#idleBomb2");
var bombImage3 = document.querySelector("#idleBomb3");
var bombImage4 = document.querySelector("#idleBomb4");
var bombImage5 = document.querySelector("#idleBomb5");
var bombImage6 = document.querySelector("#idleBomb6");
var bombImage7 = document.querySelector("#idleBomb7");
var bombImage8 = document.querySelector("#idleBomb8");
var bombImage9 = document.querySelector("#idleBomb9");
var bombImage10 = document.querySelector("#idleBomb10");
var bombImage11 = document.querySelector("#idleBomb11");
var bombImage12 = document.querySelector("#idleBomb12");
var bombImages = [bombImage0,bombImage1,bombImage2,bombImage3,bombImage4,bombImage5,bombImage6,bombImage7,bombImage8,
    bombImage9,bombImage10,bombImage11,bombImage12];


var heroImage0 = document.querySelector("#idleHero0");
var heroImage1 = document.querySelector("#idleHero1");
var heroImage2 = document.querySelector("#idleHero2");
var heroImage3 = document.querySelector("#idleHero3");
var heroImage4 = document.querySelector("#idleHero4");
var heroImage5 = document.querySelector("#idleHero5");
var heroImage6 = document.querySelector("#idleHero6");
var heroImage7 = document.querySelector("#idleHero7");
var heroImage8 = document.querySelector("#idleHero8");
var heroImage9 = document.querySelector("#idleHero9");
var heroImage10 = document.querySelector("#idleHero10");
var heroImage11 = document.querySelector("#idleHero11");
var heroImage12 = document.querySelector("#idleHero12");
var heroImages = [heroImage0,heroImage1,heroImage2,heroImage3,heroImage4,heroImage5,heroImage6,heroImage7,heroImage8,
    heroImage9,heroImage10,heroImage11,heroImage12];


var basicenemyImage0 = document.querySelector("#enemy10");
var basicenemyImage1 = document.querySelector("#enemy11");
var basicenemyImage2 = document.querySelector("#enemy12");
var basicenemyImage3 = document.querySelector("#enemy13");
var basicenemyImage4 = document.querySelector("#enemy14");
var basicenemyImage5 = document.querySelector("#enemy15");
var basicenemyImage6 = document.querySelector("#enemy16");
var basicenemyImages = [basicenemyImage0,basicenemyImage1,basicenemyImage2,basicenemyImage3,basicenemyImage4,basicenemyImage5,basicenemyImage6];

var mediumenemyImage0 = document.querySelector("#enemy20");
var mediumenemyImage1 = document.querySelector("#enemy21");
var mediumenemyImage2 = document.querySelector("#enemy22");
var mediumenemyImage3 = document.querySelector("#enemy23");
var mediumenemyImage4 = document.querySelector("#enemy24");
var mediumenemyImage5 = document.querySelector("#enemy25");
var mediumenemyImage6 = document.querySelector("#enemy26");
var mediumenemyImages = [mediumenemyImage0,mediumenemyImage1,mediumenemyImage2,mediumenemyImage3,mediumenemyImage4,mediumenemyImage5,mediumenemyImage6];

var hardenemyImage0 = document.querySelector("#enemy30");
var hardenemyImage1 = document.querySelector("#enemy31");
var hardenemyImage2 = document.querySelector("#enemy32");
var hardenemyImage3 = document.querySelector("#enemy33");
var hardenemyImage4 = document.querySelector("#enemy34");
var hardenemyImage5 = document.querySelector("#enemy35");
var hardenemyImage6 = document.querySelector("#enemy36");
var hardenemyImages = [hardenemyImage0,hardenemyImage1,hardenemyImage2,hardenemyImage3,hardenemyImage4,hardenemyImage5,hardenemyImage6];

var treasureChestImg = document.querySelector("#treasureChest");

var explosionSound = new Audio();
explosionSound.src = "../Sounds/Explosion2.wav";

var explodeImage0 = document.querySelector("#Explosion0");
var explodeImage1 = document.querySelector("#Explosion1");
var explodeImage2 = document.querySelector("#Explosion2");
var explodeImage3 = document.querySelector("#Explosion3");
var explodeImage4 = document.querySelector("#Explosion4");
var explodeImage5 = document.querySelector("#Explosion5");
var explodeImage6 = document.querySelector("#Explosion6");
var explodeImage7 = document.querySelector("#Explosion7");
var explodeImage8 = document.querySelector("#Explosion8");
var explodeImage9 = document.querySelector("#Explosion9");
var explodeImage10 = document.querySelector("#Explosion10");
var explodeImage11 = document.querySelector("#Explosion11");
var explodeImage12 = document.querySelector("#Explosion12");
var explosionImages = [explodeImage0,explodeImage1,explodeImage2,explodeImage3,explodeImage4,explodeImage5,explodeImage6,explodeImage7,explodeImage8,
    explodeImage9,explodeImage10,explodeImage11,explodeImage12];



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
    hasBulletPowerup = false;
    hasBombPowerup = false;
    bulletSummonTick = regularBulletSummonTick;
    gameOver = false;
    gameLoop();
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
    var xPosition = (x-width/2);
    var yPosition = (y-yOffset);
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
    this.index = 0;
    this.maxIndex = heroImages.length;
    this.image = heroImage0;
    this.staggerFrames = 5;
    this.direction = "right";
}
Player.prototype.draw = function() {
    var x = (this.x-this.radius);
    var y = (this.y-this.radius);
    ctx.drawImage(this.image,0,0,1500,1001,x,y,this.radius*4,this.radius*3);
    if (hasBulletPowerup || hasBombPowerup) {
        var powerupBarX = width * 0.5;
        var powerupBarY = height * 0.75;
        var powerupBarWidth = width * 0.4;
        var powerupBarHeight = height * 0.05;
        drawBar(powerupBarX,powerupBarY,powerupBarWidth,powerupBarHeight,powerUpLength,powerupMaxLength,0);
        powerUpLength--;
        if (powerUpLength < 1) {
            hasBulletPowerup = false;
            hasBombPowerup = false;
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

      if (gameFrame % this.staggerFrames === 0) {
        this.index++;
        this.image = heroImages[this.index % this.maxIndex];
      }    



};

var Enemy = function(x,y,radius,color,xVel,yVel,speedMultiplier,health,random4) {
    this.x = x;
    this.y = y;
    this.imageWidth = 2000;
    this.imageHeight = 2000;
    this.radius = radius;
    this.color = color;
    this.xVel = xVel;
    this.yVel = yVel;
    this.speedMultiplier = speedMultiplier;
    this.maxHealth = health;
    this.health = this.maxHealth;
    this.index = 0;
    this.maxIndex = basicenemyImages.length;
    this.image;
    this.staggerFrames = 10;
    this.random4 = random4;
    this.enemyType;
    this.enemyWidthDivider;
    if (random4 < 0.5) {
        this.enemyWidthDivider = 20;
        this.enemyType = "small";
        this.image = basicenemyImage0;
    } else if (random4 < 0.7) {
        this.enemyWidthDivider = 15;    
        this.enemyType = "medium"; 
        this.image = basicenemyImage0;
    } else if (random4 < 0.95) {
        this.enemyWidthDivider = 10;    
        this.enemyType = "medium"; 
        this.image = mediumenemyImage0;
    } else {
        this.enemyWidthDivider = 5;
        this.enemyType = "large";
        this.image = hardenemyImage0;
    }
}
Enemy.prototype.draw = function() {
    var x = (this.x-this.radius);
    var y = (this.y-this.radius);
    ctx.drawImage(this.image,0,0,this.imageWidth,this.imageHeight,x,y,this.imageWidth/this.enemyWidthDivider,this.imageHeight/this.enemyWidthDivider);
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

    if (gameFrame % this.staggerFrames === 0) {
        this.index++;
        if (this.enemyType === "medium") {
            this.image = mediumenemyImages[this.index % this.maxIndex];
        } else if (this.enemyType === "large") {
            this.image = hardenemyImages[this.index % this.maxIndex];            
        } else {
            this.image = basicenemyImages[this.index % this.maxIndex];
        }

      }
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
            if (hasBombPowerup) {
                var bomb = new Bomb(this.x,this.y,bombPowerupRadius);
                bombs.push(bomb);
            } else {
                enemy.health -=projectileDamage;
            }
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
    this.img = treasureChestImg;
    this.imgWidth = 443;
    this.imgHeight = 360;
}
Powerup.prototype.draw = function() {
    ctx.drawImage(this.img,0,0,this.imgWidth,this.imgHeight, this.x,this.y,this.width,this.height);
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
    this.maxIndex = bombImages.length;
    this.image = bombImage0;
    this.staggerFrames = 5;
}
Bomb.prototype.draw = function() {
    var x = (this.x-this.radius);
    var y = (this.y-this.radius);
    ctx.drawImage(this.image,0,0,1215,761,x,y,this.radius*4,this.radius*3);
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
        this.image = bombImages[this.index % this.maxIndex];
      }
}
var Explosion = function(x,y) {
    this.x = x;
    this.y = y;
    if (hasBombPowerup) {
        this.radius = bombPowerupRadius;
        this.damage = powerupExplosionDamage;
    } else {
        this.radius = explosionRadius;
        this.damage = explosionDamage;
    }
    this.color = bombColor;
    this.markedForDeletion = false;
    this.exploded = false;
    this.frame = 0;
    this.afterAffectFrames = 20;
    this.index = 0;
    this.maxIndex = explosionImages.length;
    this.image = explosionImages[0];
    this.staggerFrames = 10;
    
}
Explosion.prototype.draw = function() {
    var x = (this.x-(this.radius*2));
    var y = (this.y-(this.radius*2.5));
    ctx.drawImage(this.image,0,0,1215 ,761,x,y,this.radius*4,this.radius*3);
}   
Explosion.prototype.update = function() {
    if (!this.exploded) {
        explosionSound.play();
        enemies.forEach((enemy) => {
            var distance = getDistance(this.x,this.y,enemy.x,enemy.y)
            if (distance < this.radius + enemy.radius) {
                enemy.health -= this.damage;
                
            }
          });
          this.exploded = true;
        } else {
            if (gameFrame % this.staggerFrames === 0) {
                this.index++;
                if (this.index === this.maxIndex) {
                    this.markedForDeletion = true;
                } else {
                    this.image = explosionImages[this.index];
                }
              }
        }


}

var summonNewProjectile = function() {
    var x = canvas.width/2;
    var y = canvas.height/2;
    const angle = Math.atan2(
    Mouse.y-y,
    Mouse.x-x
    );
    const xVel = Math.cos(angle) * projectileSpeed;
    const yVel = Math.sin(angle) * projectileSpeed;

    var projectile = new Projectile(player.x, player.y,xVel,yVel,projectileRadius,"Black");
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
    } else if (random4 < 0.7) {
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
    var enemy = new Enemy(x,y,Radius,color,xVel,yVel,enemySpeed,enemyHealth,random4);
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
    } else if (thisPowerupType === "Explosion"){
        thisPowerupColor = "Purple";
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
        explosions.push(bomb)
    } else if (powerup.type === "Explosion"){
        hasBombPowerup = true;
        bulletSummonTick = powerupExplosionBulletSummonTick;
        powerUpLength = powerupMaxLength;
    } else {
        hasBulletPowerup = true;
        bulletSummonTick = powerupBulletSummonTick;
        powerUpLength = powerupMaxLength;
    }
}



function gameLoop() {
    if (gameOver) {
        return;
    }
    var grassBackground = document.querySelector("#background")
    ctx.clearRect(0,0,width,height);
    ctx.drawImage(grassBackground,0,0,width,height);

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



window.onload = function() {
    resetGame();
}