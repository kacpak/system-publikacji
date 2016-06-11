'use strict';
(function (angular) {
    var app = angular.module('app', []);
    app.controller('pageCtrl', function () {
       var ctrl = this;

        ctrl.hello = 'Hello visitor!';
    });
})(window.angular);
