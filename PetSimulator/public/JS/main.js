
function gameLoop() {;
    ctx.clearRect(0,0,width,height);
    drawMap();
    players.forEach((player) => {
        player.draw();
        player.update();
    })
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
    requestAnimationFrame(gameLoop);
}


window.onload = function() {
    createPlayer(0);
    createPlayer(1);
    gameLoop();
}