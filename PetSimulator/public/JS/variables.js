const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
const socket = io();

const Actualwidth = window.innerWidth;
const Actualheight = window.innerHeight;


var total = 1536+739;
var MULTIPLIER = total/(Actualwidth+Actualheight);

const width = 1536*4;
const height = 739*4;

canvas.width = Actualwidth;
canvas.height = Actualheight;


var grassBlock = document.querySelector("#grassBlock");
var indestructableBlock = document.querySelector("#indestructableBlock");

var scrollX = 0;
var scrollY = 0;

var map = [];
var maphealth = [];
var rows = 100;
var columns = 50;
var blockWidth = width/rows;
var blockHeight = height/columns;

var randomColors = ["green","red","orange","blue","yellow","purple"];


var players = [];
var mainPlayerId = 0;

var player;
var playerRadius = 20;
var playerColor = "red";
var playerSpeed = 6;
var playerHealth = 10;

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
var bulletRadius = 10*MULTIPLIER;
var bulletSpeed = 10*MULTIPLIER;
var bulletSummonTick = 10;

var tick = 0;
