angular.module('app')
    .component('sidenav', {
        bindings: {
          categoriesList: '@',
          tester: '@'
        },
        controller: 'SidenavController',
        templateUrl: '../components/sidenav/sidenav.html'
    });
