const express = require("express");
const http = require('http');
const { Server }  = require('socket.io');
const app = express();

const port = 3000;  

const server = http.createServer(app);
const io = new Server(server);
server.listen(3000);
console.log("this is here");



//http.listen(3000, "127.0.0.1");

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
})



io.on('connection', (socket) => {
    console.log('a user connected');
})

/*app.listen(port, () => {
     console.log("Example port listening on port 3000");
 });*/