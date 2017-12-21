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

    app.controller('new_file_controller', function($scope, $http){
        $scope.add_image_ = false;
        $scope.image_url_ = '';
        $scope.image_canvas = [];
        $scope.file_box_canvas = []; //希望从file box的点击编辑调到编辑界面

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
                $scope.empty_canvas = [];
                $scope.image_select_hide = true;
                $scope.image_canvas = [1];
                window.setTimeout(add_canvas,100);
                window.setTimeout(function(){
                    var img = document.createElement('IMG');
                    img.src = $scope.image_file;
                    window.setTimeout(function(){
                        $("canvas:first").get(0).getContext('2d').drawImage(img,0,0);
                    },100);
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

        $scope.modify_image = function(){
            console.log("modify_image");
            $scope.$parent.file_box_canvas = [1];
            window.setTimeout(add_canvas,250);
        };

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

        $scope.modify_image = function(){
            console.log("modify_image");
            $scope.$parent.file_box_canvas = [1];
            window.setTimeout(add_canvas,250);
        };
    });

    app.controller('bin_controller', function($http,$scope){
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

        $scope.modify_image = function(){
            console.log("modify_image");
            $scope.$parent.file_box_canvas = [1];
            window.setTimeout(add_canvas,250);
        };
    });

    app.controller('new_file_bin_controller', function($http, $scope){
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
    });


    //测试filebox controller
    app.controller("file_box_controller", function($http,$scope){
        $scope.labels = [1,2,3,4];
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
            $scope.$parent.file_box_canvas = [1];
            window.setTimeout(add_canvas,250);
        };
    });

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
