/**
 * ConnectController
 *
 * @description :: Server-side logic for managing connects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ConnectController = {
	show: function (req, res) {
		var io = require('../services/socks.js');
		io.sockets.on('connection', function (socket) {
			console.log('connection - show');
			socket.emit('welcome', {message: " welcome from server"});	
		});
		
		//res.json({"pepe":'chat'});
		res.redirect('/chat');
	}
}

module.exports = ConnectController;

