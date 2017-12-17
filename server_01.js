'use strict';

var os = require('os');
var nodeStatic = require('node-static');

var express = require('express');
var app = express();
app.use("/", express.static(__dirname));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var http = require('http').Server(app);
var io = require("socket.io")(http);

// 读写文件模块
var fs = require('fs');

app.get('/', function(req, res){
  res.sendFile(__dirname+"/index.html");
});

io.on("connection", function(socket){
  console.log("connected....");
  socket.on("save_canvas", function(msg){
      // msg是字符串
      fs.readFile("canvas.json",function(err,data){
        // fs读文件出来的data不是字符串，需要转成字符串
        socket.emit("images", data.toString());
        fs.writeFile("canvas.json",msg,function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
        });
      });
  });
});


http.listen(8080, function(){
  console.log('listening on *:8080');
});