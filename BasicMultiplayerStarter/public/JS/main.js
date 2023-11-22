socket.on('updatePlayers', (backendPlayers) => {
    if (backendPlayers[socket.id] && !players[socket.id]) {
        document.querySelector(".deathDiv").style.background = backendPlayers[socket.id].color;
    }

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
            currentPlayer.moving = backendPlayer.moving;
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
    if (killer) {
        var playerKiller = players[killer];
        if (playerKiller) {
            scrollX = playerKiller.x - (Actualwidth/2);
            scrollY = playerKiller.y - (Actualheight/2);
        }
    }

    if (!players[socket.id]) {
        return;
    }
    var player = players[socket.id];
    currentPlayerID = socket.id;
    playerColor = player.color;
    scrollX = player.x - (Actualwidth/2);
    scrollY = player.y - (Actualheight/2);
    
    if (tick % walkSoundTick === 0 && players[socket.id].moving) {
        tick = 0;
        var walkSound =getRandomChoiceOf(walkSounds);
        walkSound.volume = Math.random() * 0.2;
        play(walkSound);
    }

    tick++;

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
socket.on('playerKilled', (info) => {
    if (currentPlayerID === info.player) {
        killer = info.killer;
        var damageSound = damageSounds[0];
        play(damageSound);
        setTimeout(() => {
            var damageSound = damageSounds[1];
            dplay(damageSound);
        },400);
        setTimeout(() => {
            document.querySelector('.deathDiv').style.display = "flex";
            document.querySelector('.deathDiv').style.opacity = "1";
            var damageSound = damageSounds[2];
            play(damageSound);
        },1000);
    }
})
socket.on('damage', (info) => {
    if (currentPlayerID === info.player) {
        var damageSound = getRandomChoiceOf(damageSounds);
        damageSound.volume = 0.3;
        play(damageSound);
    }
})
socket.on('sendInfo', (info) => {
    width = info.width;
    height = info.height;
    rows = info.rows;
    columns = info.columns;
    blockWidth = info.blockWidth;
    blockHeight = info.blockHeight;
})
socket.on('shoot', (info) => {
    if (info.playerID === socket.id) {
        play(shootSound);
    }
})
window.onload = function() {
    mainPlayerId = 0;
    document.querySelector('.restart').onclick = function() {
        location.reload();
    }
}
