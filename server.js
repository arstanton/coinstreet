const express = require('express');
const http = require('http').Server(express);
const io = require('socket.io')(http);
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile('views/index.html', { root: __dirname });
});
// io.on('connection', function(socket){
//   console.log('a user connected');
// });


app.listen(PORT, HOST);