angular.module('app')
    .controller('SplashController', SplashController);

SplashController.$inject = ['$state', '$timeout'];

function SplashController($state, $timeout) {

    var ctrl = this;
    ctrl.$onInit = $onInit();

    function $onInit() {
      console.log("Welcome to Acromancer!...");
      $timeout(function() {
        $state.go('home');
      }, 1500);
    }
}
