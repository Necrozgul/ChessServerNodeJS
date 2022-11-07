const WebSocket = require('ws');
const PORT = 5000;
const wsServer = new WebSocket.Server({
    port: PORT,
});
function CreateGuid() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}
class User {
    constructor(_socket) {
        this.socket = _socket;
        this.id = CreateGuid();
    }
}
var users = [];
wsServer.on('connection', function (socket) {
    //Some feedback to the console
    console.log("A client just connected");
    //Generating user
    users.push(new User(socket));
    //Getting user list
    users.forEach(function (user) {
        console.log(user.id);
    })

    //Attach some behavior to incoming socket
    socket.on('message', function (msg) {
        console.log('[Recieved Message] : ' + msg);
        // socket.send('Take this back '+msg)
        //Broadcast this message to every client

        wsServer.clients.forEach(function (client) {
            client.send('Someone said: ' + msg);
        })
    });
});


console.log("[" + new Date().getDate() + "]" + "Server is now listening on port" + PORT);