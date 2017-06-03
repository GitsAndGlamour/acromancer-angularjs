angular.module('util').filter('abs', function () {
    return function (val) {
        return Math.abs(val);
    };
}).filter('moneyFormat', function () {
    return function (value) {
        var roundVal = Math.round(Number(value));
        var newValue = Math.abs(Number(roundVal)) >= 1.0e+9 ?
            Number(Math.round(Math.abs(Number(roundVal)) / 1.0e+9 + 'e1') + 'e-1') + "B"
            : Math.abs(Number(roundVal)) >= 1.0e+6 ?
                Number(Math.round(Math.abs(Number(roundVal)) / 1.0e+6 + 'e1') + 'e-1') + "M"
                : Math.abs(Number(roundVal)) >= 1.0e+3 ?
                    Number(Math.round(Math.abs(Number(roundVal)) / 1.0e+3 + 'e1') + 'e-1') + "K"
                    : Number(Math.round(Math.abs(Number(roundVal)) + 'e2') + 'e-2');

        if (value < 0) {
            newValue = "-" + newValue;
        }

        return "$" + newValue;
    };
}).filter('replaceNulltoZero', function () {
    return function (val) {
        return (val === null) ? "0" : val;
    };
});
