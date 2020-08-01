const http = require('http'),
	express = require('express'),
	WebSocket = require('ws'),
	colors = require('colors');

if (process.env.COLOR !== 'true')
	colors.disable();

const app = express(),
	server = http.createServer(app);

const wsServer = new WebSocket.Server({server, path:"/broadcast"});
wsServer.on('connection', (wsClient, req) => {
	wsClient.on('message', message => {
		console.log(`received: ${message}`);
		// wsClient.send(message);

		console.log("@wsServer.clients", wsServer.clients.size);

		wsServer.clients.forEach(client => {
			if (client != wsClient)
				client.send(message);
		});
	});

	// ws.send(Uint8Array.from(Buffer.from(JSON.stringify({a: 'a'}))).buffer);
	// wsClient.send(JSON.stringify({message: 'Connected'}));
	wsClient.send('Websocket connected successfully');
});


app.use(express.json());
app.use(express.static('public'));

app.post('/broadcast', (req, res) => {
	console.log("@req", req.body)

	console.log("@request", req.query.message);

	wsServer.clients.forEach(client => {
		// if (waClient != ws)
		client.send(`${req.query.message}`);
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