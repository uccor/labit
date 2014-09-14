// function validateForm(){
// 	var x=document.forms["login"]["username"].value;
// 	if (x==null || x==""){
// 		return false;
// 	}
// }

window.onload=function(){
	var socket = io.connect('http://localhost') ;
	socket.on("news", function(data) {
		console.log(data);
	});
	//io.socket.emit("news2", 'estoy conectado');
	// io.socket.get('http://localhost:1337/user', function (body, response) {
	//     console.log('Sails responded with: ', body);
	//     console.log('with headers: ', sailsResponseObject.headers);
	//     console.log('and with status code: ', sailsResponseObject.statusCode);
	// });	
};