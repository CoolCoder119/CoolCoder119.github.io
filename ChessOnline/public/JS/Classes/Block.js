var Block = function(color,piece,row,column) {
    this.piece = piece;
    this.color = color;
    this.row = row;
    this.column = column;
}
Block.prototype.drawBoard = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.row*blockSize,this.column*blockSize,blockSize,blockSize);
}
Block.prototype.drawPieces = function() {
    if (this.piece.type === undefined || this.piece.color === undefined) return;
    drawImage(this.piece,this.row,this.column);
}