angular.module('util')
    .filter('stringLimit', function () {
        return function (string, limit, tail) {
            if (!string) return '';

            limit = parseInt(limit, 10);
            if (!limit) return string;
            if (string.length <= limit) return string;

            string = string.substr(0, limit);


            return string + (tail || '...');
        };
    }).filter('removeSpaces', function () {
        return function (string) {
            if (!angular.isString(string)) {
                return string;
            }
            return string.replace(/[\s]/g, '');
        };
    });
