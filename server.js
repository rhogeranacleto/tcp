const net = require('net');

let port = 3000;

const server = net.createServer(function (client) {

	console.log('Cliente connectou');

	client.write('Bem vindo ao servidor ' + port);

	client.setEncoding('utf8');

	client.on('data', function (text) {

		console.log('Texto recebido do cliente: ', text);
	});

	client.on('close', function () {
		
		console.log('Cliente desconectou');
	});

	client.pipe(client);
});

server.on('error', function (err) {

	if (err.code === 'EADDRINUSE') {

		port++;

		if (port <= 3010) {

			return listenServer();
		}
	}

	console.log('Servidor fora');
});

server.on('listening', function () {

	console.log('Server online na porta:', port);
});

function listenServer() {

	server.listen(port, '127.0.0.1');
}

listenServer();