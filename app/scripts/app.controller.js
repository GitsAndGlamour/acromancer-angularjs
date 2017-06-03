angular.module('app')
    .controller('AppController', AppController);
AppController.$inject = ['FirebaseService'];
function AppController(FirebaseService) {
  console.log('Angular Up');
}
