
console.log("draw angular");
var socket = io.connect();
var app = angular.module('draw_app', []);
app.directive('drawcanvas', function(){
    return {
        templateUrl: 'canvas.html',
        replace: true,
        restrict: 'AE',
    }
});


app.controller("main_controller", function($http, $scope){

    $scope.drawhtml = true;
    $scope.image = "";
    $scope.xx = 1;
    $scope.ctx = undefined;
    $scope.canvas_imagedata = undefined;
    $scope.array_data  = undefined;
    window.setTimeout(add_canvas,100);
    
    // window.setTimeout(init($scope),200);
    $scope.socket = socket;
    // window.setTimeout(init_canvas($scope), 4000);

    socket.on("call_friend", function(msg){
      $scope.image = msg['image'];
    });

    $scope.remove = function(){
        if($scope.drawcanvas.length== 0){
            $scope.drawcanvas = [1];
        }else{
            $scope.drawcanvas = []; 
        }
        
    };
    window.setTimeout(function(){init_canvas($scope);init_video($scope)},1000);
    $scope.test = function(){
        // var canvas = $("canvas:first").get(0);
        // console.log(canvas.getContext("2d"));
        // console.log($scope.array_data);
        init_canvas($scope);
        init_video($scope);
    }

    $scope.only_video = function(){
        $scope.show_navigator = false;
        $scope.show_canvas = false;
        $("video:first").get(0).style.width = "300px";
        $("video:first").get(0).style.height = "200px";

        $("video:last").get(0).style.position = "absolute";
        
        $("video:last").get(0).style.width = document.body.offsetWidth.toString()+"px";
        $("video:last").get(0).style.height = (document.body.offsetHeight+80).toString()+"px";
        $("video:last").get(0).style.top = "10px";
        $("video:last").get(0).style.left = "10px";
        $("video:last").get(0).style.zIndex = "-1";
        
        console.log("width",window.innerWidth);
        console.log("height", window.innerHeight);
    }

    $scope.recover = function(){
        $scope.show_navigator = true;
        $scope.show_canvas = true;
        $("video:last").get(0).style.position = "static";
        $("video:first").get(0).style.width = "300px";
        $("video:first").get(0).style.height = "220px";

        $("video:last").get(0).style.width = "300px";
        $("video:last").get(0).style.height = "220px";
    }

    $scope.icons = function(){
        if($scope.show_icons == true){
            $scope.show_icons = false;
        }else{
            $scope.show_icons = true;
        }
    }

    $scope.save_empty_file = function(){
      console.log("save empty file",$scope.introduction);
            var canvas = $("canvas:first").get(0);
            // console.log(canvas.toDataURL());
            socket.emit('save_cooperation_file',{"introduction":$scope.introduction,"headline":$scope.headline,"cookie":document.cookie,"imgData":canvas.toDataURL(),"labels":$scope.labels});
            // console.log("introduction",$scope.introduction);
            // console.log("headline",$scope.headline);
            // console.log("labels",$scope.labels);
            socket.on("save_cooperation_file", function(msg){
                if(msg['result'] == true){ alert("新文件保存成功")}
            });
    }
    // $scope.recover = function()
    // console.log("mymain.js from main_controller");
    // var canvas = document.getElementsByTagName('canvas')[0];
    // canvas.id = "main_canvas";
    // var ctx = canvas.getContext('2d');
    // var canvas_imagedata = ctx.getImageData(0,0,990,500);
    // var array_data = new Uint8ClampedArray(canvas_imagedata.data);
});


app.controller('navigator_controller', function($http, $scope) {
  $scope.messages = false;
  $scope.m1 = "../img/message.png";
  $scope.m2 = "../img/message1.png";
  socket.emit("messages", {"cookie":document.cookie});
  socket.on("messages", function(msg){
      if(msg['result']){
          $scope.messages = msg['messages'];
      }
      console.log("messages", )
  });

  $scope.data_list = []
  $scope.$watch('search_value', function(newValue, oldValue) {
      if (newValue === oldValue) {
          return;
      }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
          $scope.data_list.push({"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/1.png"});
      }else{
          $scope.data_list.pop()
      }
      console.log("data changed");
  }, true);
});


