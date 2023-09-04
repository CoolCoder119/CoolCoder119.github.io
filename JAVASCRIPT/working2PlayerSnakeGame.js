    var canvas = document.getElementById("canvas");
    
    var randomColors = ["blue","red","lightblue","pink","magenta","orange","green","purple","yellow","lightgreen"];
    var blockSize = 25;
    canvas.width = Math.floor((window.innerWidth)/blockSize)*blockSize;
    canvas.height = Math.floor((window.innerHeight)/blockSize)*blockSize;
    var width = canvas.width;
    var height = canvas.height;
    var gameSpeed = 40;

    var widthInBlocks = width / blockSize;
    var heightInBlocks = height / blockSize;

    // repeat times is how many applese there are
    var dividedNumber = 8;
    var repeatTimes = (widthInBlocks*heightInBlocks)/dividedNumber;

    var autoStart;


    var ctx = canvas.getContext("2d");  

    var intervalId;

    var snake;
    var snakeb;

    var apple;
    var apples = [];
    var applePointsAdded = 3;
    var touching;
    var currentlyTouching;
    var selfCollisions;

    var STARTERSIZE = 5;
    var SIZE = 0;
    var SIZEb = 0;

    var sizeToGetTo = STARTERSIZE;
    var sizeTOGetTob = STARTERSIZE;
    var maxSize = 200;
    
