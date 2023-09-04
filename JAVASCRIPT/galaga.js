let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


let canvasWidth = 500;
let canvasHeight = 500;
let blockSize = 10;
let widthInBlocks = canvasWidth / blockSize;
let heightInBlocks = canvasHeight / blockSize;
console.log(widthInBlocks);
console.log(heightInBlocks);



var player1 = function(block1,block2,block3,centerrow,centercolumn) {
    this.blocks = [block1,block2,block3];
    this.row = centerrow;
    this.col = centercolumn;
}
player1.prototype.drawPlayer = function(){
    for (i = 0; i < blocks.length;i++){
        let b = blocks[i];
        b.Draw();
    }
}


var block = function(col,row,color){
    this.col = col;
    this.row = row;
    this.color = color;
}
block.prototype.Draw = function(){
    var x = this.col * blockSize;
    var y = this.row * blockSize;
    ctx.fillStyle = this.color;
    ctx.fillRect(x,y,blockSize,blockSize);
}

function random(max){
    return Math.floor(math.random() * max);   
}

let blocks = [];

let b1 = new block(2,Math.floor(heightInBlocks / 2 - 1), "black");
let b2 = new block(2,Math.floor(heightInBlocks / 2),"black");
let b3 = new block(2, Math.floor(heightInBlocks / 2 + 1),"black");

blocks.push(b1);
blocks.push(b2);
blocks.push(b3);

console.log(blocks);
for (i = 0;i < blocks.length; i++){
    let b = blocks[i];
    console.log(b);
}
let p1 = new player1(b1,b2,b3,2,heightInBlocks / 2);
//let p1 = new player1(b1,b2,b3)

function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    p1.drawPlayer();

}

setInterval(gameLoop, 30);