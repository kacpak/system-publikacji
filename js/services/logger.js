'use strict';
(function (angular) {
    angular.module('app').factory('logger', function ($log) {

        function stringify(object) {
            return JSON.stringify(object, null, 2);
        }

        return {
            log: function (msg) {
                $log.log(stringify(msg));
            },
            warn: function (msg) {
                $log.warn(stringify(msg));
            },
            info: function (msg) {
                $log.info(stringify(msg));
            },
            error: function (msg) {
                $log.error(stringify(msg));
            },
            debug: function (msg) {
                $log.debug(stringify(msg));
            }
        };
    });
})(window.angular);