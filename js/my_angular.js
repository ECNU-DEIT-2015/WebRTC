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
    app.controller('new_file_controller', function($scope, $http){

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


        all_hide_true($scope);

        $scope.empty_panel_click = function(){
            all_hide_true($scope);
            $scope.empty_panel_hide = false;
            $scope.empty_class = active;
            add_canvas();
        };

        $scope.old_panel_click = function(){
            all_hide_true($scope);
            $scope.old_class = active;
            $scope.old_file_panel_hide = false;
        };

        $scope.image_panel_click = function(){
            all_hide_true($scope);
            $scope.image_class = active;
            $scope.image_panel_hide = false;
        }

        $scope.friend_panel_click = function(){
            all_hide_true($scope);
            $scope.friend_class = active;
            $scope.friend_panel_hide = false;
        }

        $scope.bin_panel_click = function(){
            all_hide_true($scope);
            $scope.bin_class = active;
            $scope.bin_panel_hide = false;
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
