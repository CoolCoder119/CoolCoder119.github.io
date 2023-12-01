addEventListener('mousedown', (event) => {
    Mouse.x = event.x-canvasInfo.left;
    Mouse.y = event.y-canvasInfo.top;
    console.log*('clicked');
    checkClickedPiece();    
})
addEventListener('mousemove', (event) => {
    Mouse.x = event.x-canvasInfo.left;
    Mouse.y = event.y-canvasInfo.top;
})