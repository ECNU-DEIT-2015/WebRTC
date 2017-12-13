import "dart:html";

void main(){
  var video_button = querySelector("#only_video");
  video_button.onClick.listen((event){
   only_video();
  });
  var mini_video_button = querySelector("#mini_video");
  mini_video_button.onClick.listen((even){
    mini_video();
  });

  document.getElementById("recover").onClick.listen((even){
    // var body = document.getElementsByTagName("body")[0];
    // recover_all(body);
    document.getElementById("draw_panel").hidden = false;
    document.getElementById("navigator_div").hidden = false;
  });


}

void recover_all(parent){
  if(parent.childNodes.length == 1){
    print(parent.hidden);
    parent.hidden = false;
    return;
  }else{
    var children = parent.childNodes;
    for(var i=0; i<children.length; i++){
      recover_all(children[i]);
    }
  }
}

void only_video(){
   document.getElementById("draw_panel").hidden = true;
    document.getElementById("navigator_div").hidden = true;
    // var divs = document.getElementsByTagName("div");
    // // for(var i=0; i<divs.length; i++){
    //   if(divs[i].id.contains("video") == false){
    //   divs[i].hidden = "true";
    //   }
    // }
    // document.getElementById("remoteVideo").hidden = false;
    // document.getElementById("localVideo").hidden = false;
    var videowidth = window.innerWidth;
    var videoheight = window.innerHeight;
    document.getElementById("remoteVideo").style.position = "absolute";
    document.getElementById("localVideo").style.position = "absolute";
    
    document.getElementById("remoteVideo").style.width = videowidth.toString()+"px";
    document.getElementById("remoteVideo").style.height = videoheight.toString()+"px";
    document.getElementById("remoteVideo").style.top = "0px";
    document.getElementById("remoteVideo").style.left = "0px";
    document.getElementById("remoteVideo").style.zIndex = "-1";
    // document.getElementById("remoteVideo").style.width = "1000px";
    // document.getElementById("remoteVideo").style.height = "500px";
    // document.getElementById("remote_video_div").style.position = "relative";
    // document.getElementById("remote_video_div").style.left = "0px";
    // document.getElementById("remote_video_div").style.top = "0px";
    // document.getElementById("local_video_div").style.position = "relative";
    // document.getElementById("local_video_div").style.left = (videowidth/12*7).toString()+"px";
    // document.getElementById("local_video_div").style.top = (-videoheight/3).toString()+"px";
    document.getElementById("localVideo").style.width = "300px";
    document.getElementById("localVideo").style.height = "175px";
    // document.getElementById("only_video").style.position = "relative";
    // document.getElementById("only_video").style.left = (videowidth).toString()+"px";
    // document.getElementById("only_video").style.top = (-videoheight).toString()+"px";
    // document.getElementById("localVideo").style.top = (-videoheight).toString()+"px";
    document.getElementById("localVideo").style.top = "40px";
    document.getElementById("localVideo").style.left = "30px";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    print("document.body.scrollTop = document.documentElement.scrollTop = 0;");
    // document.getElementById("remoteVideo").style.left = "0px";
    // document.getElementById("remoteVideo").style.top = "0px";
    // // document.getElementById("remoteVideo").style.width = "1000px";
    // document.getElementById("remoteVideo").style.height = "550px";
}

void mini_video(){
  var mini_video_width = window.innerWidth*300/1366;
    var mini_video_height = window.innerHeight*3/7;
    document.getElementById("remoteVideo").style.position = "relative";
    document.getElementById("localVideo").style.position = "relative";

    document.getElementById("remoteVideo").style.top = (-window.innerHeight).toString()+"px";
    document.getElementById("remoteVideo").style.left = (window.innerWidth-mini_video_width).toString()+"px";

    document.getElementById("remoteVideo").style.width = mini_video_width.toString()+"px";
    document.getElementById("remoteVideo").style.height = mini_video_height.toString()+"px";

    
    // document.getElementById("localVideo").style.top = (-window.innerHeight+mini_video_height).toString()+"px";
    // document.getElementById("localVideo").style.left = (window.innerWidth-mini_video_width).toString()+"px";

    // document.getElementById("localVideo").style.width = mini_video_width.toString()+"px";
    // document.getElementById("localVideo").style.height = mini_video_height.toString()+"px";
}