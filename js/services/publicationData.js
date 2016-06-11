'use strict';
(function (angular) {
    angular.module('app').factory('publicationData', function ($http) {
        /**
         * It is a demo application, ignoring security concerns
         */
        var data = {
            authorizationKey: 'Basic ZHJvYXJjZXN0ZXJpc3RhcmRzdHJlYXJlOmQ1NDQxY2FmZTc4OWZkMzA1NTY0MWEwYzFmZGFlNjgwZTc3NGUyNDM=',
            hostname: '1000df35-de7b-4fc7-b9b4-e392b56e574b-bluemix.cloudant.com',
            database: 'system-publikacji'
        }
        var endpoint = 'https://' + data.hostname + '/' + data.database;
        $http.defaults.headers.common.Authorization = data.authorizationKey;
        
        function getPublications(successCallback, errorCallback) {
            $http.post(endpoint + '/_find', {
                "selector": {
                    "$not": {
                        "_id": "_design"
                    }
                }
            }).then(
                function success(response) {
                    successCallback(response.data.docs);
                },
                errorCallback
            );
        }

        function getPublication(id, successCallback, errorCallback) {
            $http.get(endpoint + '/' + id).then(
                function success(response) {
                    successCallback(response.data);
                },
                errorCallback
            );
        }

        function addPublication(data, successCallback, errorCallback) {
            $http.post(endpoint, data).then(successCallback, errorCallback);
        }

        function deletePublication(id, rev, successCallback, errorCallback) {
            $http.delete(endpoint + '/' + id + '?rev=' + rev).then(successCallback, errorCallback);
        }

        function updatePublication(id, data, successCallback, errorCallback) {
            $http.put(endpoint + '/' + id, data).then(successCallback, errorCallback);
        }

        return {
            getPublications: getPublications,
            getPublication: getPublication,
            addPublication: addPublication,
            deletePublication: deletePublication,
            updatePublication: updatePublication
        };
    });
})(window.angular);