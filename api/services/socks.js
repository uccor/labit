
var http = require("http")
var server = http.createServer().listen(8080);
var io = require('socket.io').listen(server) 
// Don't forget to "npm install socket.io" before including this
var fs = require('fs');

/**
* Connection
*/
// io.sockets.on('connection', function (socket) {
//     //console.log('CONNECT');
//     // socket.on('disconnect', function (socket) {
//     //     console.log('DISCONNECT');
//     // });
//     socket.emit('bienvenido', {message: "Bienvenido!"});
//     socket.on('hey', function (socket) {
//         console.log('cliente dijo hey');
//     });
// });

// module.exports = {
//     socket: io.sockets,
// }
module.exports = io;
