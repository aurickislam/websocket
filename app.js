const http = require('http'),
	express = require('express'),
	WebSocket = require('ws'),
	colors = require('colors');

const app = express(),
	server = http.createServer(app);

const wss = new WebSocket.Server({server, path:"/broadcast"});
wss.on('connection', (ws, req) => {
	ws.on('message', message => {
		console.log(`received: ${message}`);
		ws.send(`Hello, you sent -> ${message}`);
	});

	// ws.send('Hi there, I am a WebSocket server');
	// ws.send(Uint8Array.from(Buffer.from(JSON.stringify({a: 'a'}))).buffer);
	ws.send(JSON.stringify({a: 'a'}));
});


app.use(express.json());
app.use(express.static('public'));

app.get('/broadcast', (req, res) => {

	console.log("@request", req.query.message);

	wss.clients.forEach(client => {
		// if (client != ws)
		client.send(`Hello, broadcast message -> ${req.query.message}`);
	});

	res.send({
		status: "OK"
	});
});

//start our server
server.listen(process.env.PORT || 8999, () => {
	console.log("\n===========================".rainbow);
	console.log(`Server started on port ${server.address().port}`.cyan);
	console.log("===========================\n".rainbow);
});