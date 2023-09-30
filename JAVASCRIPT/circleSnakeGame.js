var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var height = canvas.height;
var width = canvas.width;

var MULTIPLIER = width/1536;

var SCROLLX;
var SCROLLY;


var apples;
var snakes = [];




var appleMaxRadius = 5 * MULTIPLIER;
var randomColors = ["green","red","orange","blue","yellow","purple"];

var snakeMaxSize = 30;
var snakeStarterRadius = 2 * MULTIPLIER;
var snakeColor = "rgb(100,200,200)";
var snakeLineColor = "teal";
var snake;

var gameOver;
var gameTick;
var maxApples = 300;

var blockSize = 25;
var pushedAmount = 0;


var Mouse = function() {
    this.x = 100;
    this.y = 100;
    this.mousedown = false;
}

var mouse = new Mouse();

var MULTIPLIERX = 3;
var MULTIPLIERY = 3;
ctx.scale(MULTIPLIERX,MULTIPLIERY);

function getDistance(x1,y1,x2,y2) {
    var xDistance = x2-x1;
    var yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance,2) + 
        Math.pow(yDistance,2));
}


function setup() {
    snake = new Snake(this.width/2,this.height/2,snakeStarterRadius,snakeColor,"",false);
    snakes.push(snake);
    apples = [];
    gameTick = 0;
    gameOver = false;
    for (i = 0; i < maxApples; i++) {
        summonApple();
    }
    SCROLLX = 0;
    SCROLLY = 0;

    document.querySelector("#size").innerHTML = "Score: " + 0; 
    gameLoop();
}

function gameover() {
    gameOver = true;
    document.querySelector(".deadDiv").style.display = "inline-block";
}
function getDistance(x1,y1,x2,y2) {
    var xDistance = x2-x1;
    var yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance,2) + 
        Math.pow(yDistance,2));
}
function circle(x,y,radius,color,fillCircle,strokeCircle,lineWidth,lineColor) {
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x-SCROLLX,y-SCROLLY,radius,Math.PI * 2,false);
    if (fillCircle) {
        ctx.fill(); 
    }
    if (strokeCircle) {
        ctx.stroke();
    }
};

function drawBorder() {
    ctx.fillStyle = "red";
    ctx.fillRect(0-SCROLLX,0-SCROLLY,width,blockSize);
    ctx.fillRect(0-SCROLLX, (height - blockSize) - SCROLLY,width,blockSize);
    ctx.fillRect(0-SCROLLX,0-SCROLLY,blockSize,height);
    ctx.fillRect((width - blockSize) - SCROLLX, 0 - SCROLLY, blockSize, height);
}

var segment = function(x,y,radius,color,fillCircle) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.fillCircle = fillCircle;
    this.strokeColor = snakeLineColor;
}
segment.prototype.draw = function() {
    circle(this.x,this.y,this.radius,this.color,this.fillCircle,true,this.radius*0/1,this.strokeColor);
};
 
