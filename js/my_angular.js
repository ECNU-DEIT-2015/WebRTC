
var not_active = 'list-group-item';
var active = 'list-group-item active';
var tempimage = '';



function all_hide_true(scope){
    scope.empty_panel_hide = true;
    scope.old_file_panel_hide = true;
    scope.image_panel_hide = true;
    scope.friend_panel_hide = true;
    scope.bin_panel_hide = true;

    scope.empty_class = not_active;
    scope.old_class = not_active;
    scope.image_class = not_active;
    scope.friend_class = not_active;
    scope.bin_class = not_active;
}

function load_angular(){
    var app = angular.module('shouye_app', []);
    app.directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);


    app.directive('drawcanvas', function(){
        return {
            templateUrl: 'canvas.html',
            replace: true,
            restrict: 'AE',
        }
    });

    app.directive('filebox', function(){
        return {
            templateUrl: 'file_box.html',
            replace: true,
            restrict: 'AE',
        }
    });

    app.directive('binbox', function(){
        return {
            templateUrl: 'bin_box.html',
            replace: true,
            restrict: 'AE',
        }
    });

    app.directive('friendbox', function(){
        return {
            templateUrl: 'friend_box.html',
            replace: true,
            restrict: 'AE',
        }
    });

    app.directive('callfriend', function(){
        return {
            templateUrl: 'call_friend.html',
            replace: true,
            restrict: 'AE',
        }
    });

    app.controller('new_file_controller', function($scope, $http){
        $scope.add_image_ = false;
        $scope.image_url_ = '';
        $scope.image_canvas = [];
        $scope.file_box_canvas = []; //希望从file box的点击编辑调到编辑界面

        $scope.empty_canvas = []


        all_hide_true($scope);
        $scope.empty_panel_click = function(){

            all_hide_true($scope);
            $scope.empty_panel_hide = false;
            $scope.empty_class = active;
            $scope.empty_canvas = [1];
            $scope.image_canvas = []; //将image的canvas删除
            $scope.image_select_hide = false; //将image的选文件恢复
            if($scope.empty_canvas.length == 1){
                window.setTimeout(add_canvas,250);
            }
            // window.setTimeout(add_canvas,1000);
            // add_canvas();    
        };

        $scope.old_panel_click = function(){
            all_hide_true($scope);
            $scope.empty_canvas = [];
            $scope.old_class = active;
            $scope.old_file_panel_hide = false;
        };

        $scope.image_panel_click = function(){
            
            $scope.empty_canvas = []; //将empty panel的canvas删除

            all_hide_true($scope);
            $scope.image_class = active;
            $scope.image_panel_hide = false;
        }

        $scope.friend_panel_click = function(){
            $scope.empty_canvas = [];

            all_hide_true($scope);
            $scope.friend_class = active;
            $scope.friend_panel_hide = false;
        }

        $scope.bin_panel_click = function(){
            $scope.empty_canvas = [];

            all_hide_true($scope);
            $scope.bin_class = active;
            $scope.bin_panel_hide = false;
        }

        $scope.image_canvas_click = function(){
            console.log("image_canvas_click----------");
            if($scope.image_file != undefined){
                $scope.empty_canvas = [];
                $scope.image_select_hide = true;
                $scope.image_canvas = [1];
                window.setTimeout(add_canvas,200);
                window.setTimeout(function(){
                    var img = document.createElement('IMG');
                    img.src = $scope.image_file;
                    window.setTimeout(function(){
                        $("canvas:first").get(0).getContext('2d').drawImage(img,0,0);
                    },200);
                    console.log("draw successfully");
                    $scope.image_file = undefined;
                    $scope.$apply();
                },100);
               
            }
            
        };

        $scope.save_canvas_file = function(){
            
        }
    });

    app.controller('navigator_controller', function($scope, $http) {

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
    
    app.controller('add_friend_controller', function($http,$scope){
        socket.on("friend_file", function(msg){
            console.log('friend message',msg);
            $scope.lasted_friend = msg;    
            $scope.$apply();
        });
        socket.emit("friend_file", {"cookie":document.cookie});

        // $scope.lasted_friend = [{'name':'wu','qianming':'be honest','profile':'../images/u_01.png'},
        //     {'name':'qing','qianming':'be honest','profile':'../images/u_02.png'},
        //     {'name':'ze','qianming':'be honest','profile':'../images/u_03.png'}];
       
        $scope.search_friend = [];
        console.log("add_friend_constroller");
        $scope.$watch('search_value', function(newValue,oldValue){
            if (newValue === oldValue) {
                return;
           }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
               $scope.search_friend.push({'name':'ze','qianming':'be honest','profile':'../images/u_03.png'});
           }else{
               $scope.search_friend.pop()
           }
        },true);

    });

    app.controller('personal_file_controller', function($http,$scope){
        // $scope.lasted_personal_file = [{"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/1.png"},
        //                                {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/2.png"},
        //                                {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/3.png"}];

        // $scope.search_file = [];
        // $scope.$watch('search_value', function(newValue, oldValue) {
        //     if (newValue === oldValue) {
        //         return;
        //     }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
        //         $scope.search_file.push({"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/1.png"});
        //     }else{
        //         $scope.search_file.pop()
        //     }
        // }, true);
        $scope.lasted_file = [];
        $scope.labels = [1,2,3,4];
        $scope.search_file = [];
        socket.on("personal_file", function(msg){
            // console.log('personal file form mysql',msg);
            // 将labels转成数组
            for(var i=0; i<msg.length; i++){
                console.log(msg[i]['labels'].toString().split(" "));
                var labels = msg[i]['labels'].split(' ');
                msg[i]['labels'] = labels;
                console.log(labels);
            }
            
            $scope.lasted_file = msg;    
            // console.log(msg[0][''])
            // $scope.labels = msg[0]['labels'].split(' ');
            console.log('personal file form mysql',msg);
            $scope.$apply();
        });
        socket.emit("personal_file", {"cookie": document.cookie});
        
        // $scope.lasted_file = [{"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/1.png"},
        // {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/2.png"},
        // {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/3.png"}];
        $scope.$watch('search_value', function(newValue,oldValue){
            if (newValue === oldValue) {
                return;
           }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
               $scope.search_file.push({"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/3.png"});
           }else{
               $scope.search_file.pop()
           }
        },true);

        // $scope.modify_image = function(){
        //     console.log("modify_image");
        //     $scope.$parent.file_box_canvas = [1];
        //     window.setTimeout(add_canvas,250);
        // };

    });

    app.controller('cooperation_file_controller', function($http,$scope){
        // $scope.lasted_cooperation_file = [{"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/1.png"},
        // {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/2.png"},
        // {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/3.png"}];

        // $scope.search_file = [];
        // $scope.$watch('search_value', function(newValue, oldValue) {
        //     if (newValue === oldValue) {
        //         return;
        //     }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
        //         $scope.search_file.push({"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/1.png"});
        //     }else{
        //         $scope.search_file.pop()
        //     }
        // }, true);

        // $scope.labels = [1,2,3,4];
        $scope.search_file = []
        socket.on("cooperation_file", function(msg){
            for(var i=0; i<msg.length; i++){
                console.log(msg[i]['labels'].toString().split(" "));
                var labels = msg[i]['labels'].split(' ');
                msg[i]['labels'] = labels;
                console.log(labels);
            }
            $scope.lasted_file = msg;    
            $scope.$apply();
        });
        socket.emit("cooperation_file", {"cookie":document.cookie});
        // $scope.lasted_file = [{"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/1.png"},
        // {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/2.png"},
        // {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/3.png"}];
        $scope.$watch('search_value', function(newValue,oldValue){
            if (newValue === oldValue) {
                return;
           }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
               $scope.search_file.push({"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/3.png"});
           }else{
               $scope.search_file.pop()
           }
        },true);

        // $scope.modify_image = function(){
        //     console.log("modify_image");
        //     $scope.$parent.file_box_canvas = [1];
        //     window.setTimeout(add_canvas,250);
        // };
    });

    app.controller('bin_controller', function($http,$scope){
        $scope.labels = [1,2,3,4];
        $scope.search_file = []

        socket.on("bin_file", function(msg){
            for(var i=0; i<msg.length; i++){
                console.log(msg[i]['labels'].toString().split(" "));
                console.log("bin_controller");
                var labels = msg[i]['labels'].split(' ');
                msg[i]['labels'] = labels;
                console.log(labels);
            }
            $scope.lasted_file = msg;    
            $scope.$apply();
        });
        socket.emit("bin_file", {"cookie":document.cookie});

        // $scope.lasted_file = [{"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/1.png"},
        // {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/2.png"},
        // {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/3.png"}];
        $scope.$watch('search_value', function(newValue,oldValue){
            if (newValue === oldValue) {
                return;
           }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
               $scope.search_file.push({"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/3.png"});
           }else{
               $scope.search_file.pop()
           }
        },true);
    });

    app.controller('old_file_controller', function($http, $scope){
        $scope.labels = [1,2,3,4];
        $scope.search_file = []
        $scope.lasted_file = [{"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/1.png"},
        {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/2.png"},
        {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/3.png"}];
        $scope.$watch('search_value', function(newValue,oldValue){
            if (newValue === oldValue) {
                return;
           }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
               $scope.search_file.push({"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/3.png"});
           }else{
               $scope.search_file.pop()
           }
        },true);

        // $scope.modify_image = function(){
        //     console.log("modify_image");
        //     $scope.$parent.file_box_canvas = [1];
        //     window.setTimeout(add_canvas,250);
        // };
    });

    app.controller('new_file_bin_controller', function($http, $scope){
        $scope.labels = [1,2,3,4];
        $scope.search_file = [];
        socket.on("new_bin_file", function(msg){
            for(var i=0; i<msg.length; i++){
                var labels = msg[i]['labels'].split(' ');
                msg[i]['labels'] = labels;
                console.log(labels);
            }
            $scope.lasted_file = msg;   
            console.log('new_file_bin_controller',msg);
            $scope.$apply();
        });
        socket.emit("new_bin_file", {"cookie":document.cookie});

        $scope.lasted_file = [{"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/1.png"},
        {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/2.png"},
        {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/3.png"}];
        $scope.$watch('search_value', function(newValue,oldValue){
            if (newValue === oldValue) {
                return;
           }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
               $scope.search_file.push({"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/3.png"});
           }else{
               $scope.search_file.pop()
           }
        },true);
    });

    app.controller('friend_controller', function($http, $scope){


        socket.on("friend_file", function(msg){
            console.log('friend message',msg);
            $scope.lasted_friend = msg;    
            $scope.$apply();
        });
        socket.emit("friend_file", {"cookie":document.cookie});

        // $scope.lasted_friend = [{'name':'wu','qianming':'be honest','profile':'../images/u_01.png'},
        //     {'name':'qing','qianming':'be honest','profile':'../images/u_02.png'},
        //     {'name':'ze','qianming':'be honest','profile':'../images/u_03.png'}];
       
        $scope.search_friend = [];
        console.log("add_friend_constroller");
        $scope.$watch('search_value', function(newValue,oldValue){
            if (newValue === oldValue) {
                return;
           }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
               $scope.search_friend.push({'name':'ze','qianming':'be honest','imageurl':'../images/u_03.png'});
           }else{
               $scope.search_friend.pop()
           }
        },true);
    });
   
    //测试filebox controller
    // app.controller("file_box_controller", function($http,$scope){
    //     $scope.labels = [1,2,3,4];
    //     $scope.search_file = []
    //     $scope.lasted_file = [{"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/1.png"},
    //     {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/2.png"},
    //     {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/3.png"}];
    //     $scope.$watch('old_search_value', function(newValue,oldValue){
    //         if (newValue === oldValue) {
    //             return;
    //        }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
    //            $scope.old_search_file.push({'h':'ze','p':'be honest','img':'../images/u_03.png'});
    //        }else{
    //            $scope.old_search_file.pop()
    //        }
    //     },true);

    //     $scope.modify_image = function(){
    //         console.log("modify_image");
    //         $scope.$parent.file_box_canvas = [1];
    //         window.setTimeout(add_canvas,250);
    //     };
    // });

    app.controller("file_box_controller_01", function($http,$scope){
        $scope.labels = [1,2,3,4,9];
        $scope.search_file = []
        $scope.lasted_file = [{"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/1.png"},
        {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/2.png"},
        {"headline":"老年","introduction":"架飞机阿咖酚散放辣椒发了卡机发","image":"../images/3.png"}];
        $scope.$watch('old_search_value', function(newValue,oldValue){
            if (newValue === oldValue) {
                return;
           }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
               $scope.old_search_file.push({'h':'ze','p':'be honest','img':'../images/u_03.png'});
           }else{
               $scope.old_search_file.pop()
           }
        },true);

        $scope.modify_image = function(){
            console.log("modify_image");
            $scope.file_box_canvas = [1];
        }
    });
    
    app.controller("main_controller", function($http,$scope){
        $scope.temp_image = "";

        $scope.main_show = true;
        $scope.temp_panel_show = false;
        $scope.imagepath = '';
        $scope.modify_image = function(imgsrc){
            console.log("modify_image");
            $scope.temp_image = imgsrc;
            // console.log("imgsrc", imgsrc[1].src);
            $scope.imagepath = imgsrc;
            $scope.main_show = false;
            $scope.temp_panel_show = true;
            $scope.empty_canvas = [];
            $scope.image_canvas = [];
            $scope.temp_canvas = [1];
            $scope.temp_save = true;
            var img = document.createElement('IMG');
            img.src = imgsrc;
            window.setTimeout(add_canvas,250);
            window.setTimeout(function(){
                $("canvas:first").get(0).getContext('2d').drawImage(img,0,0);
                $("#save_file_model").get(0).id = "xxx";
                // $(".save")[0].data-toggle = "";
                // $(".save")[0].data-target = "";
                // var modal = $("#save_file_model");
                // modal.parentNode.removeChild(modal);
                // var modal1 = $(".modal-dialog");
                // for(var i=0;i<modal1.length; i++){
                //     modal1[i].parentNode.removeChild(modal1[i]);
                // }
            },300);
        };

        $scope.return_main_panel = function(){
            $("img").each(function(){
                if($(this).attr("id") == $scope.temp_image){
                    $(this).attr("src", $scope.temp_image+"?rnd="+Math.random().toString());
                }
            });
            console.log("return main panel");
            $scope.main_show = true;
            $scope.temp_panel_show = false;
            $scope.empty_canvas = [];
            $scope.image_canvas = [];
            $scope.temp_canvas = [];
            $scope.temp_save = false;
        };

        $scope.save_canvas_file = function(){
            socket.emit("modify_image",{"imagepath":$scope.imagepath,"imagedata":$("canvas:first").get(0).toDataURL()});
            socket.on("modify_image", function(msg){
                if(msg['result'] == true){
                    alert("更新图片成功！");
                }else{
                    alert("更新图片失败");
                }
            });
            console.log("save canvas file temp panel~~~~~~~~");
        };

        $scope.delete_file_bin = function(image){
            // ../images/nongxiaolang@foxmail.com/personal_file/3.png
            // delete_button.hidden = true;
            // $($event.target).addClass("checked");  
            // console.log("delete");
            // alert("delete");
            var table = image.split("/")[image.split("/").length-2];
            socket.emit("delete_file_bin",{"table":table,"image":image,"cookie":document.cookie});
            socket.on("delete_file_bin", function(msg){
                if(msg["result"] == true){
                    socket.emit("personal_file", {"cookie": document.cookie});
                    socket.emit("cooperation_file", {"cookie":document.cookie});
                    socket.emit("bin_file", {"cookie":document.cookie});
                    alert("删除成功！");
                }else{
                    alert("删除失败！");
                }
            });
            
        };

        $scope.recover = function(image){
            var table = image.split("/")[image.split("/").length-2];
            socket.emit("recover",{"table":table,"image":image,"cookie":document.cookie});
            socket.on("recover", function(msg){
                if(msg['result']=true){
                    socket.emit("bin_file", {"cookie":document.cookie});
                    socket.emit("personal_file", {"cookie": document.cookie});
                    socket.emit("cooperation_file", {"cookie":document.cookie});
                    alert("恢复成功");
                }else{
                    alert("恢复失败");
                }
            });
        }

        $scope.totally_delete = function(image){
            socket.emit("totally_delete",{"image":image,"cookie":document.cookie});
            socket.on("totally_delete", function(msg){
                if(msg["result"] == true){
                    socket.emit("bin_file", {"cookie":document.cookie});
                    alert("删除成功！");
                    // window.setTimeout(function(){alert("删除成功！");},1000); 
                }else{
                    alert("删除失败！");
                }
            });
        }

        $scope.search_friend = function(image){
            tempimage = image;
        };
        // $scope.call_friend = function(image){
        //     // window.location.href = "/web/draw.html";
        //     // socket.emit("call_friend", {"image":image,"cookie":document.cookie});
        // }
    });

    app.controller("call_friend_controller", function($http, $scope){
        $scope.friends = [];
        // $scope.image = '';
        socket.on("search_friend", function(msg){
            if(msg['result']){
                $scope.friends = msg['friends'];
                $scope.$apply();
            }
        });
        $scope.$watch('friend', function(newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }else{
                socket.emit("search_friend",{"cookie":document.cookie,"friend":newValue});
            }
        }, true);

        // $scope.search_friend = function(image){
        //     $scope.image = imtage;
        // };

        $scope.call_friend = function(email){
            // console.log("call friend image", tempimage);
            socket.emit("call_friend", {"image":tempimage,"cookie":document.cookie,"email":email});
            socket.emit("send_message",{'email':email,"cookie":document.cookie,"image":tempimage});
            window.location.href = "/web/draw.html";
            
        }
    });

    app.controller("empty_file_controller", function($http, $scope){
        $scope.save_empty_file = function(){
            console.log("save empty file",$scope.introduction);
            var canvas = $("canvas:first").get(0);
            // console.log(canvas.toDataURL());
            socket.emit('save_empty_file',{"introduction":$scope.introduction,"headline":$scope.headline,"cookie":document.cookie,"imgData":canvas.toDataURL(),"labels":$scope.labels});
            console.log("introduction",$scope.introduction);
            console.log("headline",$scope.headline);
            console.log("labels",$scope.labels);
            socket.on("save_empty_file", function(msg){
                if(msg['result'] == true){ alert("新文件保存成功")}
            });
        }
    });


    app.controller("save_image_file_controller", function($http, $scope){
        $scope.save_empty_file = function(){
            var canvas = $("canvas:first").get(0);
            // console.log(canvas.toDataURL());
            socket.emit('save_empty_file',{"introduction":$scope.introduction,"headline":$scope.headline,"cookie":document.cookie,"imgData":canvas.toDataURL(),"labels":$scope.labels});
            console.log("introduction",$scope.introduction);
            console.log("headline",$scope.headline);
            console.log("labels",$scope.labels);
            socket.on("save_empty_file", function(msg){
                if(msg['result'] == true){ alert("新文件保存成功")}
            });
        };
    });
}


function set_other_not_active(node){
    var children = node.parentNode.childNodes;
    for(var i=0; i<children.length; i++){
        try{
            var name = children[i].className;
            name = name.split("active")[0].trim();
            children[i].className = name;
        }catch(e){
        }
    }
}

function remove_all_child(parent_node){
    var child_nodes = parent_node.childNodes;
    for(var i=child_nodes.length-1; i>=0; i--){
        parent_node.removeChild(child_nodes[i]);
    }
}
