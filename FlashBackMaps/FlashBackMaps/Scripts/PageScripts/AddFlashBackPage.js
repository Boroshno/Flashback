(function () {
var AddFlashBackController = function ($scope) {
    $scope.img1 = "";
    $scope.img2 = "";
    $scope.LonLat = {};
    $scope.obj = {};
    $scope.existingFlowObject = {};
    $scope.FirstPhotoAdded = function (file, event, flow) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            var uri = event.target.result;
            $scope.img1 = uri;
            if ($scope.img1 != "" && $scope.img2 != "")
                imageSlider($('.cd-image-container'), false, false, false);
        };
        fileReader.readAsDataURL(file.file);
    };
    $scope.SecondPhotoAdded = function (file, event, flow) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            var uri = event.target.result;
            $scope.img2 = uri;
            if ($scope.img1 != "" && $scope.img2 != "")
                imageSlider($('.cd-image-container'), false, false, false);
        };
        fileReader.readAsDataURL(file.file);
    };
    $scope.update = function (s) {
        alert(s);
    };

    //leaflet
    var mymap = L.map('mapid').setView([49.98, 36.23], 10);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    var myIcon = L.icon({
        iconUrl: 'my-icon.png',
        iconRetinaUrl: 'my-icon@2x.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: 'my-icon-shadow.png',
        shadowRetinaUrl: 'my-icon-shadow@2x.png',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });

    var marker = L.marker({ icon: myIcon });

    function onMapClick(e) {
        marker
            .setLatLng(e.latlng)
            .addTo(mymap);
        $scope.LonLat = e.latlng;
    }

    mymap.on('click', onMapClick);
}
// The $inject property of every controller (and pretty much every other type of object in Angular) needs to be a string array equal to the controllers arguments, only as strings
AddFlashBackController.$inject = ['$scope'];


var app = angular.module('MyApp', ['flow']);

app.controller('AddFlashBackController', AddFlashBackController);
})();