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


var Mouse = function() {
    this.x = 100;
    this.y = 100;
}

var mouse = new Mouse();

var MULTIPLIERX = 3;
var MULTIPLIERY = 3;
ctx.scale(MULTIPLIERX,MULTIPLIERY);

function setup() {
    snake = new Snake(this.width/2,this.height/2,snakeStarterRadius,snakeColor);
    apples = [];
    gameTick = 0;
    gameOver = false;
    for (i = 0; i < maxApples; i++) {
        summonApple();
    }
    SCROLLX = 0;
    SCROLLY = 0;
    
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
    circle(this.x,this.y,this.radius,this.color,this.fillCircle,true,this.radius/4,this.strokeColor);
};
 
var Snake = function(startX,startY,radius,snakeColor) {
    this.circleRadius = radius;
    this.snakeColor = snakeColor;
    this.segments = [
        new segment(startX,startY,this.circleRadius,this.snakeColor,true)
    ];
    this.size = this.segments.length;
    this.maxSize = snakeMaxSize;
    this.snakeSpeedMultiplier = 0.4 * MULTIPLIER;
}
Snake.prototype.checkWallCollision = function(head) {
    return head.x - head.radius <= blockSize ||
           head.x + head.radius >= width-blockSize ||
           head.y - head.radius <= blockSize ||
           head.y + head.radius >= height-blockSize;
}
Snake.prototype.draw = function() {
    this.segments.forEach((segment,i) => {
        segment.draw();
      }); 
}
Snake.prototype.update = function() {

    var head = this.segments[0];

    var death = this.checkWallCollision(head);
    if (death) {
        gameover();
    }
    apples.forEach((apple,i) => {
        var distance = getDistance(head.x,head.y,apple.x,apple.y);
        if (distance <= head.radius + apple.radius) {
            apples.splice(i,1);
            this.maxSize += Math.round(apple.radius/5);
        }    
      }); 
    var xDiff = ((mouse.x) - width/2) * 1000;
    var yDiff = ((mouse.y) - height/2) * 1000;
    var angle = Math.atan2(yDiff,xDiff);
    var xVel = Math.cos(angle) * head.radius * this.snakeSpeedMultiplier;
    var yVel = Math.sin(angle) * head.radius * this.snakeSpeedMultiplier;
    var newX = head.x+xVel;
    var newY = head.y+yVel;
    var radius = snakeStarterRadius * MULTIPLIERX + ((this.size * 0.01) * MULTIPLIER);
    var newSegment = new segment(newX,newY,radius,head.color,head.fillCircle);
    this.segments.unshift(newSegment);

    SCROLLX = newSegment.x - (width/2) / MULTIPLIERX;
    SCROLLY = newSegment.y - (height/2) / MULTIPLIERY;

    this.size = this.segments.length;
    document.querySelector("#size").innerHTML = "Size: " + this.size;
    if (this.size >= this.maxSize) {
        this.segments.pop();
    }
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
    snake.draw();
    snake.update();
    apples.forEach((apple,i) => {
        apple.draw();
      }); 
    drawBorder();

    gameTick++;

    if (maxApples > apples.length) {
        summonApple();
    }
}

window.onload = setup();

addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

document.querySelector(".restartButton").onclick = function() {
    document.querySelector(".deadDiv").style.display = "none";
    setup();
}