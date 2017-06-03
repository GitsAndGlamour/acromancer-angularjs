angular.module('services')
    .service('FirebaseService', FirebaseService);

FirebaseService.$inject = [];

function FirebaseService() {
  var service = this;
  var $onInit = $onInit();
  service.config = {
    apiKey: "AIzaSyDzY0GrQ3MkXk9D_nj3KfXsvdK2FCutuoo",
    authDomain: "acromancer-8c495.firebaseapp.com",
    databaseURL: "https://acromancer-8c495.firebaseio.com",
    projectId: "acromancer-8c495",
    storageBucket: "acromancer-8c495.appspot.com",
    messagingSenderId: "289103746033"
  };

  function $onInit() {
    firebase.initializeApp(service.config);
    console.log(firebase);
  }
}
