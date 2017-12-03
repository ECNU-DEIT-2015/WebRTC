var fs = require('fs');
var url = require('url');

var express = require('express');
var app = express();
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var http = require('http').Server(app);
var io = require("socket.io")(http);

app.get('/', function(req, res){
  res.sendFile(__dirname+"/index.html");
});

io.on("connection", function(socket){
    socket.on("array_changed", function(msg){
        console.log("array_changed");
        socket.broadcast.emit("array_changed", msg);
    });
});

http.listen(8080, function(){
    console.log('listening on *:8080');
  });

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