function init_canvas(scope){
    console.log("init_canvas");
    var canvas = $("canvas:first").get(0);
    console.log("scope xx",scope.xx);   
    var img = document.createElement("img");
    // scope.socket.on("call_friend", function(msg){
    //   console.log("call_friend----=====---");
    //   img.src = msg['image'];
    //   window.setTimeout(function(){$("canvas:first").get(0).getContext('2d').drawImage(img,0,0);},1000);
    // });

    // img.src = "http://localhost:8080/images/1.png";
    // window.setTimeout(function(){$("canvas:first").get(0).getContext('2d').drawImage(img,0,0);},1000);

    // img.src = scope.image;
    // window.setTimeout(function(){$("canvas:first").get(0).getContext('2d').drawImage(img,0,0);},1000);
    scope.socket.emit("call_friend_image",{"xx":"xx"});
    scope.socket.on("call_friend_image", function(msg){
      img.src = msg['image'];
      window.setTimeout(function(){$("canvas:first").get(0).getContext('2d').drawImage(img,0,0);},1000);
    });
    canvas.id = "main_canvas";
    scope.ctx = $("canvas:first").get(0).getContext('2d');
    scope.canvas_imagedata = scope.ctx.getImageData(0,0,990,500);
    scope.array_data = new Uint8ClampedArray(scope.canvas_imagedata.data);

    if(window.Worker){

        var myWorker = new Worker("worker.js");

        window.setInterval(function(){
            var lasted_array = $("#main_canvas").get(0).getContext("2d").getImageData(0,0,990,500).data;
            // var lasted_array = document.getElementById("main_canvas").getContext("2d").getImageData(0,0,990,500).data;
            myWorker.postMessage([scope.array_data, lasted_array]);
        },100);


        myWorker.onmessage = function(e){
            if(e.data["isChanged"] == true){
                scope.array_data = $("#main_canvas").get(0).getContext("2d").getImageData(0,0,990,500).data;
                scope.array_data = new Uint8ClampedArray(scope.array_data);
                scope.socket.emit("array_changed", e.data["change_data"])
            }else{
                console.log("not changed");
            }
        }

             
        scope.socket.on("array_changed", function(msg){
            var lasted_array = $("#main_canvas").get(0).getContext("2d").getImageData(0,0,990,500).data;
            for(var i=0; i<msg.length; i += 2){
                lasted_array[msg[i]] = msg[i+1];
            }
            scope.array_data = new Uint8ClampedArray(lasted_array);
            var imagedata =  new ImageData(lasted_array , scope.canvas_imagedata.width, scope.canvas_imagedata.height);
            $("#main_canvas").get(0).getContext("2d").putImageData(imagedata,0,0);
            console.log("success");
        });
    }
}


