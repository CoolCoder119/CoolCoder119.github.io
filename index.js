console.log("javascript ran");
var canvas = document.getElementById('Canvas');
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var width = canvas.width;
var height = canvas.height;
ctx.fillStyle = "black";
ctx.fillRect(0,0,width,height)