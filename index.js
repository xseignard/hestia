var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// clamp
var clamp = function(current, min, max) {
  return Math.min(Math.max(current, min), max);
};

// server routing
app.get('/section/off', function (req, res) {
	io.emit('allOff');
	console.log('allOff');
	res.status(200).send('allOff');
});

app.get('/section/:ledSection/:r/:g/:b', function (req, res) {
	var ledSection = clamp(req.params.ledSection, 0, 5);
	var r = clamp(req.params.r, 0, 255);
	var g = clamp(req.params.g, 0, 255);
	var b = clamp(req.params.b, 0, 255);
	io.emit('section', { ledSection, r, g, b });
	console.log(`${ledSection}, ${r}, ${g}, ${b}`);
	res.status(200).send({ ledSection, r, g, b });
});

io.on('connection', function(socket) {
	console.log('connected!');
});

// start server
http.listen(3000, function () {
  console.log('Server started')
});
