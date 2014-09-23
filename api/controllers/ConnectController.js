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
		
    
    	// var io = sails.io;
		var socket = req.socket;

		
		console.log('--------req.socket----------');
		console.log(socket.emit('messageName', {thisIs: 'theMessage'}));
		console.log('-------------');
        //socket.emit('messageName', {thisIs: 'theMessage'});
	    
	    //var c = sails.io.sockets.id();
  //   	var b = sails.io.sockets.clients();
		// var b1 = sails.sockets.subscribers(); //devuelve los id de los sockets conectados
		// console.log ('rooms',sails.sockets.rooms());
		// console.log('subs',b1);
    	//console.log(io.sockets);
		//console.log(b.length);
		//console.log(b[0]['id']);

		// emit to all sockets (aka publish)
	    // including yourself
	    // io.sockets.emit('messageName', {thisIs: 'theMessage'});
	 // 
	    // broadcast to a room (aka publish)
	    // excluding yourself, if you're in it
	    //socket.broadcast.to('roomName').emit('messageName', {thisIs: 'theMessage'});
	 
	    // emit to a room (aka publish)
	    // including yourself
	    // io.sockets.in('roomName').emit('messageName', {thisIs: 'theMessage'});
	 
	    // Join a room (aka subscribe)
	    // If you're in the room already, no problem, do nothing
	    // If the room doesn't exist yet, it gets created
	    // socket.join('roomName');
	 
	    // Leave a room (aka unsubscribe)
	    // If you're not in the room, no problem, do nothing
	    // If the room doesn't exist yet, no problem, do nothing
	    // socket.leave('roomName');
	 
	    // Get all connected sockets in the app
	    // sails.io.sockets.clients();
	 
	    // Get all conneted sockets in the room, "roomName"
	    // sails.io.sockets.clients('roomName');
		
	},


}

module.exports = ConnectController;

