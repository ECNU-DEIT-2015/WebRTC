
'use strict';

var os = require('os');
var nodeStatic = require('node-static');
// var http = require('http');
// var socketIO = require('socket.io');

// var fileServer = new(nodeStatic.Server)();
// var app = http.createServer(function(req, res) {
//     fileServer.serve(req, res);
// }).listen(8080);

// var express = require('express');
// app.use(express.static('public'));
// app.use("/", express.static(__dirname));
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// var io = socketIO.listen(app);

// var io = socketIO.listen(app_);

var express = require('express');
var app = express();
// // app.use(express.static('public'));
app.use("/", express.static(__dirname));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// var io = socketIO.listen(app);

var http = require('http').Server(app);
var io = require("socket.io")(http);

app.get('/', function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.get("/jj", function(req,res){
  res.sendFile(__dirname+"/web/shouye.html");
});



var connectCounter = 0;
// numClients
// io.sockets.on("connection", function(socket){
  io.on("connection", function(socket){
    connectCounter ++;
    console.log("connected user count",connectCounter);
    socket.on("array_changed", function(msg){
        console.log("array_changed");
        socket.broadcast.emit("array_changed", msg);
    });

    socket.on("login", function(msg){
      console.log('login message',msg);
      var connection = mysqlconnection();
      // var querysql = "select password from user where email='"+msg['email']+"';";
      var querysql = "select password from user where email='nongxiaolang@foxmail.com';";
      connection.query(querysql,function(err, rows, fields) {    
        for(va)
        console.log("rows length", rows);
      });
      socket.emit("return_login", true);
    });



// convenience function to log server messages on the client
function log() {
  var array = ['Message from server:'];
  array.push.apply(array, arguments);
  socket.emit('log', array);
}

socket.on('message', function(message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });


  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

    // var numClients = io.sockets.sockets.length;
    var numClients = io.sockets.length;
    log('Room ' + room + ' now has ' + connectCounter + ' client(s)');

    if (connectCounter === 1) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);

    } else if (connectCounter < 10) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
    } else { // max two clients
      socket.emit('full', room);
    }
  });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

  socket.on('bye', function(){
    console.log('received bye');
  });

  socket.on('disconnect', function() {
    connectCounter--;
    console.log("disconnected",connectCounter);
    });
}); 

http.listen(8080, function(){
    console.log('listening on *:8080');
  });


function mysqlconnection(){
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'www.muedu.org',
        user: 'deit-2015',
        password: 'deit@2015!',
        database:'project_2015_example'
    });
    connection.connect();
    return connection;
    // connection.end();
}


// // 创建服务器
// http.createServer( function (request, response) {  
//     // 解析请求，包括文件名
//     var pathname = url.parse(request.url).pathname;
    
//     // 输出请求的文件名
//     console.log("Request for " + pathname + " received.");
    
//     // 从文件系统中读取请求的文件内容
//     fs.readFile(pathname.substr(1), function (err, data) {
//        if (err) {
//           console.log(err);
//           // HTTP 状态码: 404 : NOT FOUND
//           // Content Type: text/plain
//           response.writeHead(404, {'Content-Type': 'text/html'});
//        }else{             
//           // HTTP 状态码: 200 : OK
//           // Content Type: text/plain
//           response.writeHead(200, {'Content-Type': 'text/html'});    
          
//           // 响应文件内容
//           response.write(data.toString());        
//        }
//        //  发送响应数据
//        response.end();
//     });   
//  }).listen(8080);