function init_video(scope){
    var isChannelReady = false;
    var isInitiator = false;
    var isStarted = false;
    var localStream;
    var pc;
    var remoteStream;
    var turnReady;
    
    var pcConfig = {
      'iceServers': [{
        'urls': 'stun:stun.l.google.com:19302'
      }]
    };
    
    // Set up audio and video regardless of what devices are present.
    var sdpConstraints = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    };
    
    /////////////////////////////////////////////
    
    var room = 'foo';
    // Could prompt for room name:
    // room = prompt('Enter room name:');
    
    // var socket = io.connect();
    
    if (room !== '') {
      scope.socket.emit('create or join', room);
      console.log('Attempted to create or  join room', room);
    }
    
    scope.socket.on('created', function(room) {
      console.log('Created room ' + room);
      isInitiator = true;
    });
    
    scope.socket.on('full', function(room) {
      console.log('Room ' + room + ' is full');
    });
    
    scope.socket.on('join', function (room){
      console.log('Another peer made a request to join room ' + room);
      console.log('This peer is the initiator of room ' + room + '!');
      isChannelReady = true;
    });
    
    scope.socket.on('joined', function(room) {
      console.log('joined: ' + room);
      isChannelReady = true;
    });
    
    scope.socket.on('log', function(array) {
      console.log.apply(console, array);
    });
    
    ////////////////////////////////////////////////
    
    function sendMessage(message) {
      console.log('Client sending message: ', message);
      scope.socket.emit('message', message);
    }
    
    // This client receives a message
    scope.socket.on('message', function(message) {
      console.log('Client received message:', message);
      if (message === 'got user media') {
        maybeStart();
      } else if (message.type === 'offer') {
        if (!isInitiator && !isStarted) {
          maybeStart();
        }
        pc.setRemoteDescription(new RTCSessionDescription(message));
        doAnswer();
      } else if (message.type === 'answer' && isStarted) {
        pc.setRemoteDescription(new RTCSessionDescription(message));
      } else if (message.type === 'candidate' && isStarted) {
        var candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        pc.addIceCandidate(candidate);
      } else if (message === 'bye' && isStarted) {
        handleRemoteHangup();
      }
    });
    
    ////////////////////////////////////////////////////
    
    var localVideo = document.querySelector('#localVideo');
    var remoteVideo = document.querySelector('#remoteVideo');
    
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
    .then(gotStream)
    .catch(function(e) {
      alert('getUserMedia() error: ' + e.name);
    });
    
    function gotStream(stream) {
      console.log('Adding local stream.');
      localVideo.src = window.URL.createObjectURL(stream);
      localStream = stream;
      sendMessage('got user media');
      if (isInitiator) {
        maybeStart();
      }
    }
    
    var constraints = {
      video: true
    };
    
    console.log('Getting user media with constraints', constraints);
    
    if (location.hostname !== 'localhost') {
      requestTurn(
        'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
      );
    }
    
    function maybeStart() {
      console.log('>>>>>>> maybeStart() ', isStarted, localStream, isChannelReady);
      if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
        console.log('>>>>>> creating peer connection');
        createPeerConnection();
        pc.addStream(localStream);
        isStarted = true;
        console.log('isInitiator', isInitiator);
        if (isInitiator) {
          doCall();
        }
      }
    }
    
    window.onbeforeunload = function() {
      sendMessage('bye');
    };
    
    /////////////////////////////////////////////////////////
    
    function createPeerConnection() {
      try {
        pc = new RTCPeerConnection(null);
        pc.onicecandidate = handleIceCandidate;
        pc.onaddstream = handleRemoteStreamAdded;
        pc.onremovestream = handleRemoteStreamRemoved;
        console.log('Created RTCPeerConnnection');
      } catch (e) {
        console.log('Failed to create PeerConnection, exception: ' + e.message);
        alert('Cannot create RTCPeerConnection object.');
        return;
      }
    }
    
    function handleIceCandidate(event) {
      console.log('icecandidate event: ', event);
      if (event.candidate) {
        sendMessage({
          type: 'candidate',
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        });
      } else {
        console.log('End of candidates.');
      }
    }
    
    function handleRemoteStreamAdded(event) {
      console.log('Remote stream added.');
      remoteVideo.src = window.URL.createObjectURL(event.stream);
      remoteStream = event.stream;
    }
    
    function handleCreateOfferError(event) {
      console.log('createOffer() error: ', event);
    }
    
    function doCall() {
      console.log('Sending offer to peer');
      pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
    }
    
    function doAnswer() {
      console.log('Sending answer to peer.');
      pc.createAnswer().then(
        setLocalAndSendMessage,
        onCreateSessionDescriptionError
      );
    }
    
    function setLocalAndSendMessage(sessionDescription) {
      // Set Opus as the preferred codec in SDP if Opus is present.
      //  sessionDescription.sdp = preferOpus(sessionDescription.sdp);
      pc.setLocalDescription(sessionDescription);
      console.log('setLocalAndSendMessage sending message', sessionDescription);
      sendMessage(sessionDescription);
    }
    
    function onCreateSessionDescriptionError(error) {
      trace('Failed to create session description: ' + error.toString());
    }
    
    function requestTurn(turnURL) {
      var turnExists = false;
      for (var i in pcConfig.iceServers) {
        if (pcConfig.iceServers[i].url.substr(0, 5) === 'turn:') {
          turnExists = true;
          turnReady = true;
          break;
        }
      }
      if (!turnExists) {
        console.log('Getting TURN server from ', turnURL);
        // No TURN server. Get one from computeengineondemand.appspot.com:
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var turnServer = JSON.parse(xhr.responseText);
            console.log('Got TURN server: ', turnServer);
            pcConfig.iceServers.push({
              'url': 'turn:' + turnServer.username + '@' + turnServer.turn,
              'credential': turnServer.password
            });
            turnReady = true;
          }
        };
        xhr.open('GET', turnURL, true);
        xhr.send();
      }
    }
    
    function handleRemoteStreamAdded(event) {
      console.log('Remote stream added.');
      remoteVideo.src = window.URL.createObjectURL(event.stream);
      remoteStream = event.stream;
    }
    
    function handleRemoteStreamRemoved(event) {
      console.log('Remote stream removed. Event: ', event);
    }
    
    function hangup() {
      console.log('Hanging up.');
      stop();
      sendMessage('bye');
    }
    
    function handleRemoteHangup() {
      console.log('Session terminated.');
      stop();
      isInitiator = false;
    }
    
    function stop() {
      isStarted = false;
      // isAudioMuted = false;
      // isVideoMuted = false;
      pc.close();
      pc = null;
    }
    
    ///////////////////////////////////////////
    
    // Set Opus as the default audio codec if it's present.
    function preferOpus(sdp) {
      var sdpLines = sdp.split('\r\n');
      var mLineIndex;
      // Search for m line.
      for (var i = 0; i < sdpLines.length; i++) {
        if (sdpLines[i].search('m=audio') !== -1) {
          mLineIndex = i;
          break;
        }
      }
      if (mLineIndex === null) {
        return sdp;
      }
    
      // If Opus is available, set it as the default in m line.
      for (i = 0; i < sdpLines.length; i++) {
        if (sdpLines[i].search('opus/48000') !== -1) {
          var opusPayload = extractSdp(sdpLines[i], /:(\d+) opus\/48000/i);
          if (opusPayload) {
            sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex],
              opusPayload);
          }
          break;
        }
      }
    
      // Remove CN in m line and sdp.
      sdpLines = removeCN(sdpLines, mLineIndex);
    
      sdp = sdpLines.join('\r\n');
      return sdp;
    }
    
    function extractSdp(sdpLine, pattern) {
      var result = sdpLine.match(pattern);
      return result && result.length === 2 ? result[1] : null;
    }
    
    // Set the selected codec to the first in m line.
    function setDefaultCodec(mLine, payload) {
      var elements = mLine.split(' ');
      var newLine = [];
      var index = 0;
      for (var i = 0; i < elements.length; i++) {
        if (index === 3) { // Format of media starts from the fourth.
          newLine[index++] = payload; // Put target payload to the first.
        }
        if (elements[i] !== payload) {
          newLine[index++] = elements[i];
        }
      }
      return newLine.join(' ');
    }
    
    // Strip CN from sdp before CN constraints is ready.
    function removeCN(sdpLines, mLineIndex) {
      var mLineElements = sdpLines[mLineIndex].split(' ');
      // Scan from end for the convenience of removing an item.
      for (var i = sdpLines.length - 1; i >= 0; i--) {
        var payload = extractSdp(sdpLines[i], /a=rtpmap:(\d+) CN\/\d+/i);
        if (payload) {
          var cnPos = mLineElements.indexOf(payload);
          if (cnPos !== -1) {
            // Remove CN payload from m line.
            mLineElements.splice(cnPos, 1);
          }
          // Remove CN line in sdp
          sdpLines.splice(i, 1);
        }
      }
    
      sdpLines[mLineIndex] = mLineElements.join(' ');
      return sdpLines;
    }
}


function init(scope){
  add_canvas();
  init_canvas(scope);
  init_video(socket);
}