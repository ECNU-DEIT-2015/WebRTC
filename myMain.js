
$(function () {

    console.log("mymain.js");
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.id = "main_canvas";
    var ctx = canvas.getContext('2d');
    var canvas_imagedata = ctx.getImageData(0,0,990,500);

    var array_data = new Uint8ClampedArray(canvas_imagedata.data);

    var socket = io();

    socket.on("toserver", function(msg){
        console.log(msg);
    });

    if(window.Worker){
        var myWorker = new Worker("../js/worker.js");
        window.setInterval(function(){
            var lasted_array = document.getElementById("main_canvas").getContext("2d").getImageData(0,0,990,500).data;
            myWorker.postMessage([array_data, lasted_array]);
        },200);

        myWorker.onmessage = function(e){
            if(e.data["isChanged"] == true){
                array_data = document.getElementById("main_canvas").getContext("2d").getImageData(0,0,990,500).data;
                array_data = new Uint8ClampedArray(array_data);
                socket.emit('toserver', JSON.stringify({'id':1,'data': e.data["changed_data"]}))
            }else{
                console.log("not changed");
            }
        }
    }
}
    // var dd;
    // var original_data;


    // var canvas = document.getElementsByTagName('canvas');
    // var ctx = canvas[0].getContext('2d');
    // dd = ctx.getImageData(0,0,990,500);
    // original_data = dd.data;
    // canvas[0].id = "main_canvas";
    // var main_canvas = canvas[0];


    // var change_data;
    // var is_change = false;

    // window.setInterval(detect_change,200);
    // window.setInterval(send,150);
    // window.setInterval(detect,100)


    function send()
    {
        var timestamp = new Date().getTime();
        console.log("send at"+timestamp);
        if(is_change)
        {
            var xmlhttp;
            xmlhttp=new XMLHttpRequest();
            
            xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {




                    // console.log("success");
                    // console.log("end at"+new Date().getTime());
                    // console.log("send cost"+(new Date().getTime()-timestamp));

                    // document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
                    // document.getElementById("myDiv").innerHTML = "success";
                }
            }
            xmlhttp.open("POST","http://127.0.0.1:54444",false);
            change_data.push('+');
            xmlhttp.send(change_data);
            // xmlhttp.send("test")
        }
    }

    function detect()
    {
        var xmlhttp;
        xmlhttp=new XMLHttpRequest();
         
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                if(xmlhttp.responseText.length>100)
                {
                    var return_data_array = xmlhttp.responseText.split(",");
                    for(var i=0; i<return_data_array.length-1; i+=2)
                    {
                        original_data[return_data_array[i]] = return_data_array[i+1];
                    }

                    var mycanvas = document.getElementById("main_canvas");
                
                    var imagedata =  new ImageData(original_data , dd.width,dd.height);

                    mycanvas.getContext('2d').putImageData(imagedata,0,0);
                    // document.getElementById("myDiv").innerHTML = "success";                
                    console.log("success")
                }
               
            }
        }
         
          xmlhttp.open("POST","http://127.0.0.1:54444",false);
          xmlhttp.send("detect form 0");
    }

   function detect_change()
   {
        console.log("detect_change");
        var canvas = document.getElementById("main_canvas");
        var ctx = canvas.getContext('2d');
        arraydata = ctx.getImageData(0,0,990,500).data;

        change_data = new Array();
        for(var i=0; i<arraydata.length; i++)
        {
            if(arraydata[i] != original_data[i])
            {
                change_data.push(i,arraydata[i])
            }
        }

        if(change_data.length > 0)
        {
            is_change = true;
        }else{
            is_change = false;
        }

        original_data = new Uint8ClampedArray(arraydata);
   }



   function get_from_another_client()
   {
       var xmlhttp;
       xmlhttp=new XMLHttpRequest();

       xmlhttp.onreadystatechange=function()
       {
            if(xmlhttp.responseText.length>100)
            {
                var return_data_array = xmlhttp.responseText.split(",");
                for(var i=0; i<return_data_array.length; i+=2)
                {
                    original_data[return_data_array[i]] = return_data_array[i+1];
                }

                var mycanvas = document.getElementById("main_canvas");
            
                var imagedata =  new ImageData(original_data , dd.width,dd.height);

                mycanvas.getContext('2d').putImageData(imagedata,0,0);
                // document.getElementById("myDiv").innerHTML = "success";                
                console.log("success")
            }
       };

       xmlhttp.open("POST","http://127.0.0.1:54444",false);
       xmlhttp.send("get_from_another_client");
   }

   function start()
    {
        window.setInterval(get, 1000);
    }

    function change()
    {
        // var canvas = document.getElementsByTagName('canvas');
        
        ctx = main_canvas.getContext('2d');
        dd = ctx.getImageData(0,0,990,500);
        var mycanvas = document.getElementById("mycanvas");
        
        for(var i=0; i<dd.data.length; i++)
        {
            if(dd.data[i] != original_data[i])
            {
                original_data[i] = dd.data[i];
            }
        }

        var imagedata =  new ImageData(original_data , dd.width,dd.height);

        mycanvas.getContext('2d').putImageData(imagedata,0,0);
        console.log('change');
    }
    function get()
    {
        var canvas = document.getElementsByTagName('canvas');
        ctx = main_canvas.getContext('2d');
        arraydata = ctx.getImageData(0,0,990,500).data;


        var xmlhttp;
        xmlhttp=new XMLHttpRequest();
         
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                var return_data_array = xmlhttp.responseText.split(",");
                for(var i=0; i<return_data_array.length; i+=2)
                {
                    original_data[return_data_array[i]] = return_data_array[i+1];
                }

                var mycanvas = document.getElementById("main_canvas");
            
                var imagedata =  new ImageData(original_data , dd.width,dd.height);

                mycanvas.getContext('2d').putImageData(imagedata,0,0);
                document.getElementById("myDiv").innerHTML = "success";
            }
        }
         
          xmlhttp.open("POST","http://127.0.0.1:54444",false);
          xmlhttp.send("get");
      
    }