
$(function () {

    console.log("mymain.js");
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.id = "main_canvas";
    var ctx = canvas.getContext('2d');
    var canvas_imagedata = ctx.getImageData(0,0,990,500);
    var array_data = new Uint8ClampedArray(canvas_imagedata.data);
    var socket = io();

    if(window.Worker){

        var myWorker = new Worker("worker.js");

        window.setInterval(function(){
            var lasted_array = document.getElementById("main_canvas").getContext("2d").getImageData(0,0,990,500).data;
            myWorker.postMessage([array_data, lasted_array]);
        },50);


        myWorker.onmessage = function(e){
            if(e.data["isChanged"] == true){
                array_data = document.getElementById("main_canvas").getContext("2d").getImageData(0,0,990,500).data;
                array_data = new Uint8ClampedArray(array_data);
                socket.emit("array_changed", e.data["change_data"])
            }else{
                console.log("not changed");
            }
        }

             
        socket.on("array_changed", function(msg){
            var lasted_array = document.getElementById("main_canvas").getContext("2d").getImageData(0,0,990,500).data;
            for(var i=0; i<msg.length; i += 2){
                lasted_array[msg[i]] = msg[i+1];
            }
            array_data = new Uint8ClampedArray(lasted_array);
            var imagedata =  new ImageData(lasted_array , canvas_imagedata.width,canvas_imagedata.height);
            var c = document.getElementById("main_canvas");
            c.getContext('2d').putImageData(imagedata,0,0);
            console.log("success");
        });
    }
})