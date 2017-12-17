var app = angular.module('navigator_app', []);
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