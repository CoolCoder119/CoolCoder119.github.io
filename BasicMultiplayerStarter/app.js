const express = require("express");
const http = require('http');
const { Server }  = require('socket.io');
const { isObject } = require("util");
const app = express();

const port = process.env.PORT || 3000;  

const server = http.createServer(app);
const io = new Server(server);
server.listen(3000);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
})


io.on('connection', (socket) => {
  console.log('say something');
})

