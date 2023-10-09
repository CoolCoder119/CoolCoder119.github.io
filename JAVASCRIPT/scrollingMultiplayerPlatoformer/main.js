var canvas = document.getElementById("canvas");
var canvas2 = document.querySelector(".canvas2");
var canvasInfo = canvas.getBoundingClientRect();
var xDiff = canvasInfo.left;
var yDiff = canvasInfo.top;
var ctx = canvas.getContext('2d');
var width = window.innerWidth/1.2;
var height = window.innerWidth/2.4;
canvas.width =width;
canvas.height = height;
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
canvas.focus();

var levels = [
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
        [1,0,1,2,0,0,0,1,1,2,1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,1,0,1,0,0,1,1,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1],
        [1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],  
]
var gameBoard = [
    [],
    [],
    [],
    [],
    [],
    [],    
    [],
    [],
    [],
    []   
]


var blankLevelSheet = [
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],    
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]   
];

var myLevels = [];





var level = levels[Math.round(Math.random() * (levels.length -1))];
for (var column = 0; column < 10; column++) {
    for (var row = 0; row < 20; row++) {
        var number = level[column][row];
        gameBoard[column].push(number);
    }
} 


var multiplier = 1024/width;
var dirtImg = document.querySelector("#dirt");
var lavaImg = document.querySelector("#lava");

var playerMaxHealth = 100;

var scrollX = 0;
var shouldScroll = false;

var currentId = 0;
var gameFrame = 0;


var bulletDamage = 8;
var lavaDamage = 0.3;
var ProjectileSpawnLength = 10;
var LavaFallLength = 20;

    /*calculations*/
var AnglestoOtherThing = 360 / (Math.PI * 2);
    /*variables */

var sunX = width*multiplier;
var sunY = 0+sunRadius;
var sunRadius = 30*multiplier;
var moonColor = "rgba(255,255,255,0.3)";
var sunColor = "rgba(255,255,21,1)";
var isDay = true;

var gamePlaying = true;

var players = [];
var projectiles = [];

var circleRadius = 8*multiplier;

var windRESISTANCE = 0.85;
var GRAVITY = 0.4*multiplier;
var jumpForce = 15*multiplier;
var movementSpeed = 8*multiplier;

var currentLevel = 0;
var blockSize = width/20;
var blockColor = "green";
var deathColor = "red";

function reset() {
    gameBoard = [
        [],
        [],
        [],
        [],
        [],
        [],    
        [],
        [],
        [],
        []   
    ]


    var level = levels[1];
    for(var column = 0; column < 10; column++) {
        for (var row = 0; row < 20; row++) {
            var number = level[column][row];
            gameBoard[column].push(number);
        }
    }  

    projectiles = [];
    currentPlayer.x = blockSize;
    currentPlayer.y = height-(blockSize*4);
    currentPlayer.xVel = 0;
    currentPlayer.yVel = 0;
    currentPlayer.health = currentPlayer.maxHealth;
    newPlayer.x = width-blockSize*2;
    newPlayer.y = height-(blockSize*4);
    newPlayer.xVel = 0;
    newPlayer.yVel = 0;
    newPlayer.health = newPlayer.maxHealth;
    gamePlaying = true;
}

function touching(object1,object2) {
    return object1.x+object1.width > object2.x &&
           object1.y+object1.height > object2.y &&
           object1.x <= object2.x+object2.width &&
           object1.y <= object2.y+object2.height;
}

