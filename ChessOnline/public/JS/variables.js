const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
const socket = io();
canvas.width = 400;
canvas.height = 400;
const width = canvas.width;
const height = canvas.height;
