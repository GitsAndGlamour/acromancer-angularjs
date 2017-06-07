angular.module('app')
    .controller('HeaderController', HeaderController);

HeaderController.$inject = ['$state', '$rootScope', 'FirebaseService'];

function HeaderController($state, $rootScope, FirebaseService) {

    var ctrl = this;
    ctrl.limitHeader = false;
    ctrl.$onInit = $onInit();
    ctrl.logout = logout;

    function $onInit() {
      console.log("Header Page: ", $state.current.name);
      if($state.current.name == 'login') {
        ctrl.limitHeader = true;
      }
    }

    function logout() {
      $rootScope.sessionActive = false;
      FirebaseService.toggleSignIn(null);
      $state.go('login');
    }
}
