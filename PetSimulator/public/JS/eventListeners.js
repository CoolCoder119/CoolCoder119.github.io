addEventListener('mousedown', (event) => {
    player.Mouse.down = true;
});
addEventListener('mouseup', (event) => {
    player.Mouse.down = false;
});

addEventListener('mousemove', (event) => {
    player.Mouse.x = event.x;
    player.Mouse.y = event.y;
});

document.addEventListener('keydown', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "w" || code === "ArrowUp") {
        player.Mouse.keyW = true;
    } 
    if (code === "s" || code === "ArrowDown") {
        player.Mouse.keyS = true;
    } 
    if (code === "a" || code === "ArrowLeft") {
        player.Mouse.keyA = true;
    }
    if (code === "d" || code === "ArrowRight") {
        player.Mouse.keyD = true;
    }
  }, false);
document.addEventListener('keyup', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "w" || code === "ArrowUp") {
        player.Mouse.keyW = false;
    } 
    if (code === "s" || code === "ArrowDown") {
        player.Mouse.keyS = false;
    } 
    if (code === "a" || code === "ArrowLeft") {
        player.Mouse.keyA = false;
    } 
    if (code === "d" || code === "ArrowRight") {
        player.Mouse.keyD = false;
    }
  }, false);