function load_angular(){
    var app = angular.module('shouye_app', []);
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
            {'name':'ze','qianming':'be honest','profile':'../images/u_03.png'},
            {'name':'ze','qianming':'be honest','profile':'../images/u_03.png'}];
        for(var i=0; i<4; i++){
            $scope.lasted_friend.push({'name':'ze','qianming':'be honest','profile':'../images/u_03.png'});
        }
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

