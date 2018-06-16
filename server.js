const net = require('net');
const {
	MongoClient
} = require('mongodb');
const moment = require('moment');

const MONGO_DB_URL = 'mongodb://localhost';

MongoClient.connect(MONGO_DB_URL, function (err, connection) {

	if (err) {

		console.error('Não foi possível conectar ao banco de dados', err);
		process.exit(1);
	}

	let port = 3000;
	const sessions = connection.db('tcp').collection('sessions');
	const SESSION_MATCH = /session:.{8}\-.{4}\-.{4}\-.{4}\-.{12}/

	const server = net.createServer(function (client) {

		console.log('Cliente connectou');

		client.write('Bem vindo ao servidor ' + port);

		client.setEncoding('utf8');

		client.on('data', function (req) {

			let {
				session_id,
				text
			} = JSON.parse(req);

			text = text.trim();

			sessions.findOne({
				session_id
			}, function (err, session) {

				if (err) {

					return console.log('Find one', err);
				}

				if (session) {

					if (text === '\\historic') {

						client.write('> Lista de mensagens enviadas:\n' + session.messages.map(message => `[${moment(message.date).format('DD/MM/YYYY:HH:mm:ss')}]: ${message.text}`).join('\n'));

						return;
					}

					sessions.update({
						_id: session._id
					}, {
						$push: {
							messages: {
								text,
								date: new Date()
							}
						}
					}, function (err, jj) {

						if (err) {

							return console.log('update', err);
						}

						client.write(text);
					});
				} else {

					if (text === '\\historic') {

						client.write('> Você ainda não enviou nenhuma mensagem!');

						return;
					}

					sessions.insert({
						session_id,
						messages: [{
							text,
							date: new Date()
						}]
					}, function (err, ss) {

						if (err) {

							return console.log('inser', err);
						}

						client.write(text);
					});
				}
			});

			console.log('Texto recebido do cliente: ', text);
		});

		client.on('close', function () {

			console.log('Cliente desconectou');
		});

		// client.pipe(client);
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
});