var Snake = function(startX,startY,radius,snakeColor, isAI) {
    this.isAI = isAI;
    this.circleRadius = radius;
    this.snakeColor = randomColors  [Math.round(Math.random() * randomColors.length)];
    this.segments = [
        new segment(startX,startY,this.circleRadius,this.snakeColor,true)
    ];
    this.size = this.segments.length;
    this.maxSize = snakeMaxSize;
    if (isAI) {
        this.snakeSpeedMultiplier = 1.2 * MULTIPLIER;
    } else {
        this.snakeSpeedMultiplier = 2.5 * MULTIPLIER;
    }

    this.powerupBonus = 1;
    this.score = 0;
    this.id = pushedAmount;
    pushedAmount++;


}
Snake.prototype.checkWallCollision = function(head) {
    return head.x - head.radius <= blockSize ||
           head.x + head.radius >= width-blockSize ||
           head.y - head.radius <= blockSize ||
           head.y + head.radius >= height-blockSize;
}
Snake.prototype.checkOtherSnakeCollision = function(pushedAmount) {
    snakes.forEach((snake,i) => {
        var sameSnake = pushedAmount == snake.pushedAmount;
        if (sameSnake != true) {
            snake.segments.forEach((segment,i) => {
                var distance = getDistance(this.x,this.y,snake.x,snake.y)
                if (distance < this.radius + snake.radius) {
                    return true;
                }
              }); 
        }
      }); 
    return false;
}
Snake.prototype.draw = function() {
    this.segments.forEach((segment,i) => {
        segment.draw();
      }); 
}
Snake.prototype.update = function() {

    var head = this.segments[0];

    var death = false;
    var wallCollision = this.checkWallCollision(head);
    var snakeCollision = this.checkOtherSnakeCollision(this.pushedAmount)
    var death = wallCollision || snakeCollision;
    if (death) {
        gameover();
    }
    apples.forEach((apple,i) => {
        var distance = getDistance(head.x,head.y,apple.x,apple.y);
        if (distance <= head.radius + apple.radius) {
            apples.splice(i,1);
            this.maxSize += Math.round(apple.radius/4);
            this.score += Math.round(apple.radius);
        }    
      }); 
    if (mouse.mousedown && this.score > 10) {
        this.powerupBonus = 1.6;
        this.score -= 1;
    } else {
        this.powerupBonus = 1;
    }

    if (this.isAI) {


        var nearestApple = null;
        var nearestDistance = 9999999999999
        apples.forEach((apple,i) => {
            distance = getDistance(head.x,head.y,apple.x,apple.y)
            if (distance < nearestDistance) {
                nearestApple = apple;
                nearestDistance = distance;
            }
            
          }); 
        if (nearestApple) {
            var xDiff = nearestApple.x - head.x;
            var yDiff = nearestApple.y - head.y;
            var angle = Math.atan2(yDiff,xDiff);
            var xVel = Math.cos(angle) * this.snakeSpeedMultiplier * this.powerupBonus;
            var yVel = Math.sin(angle) * this.snakeSpeedMultiplier * this.powerupBonus;
            var newX = head.x+xVel;
            var newY = head.y+yVel;
            var radius = snakeStarterRadius * MULTIPLIERX + ((this.size * 0.05) * MULTIPLIER);
            var newSegment = new segment(newX,newY,radius,head.color,head.fillCircle);
            this.segments.unshift(newSegment);
        }
    } else {


        var xDiff = ((mouse.x) - width/2);
        var yDiff = ((mouse.y) - height/2);
        var angle = Math.atan2(yDiff,xDiff);
        var xVel = Math.cos(angle) * this.snakeSpeedMultiplier * this.powerupBonus;
        var yVel = Math.sin(angle) * this.snakeSpeedMultiplier * this.powerupBonus;
        var newX = head.x+xVel;
        var newY = head.y+yVel;
        var radius = snakeStarterRadius * MULTIPLIERX + ((this.size * 0.05) * MULTIPLIER);
        var newSegment = new segment(newX,newY,radius,head.color,head.fillCircle);
        this.segments.unshift(newSegment);
    
        SCROLLX = newSegment.x - (width/2) / MULTIPLIERX;
        SCROLLY = newSegment.y - (height/2) / MULTIPLIERY;
    
    
        document.querySelector("#size").innerHTML = "Score: " + Math.round(this.score);
        if (this.size >= this.maxSize) {
            this.segments.pop();
        }
    }

    this.size = this.segments.length;
}

var Apple = function(x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
}
Apple.prototype.draw = function() {
    circle(this.x,this.y,this.radius,this.color,true,false);
}

function summonApple() {
    var radius = (Math.random() * appleMaxRadius-5) + 10;
    var appleColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    var x = (Math.random() * (width - (radius * 2))) + radius;
    var y = (Math.random() * (height - (radius * 2))) + radius;
    var apple = new Apple(x,y,radius,appleColor);
    apples.push(apple);
}

function gameLoop() {
    if (gameOver === false) {
        requestAnimationFrame(gameLoop);
    }
    ctx.clearRect(0,0,width,height);
    snakes.forEach((snake,i) => {
        snake.draw();
        snake.update();
      }); 
    apples.forEach((apple,i) => {
        apple.draw();
      }); 
    drawBorder();

    gameTick++;

    if (maxApples > apples.length) {
        summonApple();
    }
}

window.onload = function() {
    for (var i = 0; i < 2; i++) {
        var aiSnake = new Snake(this.width/2,this.height/2,snakeStarterRadius,"red","blue",true);
        snakes.push(aiSnake);
    }
    setup();
};

addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

addEventListener('mousedown', (e) => {
    mouse.mousedown = true;
});
addEventListener('mouseup', (e) => {
    mouse.mousedown = false;
});

document.querySelector(".restartButton").onclick = function() {
    document.querySelector(".deadDiv").style.display = "none";
    setup();
}