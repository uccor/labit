function validateForm(){
	var x=document.forms["login"]["username"].value;
	if (x==null || x==""){
		return false;
	}
}

//PRUEBA
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//
app.get('/', function(req, res){
    res.sendfile('index.html');
    //res.sendFile("./views/chat.ejs");
});


io.on('connection', function(socket){
    socket.on('chat message', function(msg){


        console.log("chat:"+msg);
       // io.emit('chat message', msg);
        io.emit('chat message', { chat: msg });

        //sails.io.sockets.emit("message",{id:o.id,model:"order",verb:"update",
        //    data:{ id:o.id, status: o.status}})


    });

});




http.listen(3000, function(){
    console.log('listening on *:3000');
});
//FIN PRUEBA