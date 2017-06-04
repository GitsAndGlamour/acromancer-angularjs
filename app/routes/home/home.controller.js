angular.module('app')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$rootScope', '$state'];

function HomeController($rootScope, $state) {

    var ctrl = this;

    ctrl.$onInit = $onInit();

    function $onInit() {
      console.log("HOME PAGE");
      handleSessionRouting();
    }

    function handleSessionRouting() {
      if(!$rootScope.sessionActive) {
        $state.go('login');
      }
    }
}
