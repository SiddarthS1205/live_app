const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('chat', (chat) => {
    io.emit('chat', chat);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});
