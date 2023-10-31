socket.on('updatePlayers', (backendPlayers) => {
    for (const id in backendPlayers) {
        const backendPlayer = backendPlayers[id];
        if (!players[id]) {
            players[id] = new Player(backendPlayer.x,backendPlayer.y,backendPlayer.radius,backendPlayer.color,backendPlayer.speed,id)
        } else {
/*            var currentPlayer = players[id];
            currentPlayer.Mouse.x = backendPlayer.Mouse.x;
            currentPlayer.Mouse.y = backendPlayer.Mouse.y;
            currentPlayer.Mouse.keyW = backendPlayer.Mouse.keyW;
            currentPlayer.Mouse.keyA = backendPlayer.Mouse.keyA;
            currentPlayer.Mouse.keyS = backendPlayer.Mouse.keyS;
            currentPlayer.Mouse.keyD = backendPlayer.Mouse.keyD;*/
        }
    }
    for (const id in players) {
        if (!backendPlayers[id]) {
            delete players[id];
        }
    }

    
})

socket.on('update', () => {
    ctx.clearRect(0,0,width,height);
    drawMap();
    for (const id in players) {
        var player = players[id];
        player.draw();
        player.update();
    }
    coins.forEach((coin) => {
        coin.draw();
    })
    bullets.forEach((bullet,i) => {
        bullet.draw();
        bullet.update();
        if (bullet.markedForDeletion) {
            bullets.splice(i,1);
        }
    })
    if (!players[socket.id]) return;
    var player = players[socket.id];
    scrollX = player.x - (Actualwidth/2);
    scrollY = player.y - (Actualheight/2);
    if (tick % bulletSummonTick === 0 /*&& player.Mouse.down*/) {
        const angle = Math.atan2(
        player.Mouse.y-(Actualheight/2),
        player.Mouse.x-(Actualwidth/2)
        );

        const xVel = Math.cos(angle) * bulletSpeed;
        const yVel = Math.sin(angle) * bulletSpeed;

        var bullet = new Bullet(player.x,player.y,bulletRadius,player.color,player.id,xVel,yVel);
        bullets.push(bullet);
    };

    tick++;
})


socket.on('sendMap', (info) => {
    map = info.map;
    maphealth = info.maphealth;
    console.log(maphealth);
})
socket.on('updateMap', (info) => {
    map[info.column][info.row] = 0;
    maphealth[info.column][info.row] = 0;
})
window.onload = function() {
    player = createPlayer(0);
    mainPlayerId = 0;
}