function circle(x,y,radius,fillCircle) {
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2,false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

function drawBar(x,y,width,height,health,maxHealth,yOffset) {
    var xPosition = (x-width/2);
    var yPosition = (y-yOffset);
    ctx.fillStyle = "red";
    ctx.fillRect(xPosition,yPosition,width,height);
    ctx.fillStyle = "limegreen";
    ctx.fillRect(xPosition,yPosition,width*(health/maxHealth),height);
};






var Player = function(x,y,width,height,color,isPlayer) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.markedForDeletion = false;
    this.mouse = {
        x: undefined,
        y: undefined,
        clicked: false,
        keyW: false,
        keyA: false,
        keyS: false,
        keyD: false
    }
    this.isPlayer = isPlayer;
    this.yVel = 0;
    this.xVel = 0;
    this.onFloor = false;
    this.lastDirection = "right";
    this.id = currentId;
    currentId++;
    this.maxHealth = playerMaxHealth;
    this.health = this.maxHealth;
    this.player;
    if (this.id === 0) {
        this.player = 1;
    } else {
        this.player = 2;
    }
    this.image = document.querySelector("#cowboy");
    this.imgWidth = 96/3;
    this.imgHeight = 128/4;
    this.frameX = 0;
    this.frameY = 0;
    this.staggerFrames = 3;
    this.maxFrames = 3;
    this.jumpForce = jumpForce;
    this.movementSpeed = movementSpeed;
    this.moving = false;
}
Player.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.font = (multiplier*15) + "px New Roman";
    ctx.fillStyle = "White";
    ctx.textAlign = "middle";
    ctx.textBaseline = "bottom";
    if (shouldScroll) {
        ctx.save();
        if (this.lastDirection === "left" && false) {
            ctx.rotate(180 * Math.PI * 2);
        }
        ctx.drawImage(this.image,
            this.frameX * this.imgWidth,
            this.frameY*this.imgHeight,
            this.imgWidth,
            this.imgHeight,
            this.x,
            this.y,
            this.width,
            this.height);  
        ctx.restore();

        drawBar(this.x-scrollX,this.y,this.width, this.height,this.health,this.maxHealth,10*multiplier);
        ctx.fillText("Player " +  this.player, this.x - scrollX, this.y - this.width * 0.3);
        offset = (toString(SIZEb).length + (blockSize * -5));
    } else {

        ctx.save()
        if (this.lastDirection === "left" && false) {
            ctx.translate(this.x + this.width/2, this.y + this.height/2);
            ctx.rotate(180 / AnglestoOtherThing);
            ctx.translate(0 - (this.x + this.width/2), 0 - (this.y + this.height/2));
        }
        ctx.drawImage(this.image,
            this.frameX * this.imgWidth,
            this.frameY*this.imgHeight,
            this.imgWidth,
            this.imgHeight,
            this.x-this.width/2,
            this.y-this.height/5,
            this.width*1.5,
            this.height*1.5);
        ctx.restore();
        ctx.fillText("Player " +  this.player, this.x, this.y - this.width * 0.3);
        drawBar(this.x+this.width/2+1/5/2,this.y,this.width*1.5, this.height*0.1,this.health,this.maxHealth,10);
    }

}
Player.prototype.checkTouching = function() {
    var isTouching = false;
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 1) {
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                    isTouching = true;
                }
            }
        }
    }
    return isTouching;
};
Player.prototype.checkTouchingLava = function() {
    var isTouching = false;
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 2) {
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                    isTouching = true;
                }
            }
        }
    }
    return isTouching;
};
Player.prototype.update = function() {
    this.xVel = this.xVel * windRESISTANCE;
    this.x += this.xVel;
    if (this.checkTouching() || this.x <= 0) {
        this.x -= this.xVel;
        this.xVel = 9;
    }

    if (this.mouse.keyW && this.onFloor) {
        this.yVel = 0- this.jumpForce;

    }
    if (this.mouse.keyA) {
        this.xVel = -1 * this.movementSpeed;
        this.moving = true;
    }else if (this.mouse.keyD) {
        this.xVel = 1 * this.movementSpeed;
        this.moving = true;
    } else {
        this.moving = false;
    }


    this.yVel += GRAVITY;
    this.y += this.yVel;
    if (this.checkTouching()) {
        this.y -= this.yVel;
        this.yVel = 0;
        if (this.yVel >= 0) {
            this.onFloor = true;
        }
    } else {
        this.onFloor = false;
    }
    if (this.y <= 0) {
        this.y -= this.yVel;
        this.yVel = 0;
    }

    if (this.checkTouchingLava()) {
        this.jumpForce = jumpForce * 0.7;
        this.movementSpeed = movementSpeed * 0.5;
        this.health -= lavaDamage;
        if (this.health <= 0) {
            gamePlaying = false;
            if (this.id === 0) {
                document.querySelector("#finalScore").innerHTML = "Player 2 Won!";
            }  else {
                document.querySelector("#finalScore").innerHTML = "Player 1 Won!";
            }
            document.querySelector(".deadDiv").style.display = "inline-block";
        }
    }  else {
        this.jumpForce = jumpForce;
        this.movementSpeed = movementSpeed;
    }
    if (this.isPlayer || shouldScroll !== true) {
        scrollX = this.x-width/2;
    }

    if (gameFrame % ProjectileSpawnLength === 1&& this.mouse.keyS) {
        var yVel = 0;
        var xVel;
        if (this.lastDirection === "right") {
            xVel = 1;
        } else {
            xVel = -1;
        }
         var projectile = new Projectile(
            this.x+this.width/2,
            this.y+this.height/5,
            xVel,
            yVel,
            this.id,
            this.color
        );
        projectiles.push(projectile);
    }

    if (gameFrame % this.staggerFrames === 0 && this.moving === true) {
        this.frameX++;
        if (this.frameX === this.maxFrames) {
            this.frameX = 0;
        }
      }   
    if (this.xVel === 0) {
        this.frameX = 0;
        this.frameY = 0;
    } 
}

