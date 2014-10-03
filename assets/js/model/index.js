// function validateForm(){
// 	var x=document.forms["login"]["username"].value;
// 	if (x==null || x==""){
// 		return false;
// 	}
// }

window.onload = function () {

    // var socket = io.connect('http://localhost') ;
    // socket.on("news", function(data) {
    // 	console.log(data);
    // });


    //io.socket.emit("news2", 'estoy conectado');
    // io.socket.get('http://localhost:1337/user', function (body, response) {
    //     console.log('Sails responded with: ', body);
    //     console.log('with headers: ', sailsResponseObject.headers);
    //     console.log('and with status code: ', sailsResponseObject.statusCode);
    // });
};

$(document).ready(function () {
    $("#emit1").click(function () {
        io.socket.emit('messageName', {userID: '1222'});
    });

    io.socket.on('currentUser', function (socket) {
        console.log(socket.users);
    });
});

// io.socket.get('http://localhost:1337/getCurrentUsers', function (body, response) {
// 	console.log('Sails responded with: ', body);
// });

// // Socket_io is your front-end library you included before
// var Socket = io.connect('http://localhost:8080');
// Socket.on('welcome', function (socket) {
// 	// What we've send from the back-end
// 	//console.log(socket.message);
// 	// And we send something else !
// 	//Socket.emit('hey', {message: "I really don't care."});
// 	$("#textA").append(socket.message);
// 	$("#textA").append('-------');
// });
// Socket.on('bye', function (socket) {
// 	// What we've send from the back-end
// 	console.log(socket.message);
// 	// And we send something else !
// 	//Socket.emit('hey', {message: "digo hey cliente."});
// });


