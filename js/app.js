/*global angular*/

var app = angular.module("event_locator", []);

app.controller('mainController', ['$scope', function ($scope) {
    "use strict";
    $scope.title = 'Events close to your loaction:';
    $scope.events = closeFive;
}]);
