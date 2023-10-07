var canvas = document.getElementById("canvas");
var xDiff,yDiff = canvas.getBoundingClientRect();
var ctx = canvas.getContext('2d');
var width = window.innerWidth/1.5;
var height = window.innerWidth/3;
canvas.width =width;
canvas.height = height;


var multiplier = 1024/width;
var dirtImg = document.querySelector("#dirt");
var lavaImg = document.querySelector("#lava");

var scrollX = 0;
var shouldScroll = false;

var currentId = 0;
var gameFrame = 0;

var ProjectileSpawnLength = 20;

var levels = [
    [
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
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




    for (var i = 0; i < levels.length; i++) {
        for (var column = 0; column < 10; column++) {
            for (var row = 0; row < 20; row++) {
                var number = levels[i][column][row];
                gameBoard[column].push(number);
            }
        }
    };  


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

var circleRadius = 10*multiplier;

var windRESISTANCE = 0.85;
var GRAVITY = 0.4*multiplier;
var jumpForce = 12*multiplier;
var movementSpeed = 5*multiplier;
var speed = 3*multiplier;

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



var currentLevel = 0;
var blockSize = width/gameBoard[0].length;
var blockColor = "green";
var deathColor = "red";

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
}
Player.prototype.draw = function() {
    ctx.fillStyle = this.color;
    if (shouldScroll) {
        ctx.fillRect(this.x-scrollX,this.y,this.width,this.height);
    } else {
        ctx.fillRect(this.x,this.y,this.width,this.height);
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
        this.yVel = 0- jumpForce;

    }
    if (this.mouse.keyA) {
        this.xVel = -1 * movementSpeed;
    }
    if (this.mouse.keyD) {
        this.xVel = 1 * movementSpeed;
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
        this.x = blockSize;
        this.xVel = 0;
        this.y = height-(blockSize*4);
        this.yVel = 0;
    } 
    if (this.isPlayer || shouldScroll !== true) {
        scrollX = this.x-width/2;
    }

    if (gameFrame % ProjectileSpawnLength === 1&& this.mouse.keyS) {
        var angle;
        console.log(this.direction);
        if (this.direction = "right") {
            angle = 90 / multiplier;
        } else {
            angle = -90 / multiplier;
        }
        var xVel = Math.cos(angle);
        var yVel = Math.sin(angle);
        var projectile = new Projectile(
            this.x,
            this.y,
            xVel,
            yVel,
            this.playerID,
            this.color
        );
        projectiles.push(projectile);
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
    this.yVel += GRAVITY;
    this.x += this.xVel*10*multiplier;
    this.y += this.yVel;
    if (this.checkTouching()) {
        this.markedForDeletion = true;
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
                ctx.drawImage(lavaImg,x-scrollX,y,blockSize,blockSize);
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
var newPlayer = new Player(blockSize*2,height-(blockSize*4),blockSize * 0.8,(blockSize*2) * 0.8,"blue",false);
players.push(newPlayer);

function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    if (gamePlaying) {
        gameFrame++;
        ctx.clearRect(0,0,width,height);
        drawGameBoard();
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
    changeLevel();
    gamePlaying = true;
}