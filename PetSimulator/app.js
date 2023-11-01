const express = require("express");
const http = require('http');
const { Server }  = require('socket.io');
const app = express();

const port = 3000;  

const server = http.createServer(app);
const io = new Server(server);
server.listen(3000);
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

var count = 0;
var bulletRadius = 10;
var bulletSpeed = 15;
var bulletSummonTick = 10;
var tick = 0;
const backendProjectiles = {};

var block;
var blockTouched;
var column;
var row;



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
        },
        id: socket.id,
        Actualwidth: undefined,
        Actualheight: undefined,
        scrollX: undefined,
        scrollY: undefined
    }

    const player = backendPlayers[socket.id];
    io.emit('sendWidthHeight');
    io.emit('sendMap', {map: map, maphealth: maphealth});
    io.emit('updatePlayers', backendPlayers)
    socket.on('widthHeight', (info) => {
      player.Actualwidth = info.width;
      player.Actualheight = info.height;
    })
    socket.on('damage', (info) => {
      backendPlayers[info.id].health -= info.damage;
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
        for (const id in backendProjectiles) {
          const projectile = backendProjectiles[id];
          if (projectile.playerID === socket.id) {
            delete backendProjectiles[id];
          }
        }
        io.emit('updatePlayers', backendPlayers);
    })


})

function getDistance(x1,y1,x2,y2) {
  var xDistance = x2-x1;
  var yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance,2) + 
      Math.pow(yDistance,2));
}

function getBlockAt(column,row) {
  return map[column][row];
}
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
      player.x += xVel;
      if (checkTouching(player)) {
        player.x -= xVel;
      }
      player.y += player.yVel;
      if (checkTouching(player)) {
        player.y -= player.yVel;
      }
      if (tick % bulletSummonTick === 0 && player.Mouse.down) {

        var angle = Math.atan2(
          player.Mouse.y-(player.Actualheight/2),
          player.Mouse.x-(player.Actualwidth/2)
        );
  
        const xVel = Math.cos(angle) * bulletSpeed;
        const yVel = Math.sin(angle) * bulletSpeed;
  
        const velocity = {
            x: xVel,
            y: yVel
        }
        count++;
        backendProjectiles[count] = {
          x: player.x,
          y: player.y,
          color: player.color,
          radius: bulletRadius,
          velocity: velocity,
          playerID: player.id
        }
    };

    }
}

function checkTouchingBlock(bullet) {
  var touching = false;
  for (var c = 0; c < columns; c++) {
      for (var r = 0; r < rows; r++) {
          var block = getBlockAt(c,r);
          if (block === 1 || block === 2) {
              var x = r*blockWidth;
              var y = c*blockHeight;
              if (
                bullet.x + bullet.radius >= x &&
                bullet.y + bullet.radius >= y &&
                bullet.x - bullet.radius <= x+blockWidth &&
                bullet.y - bullet.radius <= y+blockHeight
              ) {
                  touching = true;
                  block = map[c][r];
                  blockTouched = maphealth[c][r];
                  column = c;
                  row = r;
              }
          }
      }
  } 
  return touching;
}

var updateBackendBullets = function() {
  for (id in backendProjectiles) {
      var bullet = backendProjectiles[id];
      bullet.x += bullet.velocity.x;
      bullet.y += bullet.velocity.y;
      bullet.x = backendPlayers[bullet.playerID].x;
      bullet.y = backendPlayers[bullet.playerID].y;
      console.//log('x: ' + bullet.x + ", Y: " + bullet.y)
    if (checkTouchingBlock(bullet)) {
        if (block === 1) {
            blockTouched.health -= 1;
            if (blockTouched.health < 1) {
                map[blockTouched.column][blockTouched.row] = 0;
                maphealth[blockTouched.column][blockTouched.row] = 0;
  
                var r = blockTouched.row;
                var c = blockTouched.column;

                var info ={
                  row: r,
                  column: c
                }
                io.emit('updateMap', {row: info.row,column: info.column});
              }
        }
    }
  
    for (const id in backendPlayers) {
        if (id !== bullet.playerID) {
            var otherPlayer =  backendPlayers[id];
            var distance = getDistance(bullet.x,bullet.y,otherPlayer.x,otherPlayer.y);
            if (distance < bullet.radius+otherPlayer.radius) {
                delete backendProjectiles[id];
                otherPlayer.health -= 10;
            }       
        }
    }
  }
}


setInterval(() => {
    updateBackendPlayers();
    updateBackendBullets();
    io.emit('updatePlayers', backendPlayers);
    io.emit('updateProjectiles', backendProjectiles);
    io.emit('update');
    tick++;
}, 15);
