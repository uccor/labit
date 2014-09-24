/**
 * CurrentUsersController
 *
 * @description :: Server-side logic for managing currentusers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var arrayUsers = [];

var self = {
	
	join: function(req,res) {
		var a = req.user;
		arrayUsers.push(a);
		//console.log('socket',req.sockets.emit('pp'));
		console.log('array',arrayUsers);
		req.socket.on('messageName', function () {
			console.log('recibi un mensaje!!')
		});

		//asociar el socket con esta api.
		// emit(req,res);
		req.socket.emit('currentUser',{users: arrayUsers});
	},

	get: function (req,res) {
		res.send(arrayUsers);
	},

	remove: function (req,res) {
		var user = req.user;
		for(var i = arrayUsers.length - 1; i >= 0; i--) {
    		if(arrayUsers[i].id == user.id) {
       			arrayUsers.splice(i, 1);
    		}
		}
		// emit(req,res);
		req.socket.emit('currentUser',{users: arrayUsers});
	}
	// emit: function (req,res) {
	// 	console.log('socket',socket);
		
	// }
};


// forEach( calendars, function (item, index) {
//     array[] = item.id
// }, done );
module.exports = self