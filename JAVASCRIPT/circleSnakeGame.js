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
function circle(x,y,radius,color,fillCircle) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x-SCROLLX,y-SCROLLY,radius,Math.PI * 2,false);
    if (fillCircle) {
        ctx.fill(); 
    }
};

function drawBorder() {
    ctx.fillStyle = "red";
    ctx.fillRect(0-SCROLLX,0-SCROLLY,width,blockSize);
    ctx.fillRect(0-SCROLLX, (height - blockSize) - SCROLLY,width,blockSize);
    ctx.fillRect(0-SCROLLX,0-SCROLLY,blockSize,height);
    ctx.fillRect((width - blockSize) - SCROLLX, 0 - SCROLLY, blockSize, height);
}

var createColorPattern = function() {
    var colorPattern = [];
    for (var i = 0; i < 30; i++) {
        var color = randomColors[Math.round(Math.random() * (randomColors.length-1))]
        colorPattern.push(color);
    }
    return colorPattern;
}

var segment = function(x,y,radius,color,fillCircle) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.fillCircle = fillCircle;
}
segment.prototype.draw = function() {
    circle(this.x,this.y,this.radius,this.color,this.fillCircle);
};
 
var Snake = function(startX,startY,radius,snakeColor, isAI) {
    this.colorPattern = createColorPattern();
    this.markedForDeletion = false;
    this.isAI = isAI;
    this.circleRadius = radius;
    this.segments = [
        new segment(startX,startY,this.circleRadius,this.colorPattern[0],true)
    ];


    this.size = this.segments.length;
    this.maxSize = snakeMaxSize;
    if (isAI) {
        this.snakeSpeedMultiplier = 0.5 * MULTIPLIER;
    } else {
        this.snakeSpeedMultiplier = 2.5 * MULTIPLIER;
    }

    this.powerupBonus = 1;
    this.score = 1000;
    this.id = pushedAmount;
    pushedAmount++;
    this.i = 0;
    console.log(this.colorPattern);


}
Snake.prototype.checkWallCollision = function(head) {
    return head.x - head.radius <= blockSize ||
           head.x + head.radius >= width-blockSize ||
           head.y - head.radius <= blockSize ||
           head.y + head.radius >= height-blockSize;
}
Snake.prototype.checkOtherSnakeCollision = function(pushedAmount,head) {
    snakes.forEach((snake,i) => {
        if (this.id !== snake.id) {
            snake.segments.forEach((segment,i) => {
                var distance = getDistance(head.x,head.y,segment.x,segment.y);
                return distance < head.radius + segment.radius;
              }); 
        }
      }); 
    return false;
}
Snake.prototype.draw = function() {
    this.segments.forEach((segment,i) => {
        segment.draw(segment.color);
      }); 
}
Snake.prototype.update = function() {

    var head = this.segments[0];

    var death = false;
    var wallCollision = this.checkWallCollision(head);
    var snakeCollision = this.checkOtherSnakeCollision(this.pushedAmount,head);
    var death = wallCollision || snakeCollision;
    if (snakeCollision) {
        gameover();
    }
    if (wallCollision || snakeCollision) {
        if (this.isAI) {
            this.markedForDeletion = true;
        } else {
            gameover();
        }
    }
    apples.forEach((apple,i) => {
        var distance = getDistance(head.x,head.y,apple.x,apple.y);
        if (distance <= head.radius + apple.radius) {
            apples.splice(i,1);
            this.maxSize += Math.round(apple.radius);
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

        var xDiff = nearestApple.x - head.x;
        var yDiff = nearestApple.y - head.y;
        var angle = Math.atan2(yDiff,xDiff);
        var xVel = Math.cos(angle) * this.snakeSpeedMultiplier * this.powerupBonus;
        var yVel = Math.sin(angle) * this.snakeSpeedMultiplier * this.powerupBonus;
        var newX = head.x+xVel;
        var newY = head.y+yVel;
        var radius = (snakeStarterRadius * MULTIPLIERX * MULTIPLIER) + this.size;
        var color = this.colorPattern[i%this.colorPattern.length];
        var newSegment = new segment(newX,newY,radius,color,color);
        this.segments.unshift(newSegment);
        this.radius = this.score;
    } else {


        var xDiff = ((mouse.x) - width/2);
        var yDiff = ((mouse.y) - height/2);
        var angle = Math.atan2(yDiff,xDiff);
        var xVel = Math.cos(angle) * this.snakeSpeedMultiplier * this.powerupBonus;
        var yVel = Math.sin(angle) * this.snakeSpeedMultiplier * this.powerupBonus;
        var newX = head.x+xVel;
        var newY = head.y+yVel;
        var radius = (snakeStarterRadius * MULTIPLIERX * MULTIPLIER) + this.size;
        var color = this.colorPattern[i%this.colorPattern.length];
        var newSegment = new segment(newX,newY,radius,color,color);
        this.segments.unshift(newSegment);
    
        SCROLLX = newSegment.x - (width/2) / MULTIPLIERX;
        SCROLLY = newSegment.y - (height/2) / MULTIPLIERY;
    

    }
    document.querySelector("#size").innerHTML = "Score: " + Math.round(this.score);
    if (this.segments.length === this.maxSize) {
        this.segments.pop();
    }

    this.i++;
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

function summonSnake() {
    var x = Math.random() * width;
    var y = Math.random() * height;
    var aiSnake = new Snake(x,y,snakeStarterRadius,"red","blue",true);
    snakes.push(aiSnake);
}

function gameLoop() {
    if (gameOver === false) {
        requestAnimationFrame(gameLoop);
    }
    ctx.clearRect(0,0,width,height);
    snakes.forEach((snake,i) => {
        snake.draw();
        snake.update();
        if (snake.markedForDeletion) {
            snakes.splice(i,1);
        }
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
    for (var i = 0; i < 4; i++) {
        summonSnake();
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
    location.reload();
}