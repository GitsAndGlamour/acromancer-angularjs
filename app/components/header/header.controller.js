angular.module('app')
    .controller('HeaderController', HeaderController);

HeaderController.$inject = ['$state'];

function HeaderController($state) {

    var ctrl = this;
    ctrl.limitHeader = false;
    ctrl.$onInit = $onInit();

    function $onInit() {
      console.log("Header Page: ", $state.current.name);
      if($state.current.name == 'login') {
        ctrl.limitHeader = true;
      }
    }
}
