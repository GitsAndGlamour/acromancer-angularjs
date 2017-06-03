angular.module('util')
    .filter('base64Encode', function () {
        return function (string) {
            return btoa(unescape(encodeURIComponent(string)));
        };
    })
    .filter('base64Decode', function () {
        return function (string) {
            string = string.replace(/\s/g, '');
            return decodeURIComponent(escape(atob(string)));
        };
    });
