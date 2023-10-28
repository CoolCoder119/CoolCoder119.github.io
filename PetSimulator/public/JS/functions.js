for (var c = 0; c < columns; c++) {
    var array = [];
    var healthArray = [];
    for (var r = 0; r < rows; r++) {
        var random = Math.random();
        var choice = getChoiceForBlock(random);
        var canBeAttacked = true;
        if (c === 0|| r === 0 || r === rows-1 || c === columns-1) {
            choice = 2;
            canBeAttacked = false;
        }
        array.push(choice);
        if (choice === 1) {
            var x = r*blockWidth;
            var y = c*blockHealth;
            if (!canBeAttacked) {
                healthArray.push(new Block(x,y,blockWidth,blockHeight,indestructableblockColor,r,c,blockHealth,canBeAttacked));
            } else {
                healthArray.push(new Block(x,y,blockWidth,blockHeight,indestructableblockColor,r,c,blockHealth,canBeAttacked));
            }
        } else {
            healthArray.push(0);
        }
    }
    map.push(array);
    maphealth.push(healthArray);
}
window.onload = function() {
    document.getElementById("text").innerHTML = map;
    document.getElementById("otherText").innerHTML = maphealth;
}



function drawBar(x,y,width,height,health,maxHealth,yOffset) {
    var xPosition = (x-width/2);
    var yPosition = (y-yOffset);
    ctx.fillStyle = "red";
    ctx.fillRect(xPosition,yPosition,width,height);
    ctx.fillStyle = "limegreen";
    ctx.fillRect(xPosition,yPosition,width*(health/maxHealth),height);
};

function getChoiceForBlock(random) {
    if (random < 0.9) {
        return 0;
    }
    return 1;
}
function getBlockAt(column,row) {
    return map[column][row];
}
function circle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI * 2, false);
    ctx.fill()
};

function drawMap() {
    for (var c = 0; c < columns; c++) {
        for (var r = 0; r < rows; r++) {
            var block = getBlockAt(c,r);
            var x = r*blockWidth;
            var y = c*blockHeight;
            if (block === 1) {
                ctx.drawImage(grassBlock,x-scrollX,y-scrollY,blockWidth,blockHeight);
            } else if (block === 2) {
                ctx.drawImage(indestructableBlock,x-scrollX,y-scrollY,blockWidth,blockHeight);
            }

        }
    } 
}

function createCoins(amount) {
    var leftToDo = amount;
    for (var i = 0; i < leftToDo; i++) {
        var radius = Math.random() * maxcoinRadius;
        if (radius < mincoinRadius) {
            radius = mincoinRadius;
        }
        var x = (Math.random() * (width - (radius * 2))) + radius;
        var y = (Math.random() * (height - (radius * 2))) + radius;

        var randColor = randomColors[Math.floor(Math.random() * randomColors.length)];
        var coin = new Coin(x,y,radius,randColor);


        var row = Math.floor(x/blockWidth);
        var column = Math.floor(y/blockHeight);
        if (getBlockAt(column,row) === 1) {
            i--;
            
        } else {
            coins.push(coin);
        }
    }
}


function createPlayer(id) {
    var x = Math.round(Math.random() * width);
    var y = Math.round(Math.random() * height);
    var newPlayer = new Player(x,y,playerRadius,playerColor,playerSpeed,id);   
    if (newPlayer.checkTouchingBlock()) {
        createPlayer(id);
    } else {
        if (id === mainPlayerId) {
            player = newPlayer;
        }
        return player
    }
}


