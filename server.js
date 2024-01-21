const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors'); // Import the cors module
const app = express();
const server = http.createServer(app);
app.use(cors());
const database=[]

const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//sw
app.get('/service-worker.js', (req, res) => {
  res.sendFile(__dirname + '/service-worker.js');
});

// Handle socket connection
io.on('connection', (socket) => {
  socket.emit('notification', 'Welcome! You are connected.');
});

app.post('/addObject', (req, res) => {
  const newObject = { id: Date.now(), data:database.length};
  database.push(newObject);
  io.emit('notification', 'New object added to the database.now the new data is ===>>     '+database.length);
  res.json({ success: true, data:newObject });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


