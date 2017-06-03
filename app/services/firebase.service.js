angular.module('services')
    .service('FirebaseService', FirebaseService);

FirebaseService.$inject = [];

function FirebaseService() {
  var service = this;
  $onInit();
  service.config = window.__env.config;

  function $onInit() {
    firebase.initializeApp(service.config);
    console.log(firebase);
  }
}
