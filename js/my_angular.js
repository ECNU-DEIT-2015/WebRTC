var not_active = 'list-group-item';
var active = 'list-group-item active';

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
            // scope: {},当你写上该属性时，就表示这个directive不会从它的controller里继承$scope对象，而是会重新创建一个。
            // scope:{
            //     'add_image' : '@',
            //     'image_url' : ""
            // },
            link: function (scope, element, attributes) {
                scope.$watch('add_image', function(newValue, oldValue){
                    if(newValue ==  oldValue){
                        return;
                    }
                    var canvas = angular.element(document.getElementsByTagName("canvas")[0]);
                    var img = document.createElement("IMG");
                    img.src = scope.image_url;
                    console.log("add_image detected by drawcanvas link function");
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img,0,0);
                    console.log(canvas[0]);
                });
            }
        }
    });

    // app.directive("drawcanvas", function () {
    //     return {
    //         templateUrl: 'canvas.html',
    //         replace: true,
    //         restrict: 'AE'
    //     }
        
    //     // return {
    //     //     templateUrl: 'canvas.html',
    //     //     replace: true ,
    //     //     restrict: 'AE',
    //     //     scope: {
    //     //         add_image: false,
    //     //         image_url: ""
    //     //     },
    //     //     link: function (scope, element, attributes) {
    //     //         scope.$watch('add_image', function(newValue, oldValue){
    //     //             var canvas = angular.element(document.getElementsByTagName("canvas")[0]);
    //     //             var img = document.createElement("IMG");
    //     //             img.src = scope.image_url;
    //     //             var ctx = canvas.getContext('2d');
    //     //             ctx.drawImage(img,0,0);
    //     //         });
    //     //     }
    //     // }
    // });

    app.controller('new_file_controller', function($scope, $http){
        $scope.add_image_ = false;
        $scope.image_url_ = '';


        $scope.empty_canvas = []

        $scope.old_search_file = []
        $scope.lasted_old_file = [{"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/1.png"},
        {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/2.png"},
        {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/3.png"}];
        $scope.$watch('old_search_value', function(newValue,oldValue){
            if (newValue === oldValue) {
                return;
           }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
               $scope.old_search_file.push({'h':'ze','p':'be honest','img':'../images/u_03.png'});
           }else{
               $scope.old_search_file.pop()
           }
        },true);

        $scope.friends = [];
        $scope.lasted_friend = [{'name':'wu','qianming':'be honest','profile':'../images/u_01.png'},
        {'name':'qing','qianming':'be honest','profile':'../images/u_02.png'},
        {'name':'ze','qianming':'be honest','profile':'../images/u_03.png'}];
        $scope.$watch('friend_search_value', function(newValue, oldValue){
            if (newValue === oldValue) {
                return;
           }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
               $scope.friends.push({'name':'ze','qianming':'be honest','profile':'../images/u_03.png'});
           }else{
               $scope.friends.pop()
           }
        },true);


        $scope.bin_search_file = [];
        $scope.lasted_bin_file = [{"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/1.png"},
        {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/2.png"},
        {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/3.png"}];
        $scope.$watch('bin_search_value', function(newValue, oldValue){
            if (newValue === oldValue) {
                return;
           }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
               $scope.bin_search_file.push({"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/3.png"});
           }else{
               $scope.bin_search_file.pop()
           }
        },true);


        all_hide_true($scope);
        $scope.empty_panel_click = function(){

            all_hide_true($scope);
            $scope.empty_panel_hide = false;
            $scope.empty_class = active;
            $scope.empty_canvas = [1];
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
            
            $scope.empty_canvas = [];

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
                // console.log("iamge_canvas_click");
                // $scope.image_select_hide = true;
                // $scope.image_canvas = false;
                // window.setTimeout(add_canvas,250);
                // $scope.add_image_ = true;
                // $scope.image_url_ = $scope.image_file;
                // console.log(document.getElementsByTagName('canvas').length);
                
                
                $scope.image_select_hide = true;
                $scope.image_canvas = false;
                window.setTimeout(add_canvas,250);
                window.setTimeout(function(){
                    var img = document.createElement('IMG');
                    img.src = $scope.image_file;
                    // console.log(img.src);
                    // var i = angular.element(document.getElementById("wuqingze"));
                    // console.log(i.attr("placeholder"));
                    // var canvas = angular.element(document.getElementsByTagName('canvas'))[0];
                    // console.log(angular.element(document.getElementById("hidden_input")).name);
                    // console.log("con1 width:",$('.con1').width());
                    // console.log("hidden input name",$("#hidden_input").name);
                    // $("p").hide();
                    // console.log($("canvas").length);
                    // console.log($("canvas:first").width());
                    // console.log($("canvas:first").get(0).getContext('2d'));
                    // var canvas = document.getElementById("")
                    // console.log('canvas length is: ',canvas.length);
                    // console.log(canvas.getContext('2d'));
                    // canvas.id = "jjjj";
                    // var ctx = canvas.getContext('2d');
                    window.setTimeout(function(){
                        $("canvas:first").get(0).getContext('2d').drawImage(img,0,0);
                    },500);
                    // ctx.drawImage(img,0,0);
                    console.log("draw successfully");
                    // console.log(ctx);
                    // // canvas.attr(getContext('2d')).attr(drawImage)(img,0,0);
                    // // console.log($scope.image_file);
                    console.log($("canvas:first").get(0).getContext('2d').getImageData(0,0,990,500).data);
                    $scope.image_file = undefined;
                    $scope.$apply();
                },500);
               
            }
            
        };
    });

    app.controller('navigator_controller', function($scope, $http) {
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
        $scope.lasted_friend = [{'name':'wu','qianming':'be honest','profile':'../images/u_01.png'},
            {'name':'qing','qianming':'be honest','profile':'../images/u_02.png'},
            {'name':'ze','qianming':'be honest','profile':'../images/u_03.png'}];
       
        $scope.search_friend = [];
        console.log("add_friend_constroller");
        $scope.$watch('friend_id', function(newValue,oldValue){
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
        $scope.lasted_personal_file = [{"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/1.png"},
                                       {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/2.png"},
                                       {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/3.png"}];

        $scope.search_file = [];
        $scope.$watch('search_value', function(newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
                $scope.search_file.push({"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/1.png"});
            }else{
                $scope.search_file.pop()
            }
        }, true);
    });

    app.controller('cooperation_file_controller', function($http,$scope){
        $scope.lasted_cooperation_file = [{"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/1.png"},
        {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/2.png"},
        {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/3.png"}];

        $scope.search_file = [];
        $scope.$watch('search_value', function(newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
                $scope.search_file.push({"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/1.png"});
            }else{
                $scope.search_file.pop()
            }
        }, true);
    });

    app.controller('bin_controller', function($http,$scope){
        $scope.lasted_bin_file = [{"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/1.png"},
        {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/2.png"},
        {"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/3.png"}];

        $scope.search_file = [];
        $scope.$watch('search_value', function(newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }else if((newValue.length==1 && oldValue==undefined) || (newValue.length > oldValue.length)){
                $scope.search_file.push({"h":"老年","p":"架飞机阿咖酚散放辣椒发了卡机发","img":"../images/1.png"});
            }else{
                $scope.search_file.pop()
            }
        }, true);
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