/*    snakes starter positions      */
    var sp = [2,2,3,2,4,2, widthInBlocks-4, 2,widthInBlocks-5, 2,widthInBlocks-3, 2];
    
    var waitTime = 800;

    var gameover = false;
    var gameOverCondition;
    var tie;

    var offset;

    var drawBorder = function() {
        ctx.fillStyle = "Gray";
        ctx.fillRect(0,0,width,blockSize);
        ctx.fillRect(0, height - blockSize, width, blockSize);
        ctx.fillRect(0,0,blockSize,height);
        ctx.fillRect(width - blockSize, 0, blockSize, height);
    };

    var drawScore = function() {
        ctx.font = (blockSize*5) + "px New Roman";
        ctx.fillStyle = "White";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Size: " + snake.segments.length, blockSize, blockSize);
        offset = (toString(SIZEb).length + (blockSize * -5));
        ctx.textAlign = "right";
        ctx.fillText("Size: " + snakeb.segments.length, width-blockSize, blockSize);
    };

    var gameOver = function() {
        clearInterval(intervalId);
        ctx.font = "300px New Roman";
        ctx.fillStyle = "DarkRed";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Game Over", width/2, height / 2);
        /*  makes gray background  */
        ctx.fillStyle = "gray";
        ctx.fillRect(width*0.2, height*0.7, width*0.6, height / 5);
        ctx.fillStyle = "Black";
        ctx.font = "45px New Roman";
        ctx.fillText(gameOverCondition, width/2, height*0.8);
        if (autoStart) {
            setTimeout(() => {
                location.reload()
            }, waitTime); 
        }
    };

    var circle = function (x, y, radius, fillCircle) {
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI * 2, false);
        if (fillCircle) {
            ctx.fill();
        } else {
            ctx.stroke();
        }
    };

    var Block = function(col, row) {
        this.col = col;
        this.row = row;
    };

    Block.prototype.drawSquare = function(color) {
        var x = this.col * blockSize;
        var y = this.row * blockSize;
        ctx.fillStyle = color
        ctx.fillRect(x,y,blockSize,blockSize);
    };

    Block.prototype.drawCircle = function(color) {
        var centerX = this.col * blockSize + blockSize/2;
        var centerY = this.row * blockSize + blockSize/2;
        ctx.fillStyle = color;
        circle(centerX,centerY,blockSize/2, true);
    };

    Block.prototype.equal = function (otherBlock) {
        return this.col === otherBlock.col && this.row === otherBlock.row;
    };

    var Snake = function(COLOR,DARKCOLOR, Number,Direction, point1x,point1y,point2x,point2y,point3x,point3y) {
        this.segments = [
            new Block(point1x,point1y)
        ]
        SIZE = this.segments.length
        this.number = Number;
        this.direction = Direction;
        this.nextDirection = Direction;
        this.color = COLOR
        this.darkcolor = DARKCOLOR
    };

    Snake.prototype.draw = function() {
        for (var i = 0;i < this.segments.length; i++) {
            this.segments[i].drawSquare(this.color);
        }
    };

    Snake.prototype.move = function() {
        var head = this.segments[0];
        var newHead;

        this.direction = this.nextDirection;

        if (this.direction === "right") {
            newHead = new Block(head.col + 1, head.row);
        } else if (this.direction === "down") {
            newHead = new Block(head.col, head.row+1); 
        } else if (this.direction === "left") {
            newHead = new Block(head.col - 1, head.row); 
        } else if (this.direction === "up") {
            newHead = new Block(head.col, head.row - 1);
        }

        if (this.checkCollision(newHead)) {
            gameover = true;
            return;
        }

        this.segments.unshift(newHead);
        
        currentlyTouching = false;
        touching = false;

        var  currentSnake;
        var correctSize;
        var correctSizeToGetTo;
        if (this.number === 1) {
            currentSnake = snake;
            correctSize = SIZE;
            correctSizeToGetTo = sizeToGetTo;
        } else{
            currentSnake = snakeb;
            correctSize = SIZEb;
            correctSizeToGetTo = sizeTOGetTob;
        }
        for(i=0;i<apples.length; i++) {
            currentlyTouching = newHead.equal(apples[i].position)
            if (currentlyTouching) {
                apples[i].move();
                apples[i].color = randomColors[Math.round(Math.random()*randomColors.length)]
                touching = true;
            }
        }
        if (this.number === 1) {
            if (touching || SIZE<sizeToGetTo) {
                SIZE = this.segments.length
                if (newHead.equal(apple.position)) {
                    apple.move();
                   sizeToGetTo += applePointsAdded;
                }
            } else {
                this.segments.pop();
            }
        } else {
            if (touching || SIZEb<sizeTOGetTob) {
                SIZEb = this.segments.length
                if (newHead.equal(apple.position)) {
                    apple.move();
                    sizeTOGetTob++;
                }
            } else {
                this.segments.pop();
            }
        }
    };

    Snake.prototype.checkCollision = function(head) {
        var leftCollision = (head.col === 0);
        var topCollision = (head.row === 0);
        var rightCollision = (head.col === widthInBlocks - 1);
        var bottomCollision = (head.row === heightInBlocks - 1);

        var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

        var selfCollision = false;
        if (selfCollisions) {
            for (var i = 0; i< this.segments.length; i++) {
                if (head.equal(this.segments[i])) {
                    selfCollision = true;
                }
            }
        }


        var otherSnakeCollision = false;
        var otherSnake;
        tie = false;
        if (this.number === 1) {
            otherSnake = snakeb;
        } else {
            otherSnake = snake;
        }
        if (otherSnake === snakeb) {
            if (head.equal(snakeb.segments[0])) {
                otherSnakeCollision = true
                tie = true;
            }
            for(i = 0;i<snakeb.segments.length;i++) {
                if (head.equal(snakeb.segments[i])) {
                    otherSnakeCollision = true
                }
            }
        } else {
            if (head.equal(snake.segments[0])) {
                otherSnakeCollision = true
                tie = true;
            }
            for(i = 0;i<snake.segments.length;i++) {
                if (head.equal(snake.segments[i])) {
                    otherSnakeCollision = true
                }
            }
        }
        if (tie) {
            gameOverCondition = "It's a tie!";
        } else {
            if (this.number === 1) {
                if (wallCollision) {
                    gameOverCondition = "Blue snake ran into a wall!";
                }
                if (selfCollision) {
                    gameOverCondition = "Blue snake ran into it's tail!";
                }
                if (otherSnakeCollision) {
                    gameOverCondition = "Blue snake ran red snake's tail!";
                }
            } else {
                if (wallCollision) {
                    gameOverCondition = "Red snake ran into a wall!";
                }
                if (selfCollision) {
                    gameOverCondition = "Red snake ran into it's tail!";
                }
                if (otherSnakeCollision) {
                    gameOverCondition = "Red snake ran blue snake's tail!";
                }
            }
        }

        return wallCollision || selfCollision || otherSnakeCollision;
    };

    Snake.prototype.setDirection = function(newDirection) {
        if (selfCollisions==true) {
            if (this.direction === "up" && newDirection === "down") {
                return;
            } else if (this.direction === "right" && newDirection === "left") {
                return;
            } else if (this.direction === "down" && newDirection === "up") {
                return;
            } else if (this.direction === "left" && newDirection === "right") {
                return;
            }
        }


        this.nextDirection = newDirection;
    };

    var Apple = function () {
        this.position = new Block(10,10);
        this.color = randomColors[Math.round(Math.random()*randomColors.length)]
    };

    Apple.prototype.draw = function() {
        this.position.drawCircle(this.color);
    };

    Apple.prototype.move = function() {
        var randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
        var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
        this.position = new Block(randomCol, randomRow);
    };

    var populateApples = function() {
        for (var i=0;i<repeatTimes;i++) {
            apple = new Apple();
            apple.move()
            apples.push(apple);
        }
    }

    var setDirectionForSnaks = function(newDirection) {
        if (newDirection === "w") {
            snake.setDirection("up")
        } else if (newDirection === "a") {
            snake.setDirection("left")
        } else if (newDirection === "s") {
            snake.setDirection("down")
        } else if (newDirection === "d") {
            snake.setDirection("right")
        } else {
            snakeb.setDirection(newDirection);
        }
    }

    var gameLoop = function() {
        snake = new Snake("lightblue","darkblue", 1,"right", sp[0],sp[1],sp[2],sp[3],sp[4],sp[5]);
        snakeb = new Snake("pink","darkred", 2,"left", sp[6],sp[7],sp[8],sp[9],sp[10],sp[11]);
        populateApples();
        var intervalId = setInterval(function() {
            if (gameover!== true) {
                ctx.clearRect(0,0,width,height);
                snake.move();
                snakeb.move();
                snake.draw();
                snakeb.draw();
                for(i=0;i<apples.length; i++) {
                    apples[i].draw();
                }
                drawBorder();
                drawScore();
                if (gameover) {
                    gameOver();
                }
            }
        }, gameSpeed);
    };

    var directions = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        87: "w",
        65: "a",
        83: "s",
        68: "d"
    };

    $("body").keydown(function(event) {
        var newDirection = directions[event.keyCode];
        if (newDirection !== undefined) {
            setDirectionForSnaks(newDirection);
        } 
    });

    window.onload = function() {
        var promptAnswer;

        promptAnswer = "yes";
        if (promptAnswer === "yes") {
            selfCollisions = true;
            autoStart = true;
            blockSize = 12;
            canvas.width = Math.floor((window.innerWidth)/blockSize)*blockSize;
            canvas.height = Math.floor((window.innerHeight)/blockSize)*blockSize;
            width = canvas.width;
            height = canvas.height;
                
            widthInBlocks = width / blockSize;
            heightInBlocks = height / blockSize;

            repeatTimes = Math.round((widthInBlocks*heightInBlocks)/dividedNumber);

            sp = [2,2,3,2,4,2, widthInBlocks-4, 2,widthInBlocks-5, 2,widthInBlocks-3, 2];

            snake = new Snake("lightblue","darkblue", 1,"right", sp[0],sp[1],sp[2],sp[3],sp[4],sp[5]);
            snakeb = new Snake("pink","darkred", 2,"left", sp[6],sp[7],sp[8],sp[9],sp[10],sp[11]);
            sizeToGetTo = STARTERSIZE;
            sizeTOGetTob = STARTERSIZE;

            apples = [];
            populateApples();
        }   else {
            promptAnswer = prompt("Do you want to use the basic settings for blockSize(answer yes or no)");
            if (promptAnswer === "yes") {
                blockSize = 12;
                    // repeat times is how many applese there are
                canvas.width = Math.floor((window.innerWidth)/blockSize)*blockSize;
                canvas.height = Math.floor((window.innerHeight)/blockSize)*blockSize;
                width = canvas.width;
                height = canvas.height;
                    
                widthInBlocks = width / blockSize;
                heightInBlocks = height / blockSize;
    
                repeatTimes = Math.round((widthInBlocks*heightInBlocks)/dividedNumber);
    
                sp = [2,2,3,2,4,2, widthInBlocks-4, 2,widthInBlocks-5, 2,widthInBlocks-3, 2];
    
                apples = [];
                populateApples();
            } else {
                promptAnswer = prompt("Enter a blockSize(try anything from 10 to 30)");
                if (Number(promptAnswer) !== 0) {
                    if (Number(promptAnswer) < 80 && Number(promptAnswer) > 1) {
                        blockSize = Number(promptAnswer);
                        // repeat times is how many applese there are
                        canvas.width = Math.floor((window.innerWidth)/blockSize)*blockSize;
                        canvas.height = Math.floor((window.innerHeight)/blockSize)*blockSize;
                        width = canvas.width;
                        height = canvas.height;
                    
                        widthInBlocks = width / blockSize;
                        heightInBlocks = height / blockSize;
    
                        repeatTimes = Math.round((widthInBlocks*heightInBlocks)/dividedNumber);
    
                        sp = [2,2,3,2,4,2, widthInBlocks-4, 2,widthInBlocks-5, 2,widthInBlocks-3, 2];
    
                        apples = [];
                        populateApples();
                    }
                }             
            }
            promptAnswer = prompt("Do you want to use the basic settings for applesPerBlock(answer yes or no)");
            if (promptAnswer === "yes") {
                dividedNumber = 15;
                repeatTimes = Math.round((widthInBlocks*heightInBlocks)/dividedNumber);
                populateApples();
            } else {
                promptAnswer = prompt("Enter a applesPerBlockNumber(try anything from 5 to 20)");
                if (Number(promptAnswer) !== 0) {
                    if (Number(promptAnswer) < 40 && Number(promptAnswer) > 1) {
                        dividedNumber = Number(promptAnswer);
                        repeatTimes = Math.round((widthInBlocks*heightInBlocks)/dividedNumber);
                        populateApples();
                    }
                }             
            }
            promptAnswer = prompt("Do you want to use auto restart(answer yes or no)");
            if (promptAnswer === "yes") {
                autoStart = true;
            } else {
                autoStart = false;
            }
            promptAnswer = prompt("Do you want Self Collisions(answer yes or no)");
            if (promptAnswer === "yes") {
                selfCollisions = true;
            } else {
                selfCollisions = false;
            }
        }  
    }

    gameLoop();