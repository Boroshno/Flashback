(function () {
var AddFlashBackController = function ($scope) {
    $scope.img1 = "";
    $scope.img2 = "";
    $scope.obj = {};
    $scope.existingFlowObject = {};
    $scope.someHandlerMethod = function (file, event, flow) {
        alert('s');
    };
}
// The $inject property of every controller (and pretty much every other type of object in Angular) needs to be a string array equal to the controllers arguments, only as strings
AddFlashBackController.$inject = ['$scope'];


var app = angular.module('MyApp', ['flow']);

app.controller('AddFlashBackController', AddFlashBackController);
})();