console.log("draw angular");
var app = angular.module('draw_app', []);
app.directive('drawcanvas', function(){
    return {
        templateUrl: 'canvas.html',
        replace: true,
        restrict: 'AE',
    }
});


app.controller("main_controller", function($http, $scope){

    var socket = io.connect();

    $scope.xx = 1;
    $scope.ctx = undefined;
    $scope.canvas_imagedata = undefined;
    $scope.array_data  = undefined;
    window.setTimeout(add_canvas,500);
    $scope.socket = socket;
    // window.setTimeout(init_canvas($scope), 4000);

    
    $scope.remove = function(){
        if($scope.drawcanvas.length== 0){
            $scope.drawcanvas = [1];
        }else{
            $scope.drawcanvas = []; 
        }
        
    };

    $scope.test = function(){
        // var canvas = $("canvas:first").get(0);
        // console.log(canvas.getContext("2d"));
        // console.log($scope.array_data);
        init_canvas($scope);
    }
    // console.log("mymain.js from main_controller");
    // var canvas = document.getElementsByTagName('canvas')[0];
    // canvas.id = "main_canvas";
    // var ctx = canvas.getContext('2d');
    // var canvas_imagedata = ctx.getImageData(0,0,990,500);
    // var array_data = new Uint8ClampedArray(canvas_imagedata.data);
});


app.controller('navigator_controller', function($http, $scope) {
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
    img.src = "http://localhost:8080/images/1.png";
    window.setTimeout(function(){$("canvas:first").get(0).getContext('2d').drawImage(img,0,0);},1000);
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
