function play(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}
function chooseColor(number,r,c) {
    var color;
    if (c % 2 === 0) {
        if (number % 2 === 0) {
            color = 'brown';
        } else {
            color = 'white';
        } 
    } else {
        if (number % 2 === 1) {
            color = 'brown';
        } else {
            color = 'white';
        }    
    }

    return color;
}
function choosePiece(column,row) {
    var type;
    var color;
    if (column === 1) {
        type = 'pawn';
    } else if (column === 6) {
        type = 'pawn';
    }
    if (column === 0 || column === 7) {
        if (row === 0 || row === 7) {
            type = 'rook';
        }
        if (row === 1 || row === 6) {
            type = 'knight';
        }
        if (row === 2 || row === 5) {
            type = 'bishop';
        }
        if (row === 3) {
            type = 'king';
        }
        if (row === 4) {
            type = 'queen';
        }
    }

    if (column === 0 || column === 1) {
        color = 'black';
    }
    if (column === 6 || column === 7) {
        color = 'white';
    }
    return {
        type: type,
        color: color
    }
}
function drawImage(piece,row,column) {
    var type = undefined;
    if (piece.type === 'pawn' ) {
        if (piece.color === 'white') {
            type = White.pawn;
        } else {
            type = Black.pawn;
        }
    }
    if (piece.type === 'rook' ) {
        if (piece.color === 'white') {
            type = White.rook;
        } else {
            type = Black.rook;
        }
    }
    if (piece.type === 'queen' ) {
        if (piece.color === 'white') {
            type = White.queen;
        } else {
            type = Black.queen;
        }
    }
    if (piece.type === 'king' ) {
        
        if (piece.color === 'white') {
            type = White.king;
        } else {
            type = Black.king;
        }
    }
    if (piece.type === 'knight' ) {
        
        if (piece.color === 'white') {
            type = White.knight;
        } else {
            type = Black.knight;
        }
    }
    if (piece.type === 'bishop' ) {
        if (piece.color === 'white') {
            type = White.bishop;
        } else {
            type = Black.bishop;
        }
     }


    ctx.drawImage(type,(row*blockSize)+(blockSize/7),(column*blockSize)-(blockSize*0.4),blockSize*0.7,blockSize*1.4);
}
function createGrid() {
    var count = 0;
    for (var c = 0; c < columns; c++) {
        for (var r = 0; r < rows; r++) {
            count++;
            var piece = choosePiece(c,r);
            var block = new Block(chooseColor(count,r,c)  ,  piece, r, c);
            board[c][r] = block;
            }
    }
}
function drawBoard() {
    for (var c = 0; c < columns; c++) {
        for (var r = 0; r < rows; r++) {
            var block = board[c][r];
            block.drawBoard();
        }
    }
}
function drawPieces() {
    for (var c = 0; c < columns; c++) {
        for (var r = 0; r < rows; r++) {
            var block = board[c][r];
            block.drawPieces();
        }
    }
}

function checkClickedPiece() {
    var x = Math.round(Mouse.x/blockSize)*blockSize;
    var y = Math.round(Mouse.y/blockSize)*blockSize;
    var row = x/blockSize;
    var column = y/blockSize;
    if (row >= 0 && row <= 7) {
        if (column >= 0 && column <= 7) {
            var block = board[column][row];
            console.log*(block.piece.color);
            if (!block.piece.type === undefined) {
                console.log('continued');
                Mouse.selected = true;
                Mouse.selectedPiece = block.piece;
                console.log(Mouse.selectedPiece);
            } else {
                Mouse.selected = false;
            }
        }
    }
}
function drawSelectedPiece() {
    console.log(Mouse.selectedPiece)
    var piece = Mouse.selectedPiece;
    var type = undefined;
    if (piece.type === 'pawn' ) {
        if (piece.color === 'white') {
            type = White.pawn;
        } else {
            type = Black.pawn;
        }
    }
    if (piece.type === 'rook' ) {
        if (piece.color === 'white') {
            type = White.rook;
        } else {
            type = Black.rook;
        }
    }
    if (piece.type === 'queen' ) {
        if (piece.color === 'white') {
            type = White.queen;
        } else {
            type = Black.queen;
        }
    }
    if (piece.type === 'king' ) {
        
        if (piece.color === 'white') {
            type = White.king;
        } else {
            type = Black.king;
        }
    }
    if (piece.type === 'knight' ) {
        
        if (piece.color === 'white') {
            type = White.knight;
        } else {
            type = Black.knight;
        }
    }
    if (piece.type === 'bishop' ) {
        if (piece.color === 'white') {
            type = White.bishop;
        } else {
            type = Black.bishop;
        }
     }
     ctx.drawImage(type,(row*Mouse.x)+(blockSize/7),(column*Mouse.y)-(blockSize*0.4),blockSize*0.7,blockSize*1.4);
}