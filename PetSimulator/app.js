const express = require("express");
const http = require('http');
const { Server }  = require('socket.io');
const app = express();

const port = 3000;  

const server = http.createServer(app);
const io = new Server(server);
server.listen(3000);
console.log("this is here");

const width = 1536;
const height = 739;

var map = [];
var maphealth = [];
var rows = 20*2;
var columns = 10*2;
var blockWidth = width/rows;
var blockHeight = height/columns;
var blockHealth = 2;
var blockColor = "rgb(110, 84, 56)";
var indestructableblockColor = "black";

function getChoiceForBlock(random) {
    if (random < 0.9) {
        return 0;
    }
    return 1;
}

var Block = function(x,y,width,height,color,row,column,health,canBeAttacked) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.row = row;
    this.column = column;
    this.health = health;
    this.maxHealth = this.health;
    this.color = color;
    this.canBeAttacked = canBeAttacked;
}

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


var playerRadius = 20;
var playerSpeed = 5;
var playerHealth = 50;
const backendPlayers = {};

function getRandom(top) {
    return Math.round(Math.random() * top);
}

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
})



io.on('connection', (socket) => {
    console.log('a user connected');
    backendPlayers[socket.id] = {
        x: getRandom(width),
        y: getRandom(height),
        radius: playerRadius,
        color: "rgb(" + getRandom(360) + "," + getRandom(360)+ "," + getRandom(360) +")",
        health: playerHealth,
        speed: playerSpeed,
        Mouse: {
            x: width,
            y: height,
            keW: false,
            keyA: false,
            keyS: false,
            keyD: false,
            down: false
        }
    }
    io.emit('mapDone', (map,maphealth));
    io.emit('updatePlayers', backendPlayers)


    socket.on('keydown', (keyCode) => {
            if (keyCode === "w") {
                backendPlayers[socket.id].Mouse.keyW = true;
            }
            if (keyCode === "s") {
                backendPlayers[socket.id].Mouse.keyS = true;
            }
            if (keyCode === "a") {
                backendPlayers[socket.id].Mouse.keyA = true;
            }
            if (keyCode === "d") {
                backendPlayers[socket.id].Mouse.keyD = true;
            }
    })
    socket.on('keyup', (keyCode) => {
        if (keyCode === "w") {
            backendPlayers[socket.id].Mouse.keyW = false;
        }
        if (keyCode === "s") {
            backendPlayers[socket.id].Mouse.keyS = false;
        }
        if (keyCode === "a") {
            backendPlayers[socket.id].Mouse.keyA = false;
        }
        if (keyCode === "d") {
            backendPlayers[socket.id].Mouse.keyD = false;
        }
    })

    socket.on('disconnect', (reason) => {
        delete backendPlayers[socket.id];
        io.emit('updatePlayers', backendPlayers);
    })


})


setInterval(() => {
    io.emit('update');
}, 15);

/*app.listen(port, () => {
     console.log("Example port listening on port 3000");
 });*/