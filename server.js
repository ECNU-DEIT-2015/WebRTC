
'use strict';

var os = require('os');
var nodeStatic = require('node-static');
var fs = require('fs');
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


var login_user = {};
var connectCounter = 0;


var tempimage = "";

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
      console.log('message email',msg['email']);
      console.log('message password', msg['password']);
      var connection = mysqlconnection();
      // var querysql = "select password from user where email='"+msg['email']+"';";
      var querysql = "select * from user where email='"+msg['email']+"' and password='"+msg['password']+"'";
      connection.query(querysql,function(err, rows, fields) {    
        console.log("rows length", rows.length);
        if(rows.length == 1){
          var cookie = Math.random().toString();
          login_user[cookie.toString()] = msg['email'];
          socket.emit("return_login", {"verified":true,"cookie":cookie});
        }else{
          socket.emit("return_login", false);
        }
      });
      connection.end();      
    });


    socket.on("personal_file", function(msg){
      var connection = mysqlconnection();
      var querysql = "select * from personal_file where email='nongxiaolang@foxmail.com'";
      connection.query(querysql, function(err, rows, fields) {
        socket.emit("personal_file",rows);
        connection.end();
      });
    });

    socket.on("cooperation_file", function(msg){
      var connection = mysqlconnection();
      var querysql = "select * from cooperation_file where email='nongxiaolang@foxmail.com'";
      connection.query(querysql, function(err, rows, fields) {
        socket.emit("cooperation_file",rows);
        connection.end();
      });
    });

    socket.on("bin_file", function(msg){
      var connection = mysqlconnection();
      var querysql = "select * from bin_file where email='nongxiaolang@foxmail.com'";
      connection.query(querysql, function(err, rows, fields) {
        socket.emit("bin_file",rows);
        connection.end();
      });
    });

    socket.on("new_bin_file", function(msg){
      var connection = mysqlconnection();
      var querysql = "select * from bin_file where email='nongxiaolang@foxmail.com'";
      connection.query(querysql, function(err, rows, fields) {
        socket.emit("new_bin_file",rows);
        connection.end();
      });
    });

    socket.on("friend_file", function(msg){

      var cookie = msg['cookie'].split(';')[0];
      var user = login_user[cookie];
      var querysql = "select * from user where email in (select friend_email from friend where email='"+user+"')";
      var connection = mysqlconnection();
      console.log("msg['cookie']",msg['cookie'].split(";")[0]);
      console.log('friend file cookie', cookie, login_user[cookie]);
      connection.query(querysql, function(err, rows, fields) {
        socket.emit("friend_file",rows);
        connection.end();
      });
    });

    socket.on("save_empty_file", function(msg){
      var imgData = msg['imgData'];
      var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
      var dataBuffer = new Buffer(base64Data, 'base64');
      
      var cookie = msg['cookie'].split(';')[0];
      var email = login_user[cookie];

      
      var querysql = "select count(*) from personal_file where email='"+email+"'";
      var querysql1 = "insert into personal_file(email, personal_file_id, image, headline, introduction, labels) value(?,?,?,?,?,?)";
      var connection = mysqlconnection();

      connection.query(querysql, function(err, rows, fields) {
        var count = rows[0]['count(*)'];
        var imagepath = "images/"+email+"/personal_file/"+(count+1).toString()+".png";
        var headline = msg['headline'];
        var introduction = msg['introduction'];
        var labels = msg['labels'];
        connection.query(querysql1,[email, email+(count+1).toString(),"../"+imagepath, headline, introduction, labels], function(err, result){
          fs.writeFile(imagepath, dataBuffer, function(err) {
            if(err){
              socket.emit("save_empty_file",{"result":false});
            }else{
              socket.emit("save_empty_file",{"result":true});
              console.log("save successfully");
            }
          });
        });
      });


    });


    socket.on("modify_image", function(msg){
      var imagepath = msg['imagepath'].split("../")[1];
      var imgData = msg['imagedata'];
      var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
      var dataBuffer = new Buffer(base64Data, 'base64');
      fs.writeFile(imagepath, dataBuffer, function(err) {
        if(err){
          socket.emit("modify_image",{"result":false});
        }else{
          socket.emit("modify_image",{"result":true});
          console.log("save successfully");
        }
      });
    });

    socket.on("delete_file_bin", function(msg){
      var table = msg['table'];
      var image = msg['image'];
      var cookie = msg['cookie'].split(';')[0];
      var email = login_user[cookie];

      var querysql = "select * from "+table+" where image='"+image+"'";
      var querysql1 = "delete from "+table+" where image='"+image+"'";
      console.log("querysql",querysql);
      console.log("querysql1",querysql1);
      var querysql2 = "insert into bin_file(bin_file_id,email,image,headline,introduction,labels) value(?,?,?,?,?,?)";
      var connection = mysqlconnection();
      connection.query("SET SQL_SAFE_UPDATES = 0", function(err, result){
        if(err){
          console("SET SQL_SAFE_UPDATES = 0; failed");
        }else{
          connection.query(querysql, function(err, rows, fields) {
            var row = rows[0];
            var bin_file_id;
            if(table == "personal_file"){
              bin_file_id = row['personal_file_id'];
            }else{
              bin_file_id = row['cooperation_file_id'];
            }
            var headline = row['headline'];
            var introduction = row['introduction'];
            var labels = row['labels'];
            connection.query(querysql2, [bin_file_id,email,image,headline,introduction,labels], function(err, result){
              if(err){
                console.log("bin_file_id,email,image,headline,introduction,labels",bin_file_id,email,image,headline,introduction,labels);
                console.log("insert into bin failed");
                socket.emit("delete_file_bin",{"result":false});
                connection.end();
              }else{
                connection.query(querysql1,function(err,result){
                  if(err){
                    socket.emit("delete_file_bin",{"result":false});
                  }else{
                    socket.emit("delete_file_bin",{"result":true});
                  }
                  connection.end();
                });
              }
            });
        });
        }
      });
      
    });

    socket.on("recover", function(msg){
      var table = msg['table'];
      var image = msg['image'];
      var cookie = msg['cookie'].split(';')[0];
      var email = login_user[cookie];

      var querysql = "select * from bin_file where image='"+image+"'";
      var querysql1;
      if(table=="personal_file"){
        querysql1 = "insert into personal_file(personal_file_id,email,image,headline,introduction,labels) value(?,?,?,?,?,?)";
      }else{
        querysql1 = "insert into cooperation_file(cooperation_file_id,email,image,headline,introduction,labels) value(?,?,?,?,?,?)";
      }
      var querysql2 = "delete from bin_file where image='"+image+"'";

      var connection = mysqlconnection();
      connection.query(querysql, function(err, rows, fields){
        if(err){
          console.log("querysql failed");
          socket.emit("recover",{"result":false});
        }else{
          var row = rows[0];
          var file_id = row['bin_file_id'];
          var email = row['email'];
          var image = row['image'];
          var headline = row['headline'];
          var introduction = row['introduction'];
          var labels = row['labels'];
          connection.query(querysql1,[file_id, email, image, headline, introduction, labels], function(err, result){
            if(err){
              socket.emit("recover",{"result":false});
              connection.end();
            }else{
              console.log("querysql1 insert in to personal file success");
              connection.query(querysql2,function(err, result){
                if(err){
                  socket.emit("recover",{"result":false});
                }else{
                  socket.emit("recover",{"result":true});
                }
              });
              connection.end();
            }
          });
        }
      });
    });

    socket.on("totally_delete", function(msg){
      var image = msg['image'];
      var cookie = msg['cookie'].split(';')[0];
      var email = login_user[cookie];


      var querysql = "delete from bin_file where image='"+image+"'";
      var connection = mysqlconnection();
      connection.query(querysql, function(err, result){
        if(err){
          socket.emit("totally_delete",{"result":false});
        }else{
          socket.emit("totally_delete",{"result":true});
        }
      });
      connection.end();
    });

    socket.on("call_friend", function(msg){
      // socket.emit("call_friend", {"image":msg["image"]});
      // console.log("call_friend----=====---====");
      tempimage = msg['image'];
    });

    socket.on("call_friend_image", function(msg){
      socket.emit("call_friend_image", {"image":tempimage});
    });

    socket.on("search_friend", function(msg){

      var connection = mysqlconnection();
      var cookie = msg['cookie'].split(';')[0];
      var user = login_user[cookie];
      var friend = msg['friend'];
      var querysql = "select * from user where email in (select friend_email from friend where email='"+user+"' and friend_email like '%"+friend+"%')";
      connection.query(querysql, function(err, rows, fields){
        if(err){
          socket.emit("search_friend",{"result":false});
        }else{
          socket.emit("search_friend", {"result":true,"friends":rows});
        }
      });
      connection.end();
      // console.log("search_friend");
      // var friends = [];
      // var i0 =  parseInt(Math.random()*10);
      // for(var i=0; i<i0; i++){
      //   friends.push(i);
      // }
      // socket.emit("search_friend", {"result":true, "friends": friends});
    });
    // socket.on("test_cookie", function(msg){
    //   console.log(msg);
    //   console.log(msg['cookie']);
    //   console.log(login_user);
    //   console.log(login_user[msg['cookie'].split(";")[0].trim()]);
    // });


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
        database:'project_2015_5'
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