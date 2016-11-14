(function () {
var AddFlashBackController = function ($scope) {
    $scope.img1 = "";
    $scope.img2 = "";
    $scope.obj = {};
    $scope.existingFlowObject = {};
    $scope.someHandlerMethod = function (file, event, flow) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            var uri = event.target.result;
            $scope.img1 = uri;
            imageSlider($('.cd-image-container'), false, false, false);
        };
        fileReader.readAsDataURL(file.file);

    };
}
// The $inject property of every controller (and pretty much every other type of object in Angular) needs to be a string array equal to the controllers arguments, only as strings
AddFlashBackController.$inject = ['$scope'];


var app = angular.module('MyApp', ['flow']);

app.controller('AddFlashBackController', AddFlashBackController);
})();