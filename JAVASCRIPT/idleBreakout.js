var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight*0.915;
var width = canvas.width;
var height = canvas.height;

var goldSign;
var gold = 100;
var level = 1;
var rows = 5;
var columns = 10;
//
var touching;
var changeX;
var changeY;
var touchingLeftRight;
var touchingUpDown;
//
var ctx = canvas.getContext("2d");
//yellow damage
var yellowDamage = 1;
//square size
var squareWidth = width/8;
var squareHeight = height/10;

var speedMultiplier = width/300;



var circle = function(x,y,radius,stroke) {
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI * 2, false);
    ctx.fill();
    if (stroke) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.stroke();  
    }
};
//create balls
var balls = [];

var Ball = function (x,y,xVelocity, yVelocity, radius, typeOfBall) {
    this.x = x;
    this.y = y;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.width = radius/2;
    this.height = radius/2;
    this.typeOfBall = typeOfBall;
};

Ball.prototype.update = function() {
    touchingLeftRight = false;
    touchingUpDown = false;
    if (this.x+this.width >= width || this.x-this.height <= 0) {
        this.xVelocity = this.xVelocity * -1;
    }
    if (this.y+this.width >= height || this.y-this.height <= 0) {
        this.yVelocity = this.yVelocity * -1;
    }
    

    // check touching other stuff
    for (var i = 0; i < squares.length; i++) {
        var square = squares[i];
        touching = false;
        if (this.x + this.width > square.x && this.x < square.x+square.width && this.y + this.height > square.y && this.y < square.y+square.height) {
            var nextX = this.x + this.xVelocity*2;
            var nextY = this.y + this.yVelocity*2;
            touching = true;
            console.log(this.typeOfBall);
            if (this.typeOfBall === "yellow") {
                if (Math.random() <= 0.5) {
                    touchingLeftRight = true;
                    touching = true;
                } else {
                    touchingUpDown = true;
                    touching = true;
                }
            }
            /*if(nextX + this.width > square.x && nextX < square.x+square.width && this.y + this.height > square.y && this.y < square.y + square.height) {
                touchingLeftRight = true;
                touching = true;
                console.log("x");
                console.log(nextX + this.width > square.x && nextX < square.x+square.width);
            }
            //if(this.x + this.width > square.x && this.x < square.x+square.width && nextY + this.height > square.y && nextY < square.y + square.height) {
                touchingUpDown = true;
                touching = true;
                console.log("y");
                console.log( nextY + this.height > square.y && nextY < square.y + square.height);
            }*/
            if (touching) {
                square.health -=yellowDamage;
                gold++;
                goldSign.innerHTML = "Gold: " + gold;
                if (square.health === 0) {
                    console.log(square.health);
                    squares.splice(i,1);
                }
            }
        }
    }



    this.x += this.xVelocity*speedMultiplier;
    this.y += this.yVelocity*speedMultiplier;
    ctx.fillStyle = "yellow";
    circle(this.x, this.y, this.width,true);
    if( touchingLeftRight) {
        this.xVelocity *= -1;
    }
    if (touchingUpDown) {
        this.yVelocity *= -1;
    }
}
var createBalls = function(amount, typeOfBall) {
    for (var i=0; i<amount; i++) {
        var x = width/2;
        var y = height/2;
        var radius = width/30;
        var direction = (Math.random() - 0.5) * 360;
        var xVelocity = Math.sin(direction)*5;
        var yVelocity = Math.cos(direction)*5;
        console.log("Creating balls " + typeOfBall);
        balls.push(new Ball(x,y,xVelocity,yVelocity,radius, typeOfBall));
    }
}


var squares = [];
var Square = function(health,x,y,width,height,color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = health;
    this.color = color;
}
Square.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.font = "30px Arial";
    ctx.fontWeight = "bolder";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(this.health, this.x+this.width/2, this.y+this.height/3);

}
function createLevel1stWay() {
    for (var x = 0; x<width; x++) {
        for (var y = 0; y < height-height/10; y++) {
            squares.push(new Square(level,x,y,squareWidth, squareHeight, "blue"));
            y+= squareHeight+5;
        }
        x+= squareWidth*2+5;
    }
}
function createLevel2ndWay() {
    var startingX = 0+squareWidth*2;
    var startingY = 0+squareHeight/2;
    x = startingX;
    y = startingX;
    for (var repeatX = 0; repeatX<6; repeatX++) {
        for (var repeatY = 0; repeatY<6; repeatY++) {
            squares.push(new Square(level,x,y,squareWidth, squareHeight, "blue"));
            console.log("created new one")
            x+=squareWidth;
        }
        y+=squareHeight;
        x = 0;
    }
};
function createLevel() {
    var x = 0;
    var y = 0;
    if (level < 5) {
        createLevel1stWay();
    } else if(level < 10) {
        createLevel1ndWay();
    }

};


function gameLoop() {
    ctx.fillStyle = "rgba(365,365,365,0.2)"
    ctx.fillRect(0,0,width,height);
    for (var i=0; i < balls.length; i++) {
        balls[i].update();
    }
    for (var i=0; i < squares.length; i++) {
        squares[i].draw();
    }
    if (squares.length === 0) {
        level++;
        document.getElementById("level").innerHTML = "Level: " + level;
        createLevel();
    }
    requestAnimationFrame(gameLoop);
};

window.onload = function() {
    goldSign = document.getElementById("gold");
    document.getElementById("level").innerHTML = "Level: 1";
    createLevel();
    gameLoop();

    document.getElementById('button').onclick = function() {
        if (gold - 20 >= 0) {
            gold-=20;
            createBalls(1, "yellow");
        }

    }
}