
addEventListener('mousedown', (event) => {
    if (!players[socket.id]) return;
    var player = players[socket.id];
    player.Mouse.down = true;
    socket.emit("mousedown");
});
addEventListener('mouseup', (event) => {
    if (!players[socket.id]) return;
    var player = players[socket.id];
    player.Mouse.down = false;
    socket.emit("mouseup")
});

addEventListener('mousemove', (event) => {
    if (!players[socket.id]) return;
    var player = players[socket.id];
    player.Mouse.x = event.x;
    player.Mouse.y = event.y;
    socket.emit("mousemove", {x: event.x, y: event.y});
});

document.addEventListener('keydown', (event) => {
    if (!players[socket.id]) return;
    var player = players[socket.id];
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "w" || code === "ArrowUp") {
        player.Mouse.keyW = true;
        socket.emit("keydown", "w")
    } 
    if (code === "s" || code === "ArrowDown") {
        player.Mouse.keyS = true;
        socket.emit("keydown", "s" )
    } 
    if (code === "a" || code === "ArrowLeft") {
        player.Mouse.keyA = true;
        socket.emit("keydown", "a" )
    }
    if (code === "d" || code === "ArrowRight") {
        player.Mouse.keyD = true;
        socket.emit("keydown",  "d")
    }
  }, false);
document.addEventListener('keyup', (event) => {
    if (!players[socket.id]) return;
    var player = players[socket.id];
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "w" || code === "ArrowUp") {
        player.Mouse.keyW = false;
        socket.emit("keyup",  "w")
    } 
    if (code === "s" || code === "ArrowDown") {
        player.Mouse.keyS = false;
        socket.emit("keyup",  "s")
    } 
    if (code === "a" || code === "ArrowLeft") {
        player.Mouse.keyA = false;
        socket.emit("keyup",  "a")
    } 
    if (code === "d" || code === "ArrowRight") {
        player.Mouse.keyD = false;
        socket.emit("keyup",  "d")
    }
  }, false);