var Projectile = function(x,y,xVel,yVel,playerID,color) {
    this.x = x;
    this.y = y;
    this.width = circleRadius*2;
    this.height = circleRadius*2;
    this.radius = circleRadius;
    this.xVel = xVel;
    this.yVel = yVel;
    this.playerID = playerID;
    this.color = color;
    this.damage = bulletDamage;
}

Projectile.prototype.draw = function() {
    ctx.fillStyle = this.color;
    circle(this.x,this.y,this.radius,true);
}

Projectile.prototype.checkTouching = function() {
    var isTouching = false;
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 1) {
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                    isTouching = true;
                }
            }
        }
    }
    return isTouching;
};

Projectile.prototype.update = function() {
    //do something later
    this.yVel += GRAVITY*0.2;
    this.x += this.xVel*20*multiplier;
    this.y += this.yVel;
    if (this.checkTouching()) {
        this.markedForDeletion = true;
    }
    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        if (player.id !== this.playerID) {
            if (touching(this,player)) {
                this.markedForDeletion = true;
                player.health -= this.damage;
                if (player.health <= 0) {
                    gamePlaying = false;
                    if (player.id === 0) {
                        document.querySelector("#finalScore").innerHTML = "Player 2 Won!";
                    }  else {
                        document.querySelector("#finalScore").innerHTML = "Player 1 Won!";
                    }
                    document.querySelector(".deadDiv").style.display = "inline-block";
                } 
            };
        }
    }
};


function drawGameBoard() {
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < 20; row++) {
            var number = gameBoard[column][row];
            if (number === 1) {
                var x = row*blockSize;
                var y = column*blockSize;
                if (shouldScroll) {
                    ctx.drawImage(dirtImg,x-scrollX,y,blockSize,blockSize);
                } else {
                    ctx.drawImage(dirtImg,x,y,blockSize,blockSize);
                }
            } else if (number === 2) {
                var x = row*blockSize;
                var y = column*blockSize;
                if (shouldScroll) {
                    ctx.drawImage(lavaImg,x-scrollX,y,blockSize,blockSize);
                } else {
                    ctx.drawImage(lavaImg,x,y,blockSize,blockSize);
                }
            }
        }
    }

    if (isDay) {
        ctx.fillStyle = sunColor; 
    }else {
        ctx.fillStyle = moonColor;
    }
    ctx.beginPath();
    ctx.arc(sunX,sunY,sunRadius,0,Math.PI*2,false);
    ctx.fill();
}
function updateGameBoard() {
    if (gameFrame % LavaFallLength === 0) {
        makeLavaFall();
    }
}
function makeLavaFall() {
    var changedIndex = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]
    for (var column = gameBoard.length-1; column > 0; column--) {
        for (var row = 0; row < 20; row++) {
            var number = gameBoard[column][row];
            var changed = changedIndex[column][row]
            if (number == 2 && changed === 0) {
                var x = row*blockSize;
                var y = column*blockSize;
                var numberBelow = gameBoard[column+1][row];
                var numberLeft = gameBoard[column][row-1];
                var numberRight = gameBoard[column][row+1];
                if (numberBelow === 0 && column !== gameBoard.length) {
                    gameBoard[column+1][row] = 2;
                    changedIndex[column+1][row] = 1;
                }
                if (numberLeft === 0 && numberBelow === 1 && row !== 0) {
                    gameBoard[column][row-1] = 2;
                    changedIndex[column][row-1] = 1;
                }   
                if (numberRight === 0 && numberBelow === 1 && row !== 20) {
                    gameBoard[column][row+1] = 2;
                    changedIndex[column][row+1] = 1;
                }   
            }
        }
    }

    if (isDay) {
        ctx.fillStyle = sunColor; 
    }else {
        ctx.fillStyle = moonColor;
    }
    ctx.beginPath();
    ctx.arc(sunX,sunY,sunRadius,0,Math.PI*2,false);
    ctx.fill();
}


