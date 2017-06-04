angular.module('app')
  .controller('LoginController', LoginController);

LoginController.$inject = ['zxcvbn'];

function LoginController(zxcvbn) {

  var ctrl = this;
  ctrl.$onInit = $onInit();
  ctrl.showSignInForm = showSignInForm;
  ctrl.showSignUpForm = showSignUpForm;
  ctrl.watchPasswordStrength = watchPasswordStrength;
  ctrl.checkIfPasswordMatch = checkIfPasswordMatch;
  function $onInit() {
  }

  function showSignUpForm() {
    ctrl.newRegistration = true;
    ctrl.user = {};
    ctrl.showHints = true;
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
