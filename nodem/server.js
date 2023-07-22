const io = require('socket.io')(8000);


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log("new user ",name);
        users[socket.id]=name;
        // socket.broadcast.emit('online',name);
       socket.broadcast.emit('user-joined',name);
    //    socket.broadcast.emit('user-stick-man',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
        socket.emit('messageOnline',message);
        console.log(users);
        // socket.broadcast.emit('messageOnline',message);

    });

    socket.on('disconnect', () =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

});