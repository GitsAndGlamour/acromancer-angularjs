(function () {
    'use strict';

    describe('HomeController', function () {
        var controller;

        beforeEach(function () {
            module('app', function ($provide) {
                $provide.constant('CONFIG', AppConfig);
            });

            specHelper.injector(function ($controller, $rootScope, CONFIG) { });
        });

        beforeEach(function () {
            controller = $controller('HomeController');
            $rootScope.$apply();
            controller.$onInit();
        });

        afterEach(function () {

        });

        describe('$onInit function', function () {

        });

    });
})();
