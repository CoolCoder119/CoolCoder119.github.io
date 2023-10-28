socket.on('updatePlayers', (backendPlayers) => {
    for (const id in backendPlayers) {
        const backendPlayer = backendPlayers[id];
        if (!players[id]) {
            players[id] = new Player(backendPlayer.x,backendPlayer.y,backendPlayer.radius,backendPlayer.color,backendPlayer.speed,backendPlayer.id)
        }
    }
    for (const id in players) {
        if (!backendPlayers[id]) {
            delete players[id]
        }
    }
})

socket.on('update', () => {
    ctx.clearRect(0,0,width,height);
    drawMap();
    player.draw();
    player.update();
    for (const id in players) {
        var otherPlayer = players[id];
        otherPlayer.draw();
        otherPlayer.update();
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
    if (tick % coinSummonTick === 0) {
        createCoins(1);
    }
    tick++;
})


socket.on('mapDone', (serverMap,serverMapHealth) => {
    map = serverMap;
    maphealth = serverMapHealth;
})


window.onload = function() {
    player = createPlayer(0);
    mainPlayerId = 0;
}