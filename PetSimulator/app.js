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

var map = [
      [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2
      ],
      [
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2
      ],
      [
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        0, 1, 0, 0, 0, 1, 0, 0, 0, 2
      ],
      [
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 1, 1,
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 1, 0, 0, 0, 0, 2
      ],
      [
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 2
      ],
      [
        2, 1, 0, 0, 1, 0, 0, 0, 1, 0,
        0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2
      ],
      [
        2, 1, 0, 0, 0, 0, 0, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 2
      ],
      [
        2, 0, 1, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2
      ],
      [
        2, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 2
      ],
      [
        2, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2
      ],
      [
        2, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2
      ],
      [
        2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 1, 2
      ],
      [
        2, 0, 0, 0, 1, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 2
      ],
      [
        2, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2
      ],
      [
        2, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 0, 2
      ],
      [
        2, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 1, 0, 0, 0, 0, 0, 0, 2
      ],
      [
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 1, 0, 0,
        1, 0, 1, 0, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2
      ],
      [
        2, 0, 0, 0, 0, 1, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 2
      ],
      [
        2, 0, 1, 0, 0, 0, 1, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0, 0, 2
      ],
      [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2
      ]
]
var maphealth = [];
var rows = map[0].length;
var columns = map.length;
var blockWidth = width/rows;
var blockHeight = height/columns;
var blockHealth = 1;
var indestructableblockColor = "black";
var maphealth = [];
console.log(rows*columns);
function getChoiceForBlock(random) {
    if (random < 0.9) {
        return 0;
    }
    return 1;
}

var playerRadius = 20;
var playerSpeed = 5;
var playerHealth = 50;
const backendPlayers = {};

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
    var healthArray = [];
    for (var r = 0; r < rows; r++) {
        var choice = map[c][r];
        var x = r*blockWidth;
        var y = c*blockHealth;
        if (choice === 1) {   
            healthArray.push(new Block(x,y,blockWidth,blockHeight,indestructableblockColor,r,c,blockHealth,true));
        } else if (choice === 2) {
          healthArray.push(new Block(x,y,blockWidth,blockHeight,indestructableblockColor,r,c,blockHealth,false));
        }else {
          healthArray.push(0);
        }
    }
    maphealth.push(healthArray);
}

function getRandom(top) {
    return Math.round(Math.random() * top);
}

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
})



io.on('connection', (socket) => {
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
    io.emit('sendMap', {map: map, maphealth: maphealth});
    io.emit('updatePlayers', backendPlayers)
    socket.on('damage', (info) => {
      backendPlayers[info.id].health -= info.damage;
    })

    socket.on('updateMapBackend', (info) => {
      map[info.column][info.row] = 0;
      maphealth[info.column][info.row] = 0;
      io.emit('updateMap', {row: info.row,column: info.column});
    })
    socket.on('mousemove', (info) => {
      backendPlayers[socket.id].Mouse.x = info.x;
      backendPlayers[socket.id].Mouse.y = info.y;
    })
    socket.on('mousedown', (info) => {
      backendPlayers[socket.id].Mouse.down = true;
    })
    socket.on('mouseup', (info) => {
      backendPlayers[socket.id].Mouse.down = false;
    })
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
function checkTouching(player) {
      var touching = false;
    for (var c = 0; c < columns; c++) {
        for (var r = 0; r < rows; r++) {
            var block = map[c][r];
            if (block === 1 || block === 2) {
                var x = r*blockWidth;
                var y = c*blockHeight;
                if (
                        player.x + player.radius > x &&
                        player.y + player.radius > y &&
                        player.x - player.radius <= x+blockWidth &&
                        player.y - player.radius <= y+blockHeight
                ) {
                    touching = true;
                }
            }
        }
    } 
    return touching;
}
function updateBackendPlayers() {
    for (id in backendPlayers) {
      var player = backendPlayers[id];
      var xVel;
      var yVel;
      if (player.Mouse.keyW) {
        yVel = 0 - player.speed;
      } else if (player.Mouse.keyS) {
        yVel = player.speed;
      } else {
        yVel = 0;
      }
      if (player.Mouse.keyA) {
          xVel = 0 - player.speed;
      } else if (player.Mouse.keyD) {
          xVel = player.speed;
      } else {
          xVel = 0;
      }
      this.x += xVel;
      if (checkTouching(player)) {
        this.x -= xVel;
      }
      this.y += this.yVel;
      if (checkTouching(player)) {
        this.y -= this.yVel;
      }

    }
}


setInterval(() => {
    updateBackendPlayers();
    io.emit('updatePlayers', backendPlayers);
    io.emit('update');
}, 15);

/*app.listen(port, () => {
     console.log("Example port listening on port 3000");
 });*/