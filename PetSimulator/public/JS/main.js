socket.on('updatePlayers', (backendPlayers) => {
    for (const id in backendPlayers) {
        for (const id in players) {
            if (!backendPlayers[id]) {
                delete players[id];
                continue;
            }
        }
        const backendPlayer = backendPlayers[id];
        if (!players[id]) {
            players[id] = new Player(backendPlayer.x,backendPlayer.y,backendPlayer.radius,backendPlayer.color,backendPlayer.speed,id,backendPlayer.health)
        } else {
            var currentPlayer = players[id];
            currentPlayer.Mouse.x = backendPlayer.Mouse.x;
            currentPlayer.Mouse.y = backendPlayer.Mouse.y;
            currentPlayer.Mouse.keyW = backendPlayer.Mouse.keyW;
            currentPlayer.Mouse.keyA = backendPlayer.Mouse.keyA;
            currentPlayer.Mouse.keyS = backendPlayer.Mouse.keyS;
            currentPlayer.Mouse.keyD = backendPlayer.Mouse.keyD;
            currentPlayer.health = backendPlayer.health;
            currentPlayer.x = backendPlayer.x;
            currentPlayer.y = backendPlayer.y;
        }
    }

    
})
socket.on('updateProjectiles', (backendProjectiles) => {
    for (const id in backendProjectiles){
         var backendProjectile = backendProjectiles[id];
        if (!bullets[id]) {
            bullets[id] = new Bullet(backendProjectile.x,backendProjectile.y,backendProjectile.radius,backendProjectile.color,backendProjectile.velocity)
        } else {
            var bullet = bullets[id];
            bullet.x = backendProjectile.x;
            bullet.y = backendProjectile.y;
        }
    }
    for (const id in bullets) {
        if (!backendProjectiles[id]) {
            delete bullets[id];
        };
    }
})

socket.on('update', () => {
    ctx.clearRect(0,0,Actualwidth,Actualheight);
    drawMap();
    for (const id in players) {
        var player = players[id];
        player.draw();
    }
    coins.forEach((coin) => {
        coin.draw();
    })
    for (const id in bullets) {
        var bullet = bullets[id];
        bullet.draw();
    };


    if (!players[socket.id]) {
        location.reload();
        return;
    }
    var player = players[socket.id];
    scrollX = player.x - (Actualwidth/2);
    scrollY = player.y - (Actualheight/2);

})
socket.on('sendWidthHeight',() => {
    socket.emit('widthHeight', ({width: Actualwidth,height: Actualheight}));
})


socket.on('sendMap', (info) => {
    map = info.map;
    maphealth = info.maphealth;
})
socket.on('updateMap', (info) => {
    map[info.column][info.row] = 0;
    maphealth[info.column][info.row] = 0;
})
window.onload = function() {
    player = createPlayer(0);
    mainPlayerId = 0;
}