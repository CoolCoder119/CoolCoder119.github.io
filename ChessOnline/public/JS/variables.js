const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
const socket = io();
canvas.width = 400;
canvas.height = 400;
const canvasInfo = canvas.getBoundingClientRect();
const width = canvas.width;
const height = canvas.height;

const board = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
const columns = 8;
const rows = 8;
const blockSize = width/rows;

var Black =  {
        bishop : undefined,
        king : undefined,
        knight : undefined,
        pawn : undefined,
        queen : undefined,
        rook : undefined
    }
var White = {
    bishop : undefined,
    king : undefined,
    knight : undefined,
    pawn : undefined,
    queen : undefined,
    rook : undefined
}

var Mouse = {
    x: undefined,
    y: undefined,
    selected: false,
    selectedPiece: undefined
}