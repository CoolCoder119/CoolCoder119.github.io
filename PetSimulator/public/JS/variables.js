const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
const socket = io();



const Actualwidth = window.innerWidth;
const Actualheight = window.innerHeight;


var total = 1536+739;
var MULTIPLIER = total/(Actualwidth+Actualheight);



var sounds = [];
var shootSound = new Audio('./Sounds/shoot.wav');
var walkSounds = 
    [
        new Audio('./Sounds/walk1.wav'),
        new Audio('./Sounds/walk2.wav'),
        new Audio('./Sounds/walk3.wav')
    ];
var damageSounds =
    [
        new Audio('./Sounds/damage1.wav'),
        new Audio('./Sounds/damage2.wav'),
        new Audio('./Sounds/damage3.wav')
    ];

var map = [];
var maphealth = [];
var rows;
var columns;
var blockWidth;
var blockHeight;
var width;
var height;

canvas.width = Actualwidth;
canvas.height = Actualheight;


var grassBlock = document.querySelector("#grassBlock");
var indestructableBlock = document.querySelector("#indestructableBlock");

var scrollX = 0;
var scrollY = 0;



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

var tick = 0;
var walkSoundTick = 15;

var blockHealth = 2;
var blockColor = "rgb(110, 84, 56)";
var indestructableblockColor = "black";

var bullets = [];


var killer;
var currentPlayerID;
var playerColor;