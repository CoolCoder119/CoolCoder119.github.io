const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
const socket = io();



const Actualwidth = window.innerWidth;
const Actualheight = window.innerHeight;


var total = 1536+739;
var MULTIPLIER = total/(Actualwidth+Actualheight);

const width = 1536;
const height = 739;

canvas.width = Actualwidth;
canvas.height = Actualheight;


var grassBlock = document.querySelector("#grassBlock");
var indestructableBlock = document.querySelector("#indestructableBlock");

var scrollX = 0;
var scrollY = 0;

var map = [];
var maphealth = [];
var rows = 20*2;
var columns = 10*2;
var blockWidth = width/rows;
var blockHeight = height/columns;

var randomColors = ["green","red","orange","blue","yellow","purple"];


var players = {};
var mainPlayerId = 0;

function getRandom(top) {
    return Math.round(Math.random() * top);
}

var player;
var playerRadius = 20;
var playerSpeed = 5;
var playerColor = "rgb(" + getRandom(360) + "," + getRandom(360)+ "," + getRandom(360) +")";
var playerHealth = 50;

var coins = [];
var coinColor = 'gold';
var maxcoinRadius = 30;
var mincoinRadius = 10;
var coinSummonTick = 50;

var blockHealth = 2;
var blockColor = "rgb(110, 84, 56)";
var indestructableblockColor = "black";

var bullets = [];
var bulletColor = 'pink';
var bulletRadius = 10;
var bulletSpeed = 15;
var bulletSummonTick = 10;

var tick = 0;
