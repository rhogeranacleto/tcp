const net = require('net');

process.stdin.resume();
process.stdin.setEncoding('utf8');

let port = 2999;
let lastConnectedPort = 0;

let client = new net.Socket();

function clientConnect() {

	port++;

	if (port >= 3010) {

		port = 3000;
	}

	client.connect(port, '127.0.0.1');
}

client.on('data', function (data) {

	console.log('Texto recebido do servidor: ' + data);
});

client.on('close', function (j) {

	setTimeout(clientConnect, 1);
});

client.on('error', function (err) {

	if (err.code === 'ECONNREFUSED') {

		setTimeout(clientConnect, 1);
	}
});

process.stdin.on('data', function (text) {

	client.write(text);
});

clientConnect();