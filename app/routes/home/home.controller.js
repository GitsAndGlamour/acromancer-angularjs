angular.module('app')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$rootScope', '$scope', '$state', '$mdSidenav', 'FirebaseService', 'lodash'];

function HomeController($rootScope, $scope, $state, $mdSidenav, FirebaseService, lodash) {
  var imagePath = 'img/list/60.jpeg';
  $scope.messages = [
    {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
  ];
    var ctrl = this;
    ctrl.showOrHide = 'Show';
    ctrl.room = 'Main';
    ctrl.numOfGamers = 1042598763;
    ctrl.numOfGameRooms = 457;
    ctrl.tester = "TESTER";

    ctrl.$onInit = $onInit();

    function $onInit() {
      getGameRooms();
      console.log("HOME PAGE");
      // handleSessionRouting();
    }

  ctrl.toggleLeft = buildToggler('left');
  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
      ctrl.showOrHide = ctrl.showOrHide == 'Hide' ? 'Show' : 'Hide';

    };
  }

    function getGameRooms() {
      FirebaseService.getGameRooms().then(function(data) {
        ctrl.gameRooms = data.categories;
        ctrl.categories = lodash.keys(data.categories);
        ctrl.adults = lodash.keys(data.categories.age.adults);
        ctrl.minors = lodash.keys(data.categories.age.minors);
        ctrl.countries = lodash.map(data.categories.country, 'name');

      });

    }

    function handleSessionRouting() {
      if(!$rootScope.sessionActive) {
        $state.go('login');
      }
    }
}
