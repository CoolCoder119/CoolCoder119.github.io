function update() {
    window.requestAnimationFrame(update);

    ctx.clearRect(0,0,width,height);
    drawBoard();
    ctx.fillStyle = 'grey';
    var x = Math.round(Mouse.x/blockSize)*blockSize;
    var y = Math.round(Mouse.y/blockSize)*blockSize;
    if (!Mouse.selected) {
        ctx.fillRect(x,y,blockSize,blockSize);
    }
    drawPieces();
    if (Mouse.selected) {
        drawSelectedPiece();
    }
}

window.onload = function() {
    createGrid();

    Black.bishop = document.getElementById('B_Bishop');
    Black.king = document.getElementById('B_King');
    Black.knight = document.getElementById('B_Knight');
    Black.pawn = document.getElementById('B_Pawn');
    Black.queen = document.getElementById('B_Queen');
    Black.rook = document.getElementById('B_Rook');

    White.bishop = document.getElementById('W_Bishop');
    White.king = document.getElementById('W_King');
    White.knight = document.getElementById('W_Knight');
    White.pawn = document.getElementById('W_Pawn');
    White.queen = document.getElementById('W_Queen');
    White.rook = document.getElementById('W_Rook');


    update();
}