var currentPlayer = new Player(blockSize,height-(blockSize*4),blockSize * 0.8,(blockSize*2) * 0.8,"yellow",true);
players.push(currentPlayer);
var newPlayer = new Player(width-blockSize*2,height-(blockSize*4),blockSize * 0.8,(blockSize*2) * 0.8,"blue",false);
players.push(newPlayer);

function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    if (gamePlaying) {
        gameFrame++;
        ctx.clearRect(0,0,width,height);
        drawGameBoard();
        updateGameBoard();
        players.forEach((player,i) => {
            player.draw();
            player.update();
          });
          projectiles.forEach((projectile,i) => {
            projectile.draw();
            projectile.update();
            if (projectile.markedForDeletion) {
                projectiles.splice(i,1);
            }
          });

        sunX-= 1*multiplier;
        if (sunX > width/2) {
            sunY--;
        } else {
            sunY++;
        }
        if (sunX + sunRadius < 0) {
            sunX = width;
            sunY = 0+sunRadius;
            if (isDay) {
                isDay = false;
                document.querySelector("#canvas").style.background = "linear-gradient(to bottom,black, rgba(0,0,0,0))";
            } else {
                document.querySelector("#canvas").style.background = "linear-gradient(to bottom,aqua, rgba(0,0,0,0))";
                isDay = true;
            }
        }

    }
}

window.onload = function() {
    gameLoop();

}


addEventListener('mousemove', (event) => {
    currentPlayer.mouse.x = event.clientX-xDiff;
    currentPlayer.mouse.x = event.clientX - yDiff;    
});
addEventListener('mousedown', (event) => {
    currentPlayer.mouse.clicked = true;
});
addEventListener('mouseup', (event) => {
    currentPlayer.mouse.clicked = false;
});


document.addEventListener('keydown', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "w") {
        currentPlayer.mouse.keyW = true;
    } 
    if (code === "s") {
        currentPlayer.mouse.keyS = true;
    } 
    if (code === "a") {
        currentPlayer.mouse.keyA = true;
        currentPlayer.lastDirection = "left";
    }
    if (code === "d") {
        currentPlayer.mouse.keyD = true;
        currentPlayer.lastDirection = "right";
    }
  }, false);
document.addEventListener('keyup', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "w") {
        currentPlayer.mouse.keyW = false;
    } 
    if (code === "s") {
        currentPlayer.mouse.keyS = false;
    } 
    if (code === "a") {
        currentPlayer.mouse.keyA = false;
    } 
    if (code === "d") {
        currentPlayer.mouse.keyD = false;
    }
  }, false);





  document.addEventListener('keydown', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "ArrowUp") {
        newPlayer.mouse.keyW = true;
    } 
    if (code === "ArrowDown") {
        newPlayer.mouse.keyS = true;
    } 
    if (code === "ArrowLeft") {
        newPlayer.mouse.keyA = true;
        newPlayer.lastDirection = "left";
    }
    if (code === "ArrowRight") {
        newPlayer.mouse.keyD = true;
        newPlayer.lastDirection = "right";
    }
  }, false);
document.addEventListener('keyup', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "ArrowUp") {
        newPlayer.mouse.keyW = false;
    } 
    if (code === "ArrowDown") {
        newPlayer.mouse.keyS = false;
    } 
    if (code === "ArrowLeft") {
        newPlayer.mouse.keyA = false;
    } 
    if (code === "ArrowRight") {
        newPlayer.mouse.keyD = false;
    }
  }, false);

  document.querySelector(".restartButton").onclick = function() {
    document.querySelector(".deadDiv").style.display = "none";
    reset();
  }

  document.querySelector("#editLevels").onclick = function() {
    gamePlaying = false;
    canvas.style.display = "none";
    canvas
  }

