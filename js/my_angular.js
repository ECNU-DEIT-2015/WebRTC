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
    
    console.log("add_friend_constroller");
    app.controller('add_friend_controller', function($http,$scope){
        $scope.lasted_friend = [{'name':'wu','qianming':'be honest','profile':'../images/u_01.png'},
            {'name':'qing','qianming':'be honest','profile':'../images/u_02.png'},
            {'name':'ze','qianming':'be honest','profile':'../images/u_03.png'}];
        $scope.search_friend = [];
        console.log("add_friend_constroller");
    });
}

