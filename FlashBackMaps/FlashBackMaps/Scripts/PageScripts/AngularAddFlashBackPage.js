﻿(function () {
var AddFlashBackController = function ($scope) {
    $scope.models = {
        helloAngular: 'I work!'
    };
}
// The $inject property of every controller (and pretty much every other type of object in Angular) needs to be a string array equal to the controllers arguments, only as strings
AddFlashBackController.$inject = ['$scope'];


var app = angular.module('MyApp', ['flow']);

app.controller('AddFlashBackController', AddFlashBackController);
})();