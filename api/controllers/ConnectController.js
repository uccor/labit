/**
 * ConnectController
 *
 * @description :: Server-side logic for managing connects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ConnectController = {
	show: function (req, res) {
		//req.session.user = user.id;
		

		var http = require("http")
		var server = http.createServer().listen(8080);
		var io = require('socket.io').listen(server) 
		var fs = require('fs');
		io.sockets.emit('welcome', {message: "Hi i'm Laurent and i write shitty articles on my blog"});
		
		res.json({"pepe":'chat'});
		
		res.view({
      		
      		errors    : req.flash('error')
    	});
	}
}

module.exports = ConnectController;