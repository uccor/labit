/**
 * ConnectController
 *
 * @description :: Server-side logic for managing connects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ConnectController = {
	show: function (req, res) {
		// var io = require('../services/socks.js');
		// io.sockets.on('connection', function (socket) {
		// 	console.log('connection - show');
		// 	socket.emit('welcome', {message: " welcome from server"});	
		// });
		
		// //res.json({"pepe":'chat'});
		// res.redirect('/chat');
		// console.log('user',req.user);
		// console.log('session',req.session.user);
		
		var socket = req.socket;
	    
	    //var c = sails.io.sockets.id();
    	var b = sails.io.sockets.clients();
		var b1 = sails.sockets.subscribers(); //devuelve los id de los sockets conectados
		console.log ('rooms',sails.sockets.rooms());
		console.log('subs',b1);
    	//console.log(io.sockets);
		//console.log(b.length);
		//console.log(b[0]['id']);
		
	}
}

module.exports = ConnectController;

