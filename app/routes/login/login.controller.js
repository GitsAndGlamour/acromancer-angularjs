angular.module('app')
  .controller('LoginController', LoginController);

LoginController.$inject = ['zxcvbn', '$state', '$rootScope', 'FirebaseService', 'UserService', '$timeout', '$mdDialog'];

function LoginController(zxcvbn, $state, $rootScope, FirebaseService, UserService, $timeout, $mdDialog) {

  var ctrl = this;
  ctrl.$onInit = $onInit();
  ctrl.login = login;
  ctrl.signup = signup;
  ctrl.showSignInForm = showSignInForm;
  ctrl.showSignUpForm = showSignUpForm;
  ctrl.watchPasswordStrength = watchPasswordStrength;
  ctrl.checkIfPasswordMatch = checkIfPasswordMatch;
  ctrl.dataLoading = false;
  function $onInit() {
  }

  function showSignUpForm() {
    ctrl.newRegistration = true;
    ctrl.user = {};
    ctrl.showHints = true;
    ctrl.confirmPassword = null;
    ctrl.passwordStrength = 0;
    ctrl.passwordStrengthPhrase = 'Poor';
  }

  function showSignInForm() {
    ctrl.newRegistration = false;
    ctrl.user = {};
    ctrl.passwordStrength = 0;
    ctrl.passwordStrengthPhrase = 'Poor';
  }

  function checkIfPasswordMatch() {
    ctrl.passwordMatch = ctrl.user.password === ctrl.confirmPassword;
  }

  function watchPasswordStrength() {
    if(ctrl.newRegistration) {
      ctrl.passwordStrength = zxcvbn(ctrl.user.password).score;
      switch (ctrl.passwordStrength) {
        case 0:
          ctrl.passwordStrengthPhrase = 'Poor';
          break;
        case 1:
          ctrl.passwordStrengthPhrase = 'Weak';
          break;
        case 2:
          ctrl.passwordStrengthPhrase = 'Okay';
          break;
        case 3:
          ctrl.passwordStrengthPhrase = 'Good';
          break;
        case 4:
          ctrl.passwordStrengthPhrase = 'Strong';
          break;
        default:
          ctrl.passwordStrengthPhrase = 'Poor';
      }
    }
  }

  function login() {
    ctrl.dataLoading = true;
    FirebaseService.toggleSignIn(ctrl.user);
    $timeout(function() {
      if(FirebaseService.isSignedIn()) {
        console.log("YES");
        handleLoginSuccess();
      } else {
        console.log("NO");
        handleLoginFailure();
      }
    }, 3000);
  }

  function signup() {
    ctrl.dataLoading = true;
    FirebaseService.handleSignUp(ctrl.user);
    $timeout(function() {
      var signup = FirebaseService.getSignUp();
      if (signup) {
      handleSignUpSuccess();
    } else {
        showSignUpForm();
      }
      ctrl.dataLoading = false;
    }, 5000);
  }

  function handleLoginSuccess() {
      UserService.setUser(ctrl.user);
      $rootScope.sessionActive = true;
      $state.go('home');
  }

  function handleLoginFailure() {
    $rootScope.sessionActive = false;
    ctrl.dataLoading = false;
  }

  function handleSignUpSuccess() {
    alertLogin();
  }

  function alertLogin() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.getElementsByTagName('body')))
        .clickOutsideToClose(true)
        .title('You have successfully created your account!')
        .textContent('Now you can login and start playing.')
        .ariaLabel('Signup Success Alert')
        .ok('Okay')
    ).then(function() {
      $state.go('login');
    });
  }
}
