angular.module('app')
    .controller('SidenavController', SidenavController);

SidenavController.$inject = ['$scope'];

function SidenavController($scope) {

    var ctrl = this;
    ctrl.$onInit = $onInit();
    ctrl.test = "TEST";

    function $onInit() {

    }
}
