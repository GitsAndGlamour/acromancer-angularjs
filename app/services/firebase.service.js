angular.module('services')
    .service('FirebaseService', FirebaseService);

FirebaseService.$inject = ['$mdDialog', '$state'];

function FirebaseService($mdDialog, $state) {
  var service = this;
  service.toggleSignIn = toggleSignIn;
  service.handleSignUp = handleSignUp;
  service.sendEmailVerification = sendEmailVerification;
  service.sendPasswordReset = sendPasswordReset;
  service.isEmailVerified = isEmailVerified;
  service.resetPassword = resetPassword;
  service.updateProfile = updateProfile;
  service.deleteUser = deleteUser;
  service.getSignUp = getSignUp;
  service.isDisplayNameTaken = isDisplayNameTaken;
  service.addDisplayNameToCollection = addDisplayNameToCollection;
  service.deleteDisplayNameFromCollection = deleteDisplayNameFromCollection;
  service.isSignedIn = isSignedIn;

  $onInit();

  function $onInit() {
    firebase.initializeApp(window.__env.config.firebase);
    console.log(firebase);
  }

  function showAlert(title, textContent, state) {
    if (!title) {
      title = 'An error has occured: ';
    }
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.getElementsByTagName('body')))
        .clickOutsideToClose(true)
        .title(title)
        .textContent(textContent)
        .ariaLabel('Signup Success Alert')
        .ok('Okay')
    ).then(function() {
     if (state) {
       $state.go(state);
     }
    });
  }

  function isSignedIn() {
    return firebase.auth().currentUser;
  }

  function getSignUp() {
    return service.signup;
  }

  /**
   * Handles the sign in button press.
   */
  function toggleSignIn(user) {
    if (firebase.auth().currentUser || !user) {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    } else {
      var email = user.email;
      var password = user.password;
      var textContent;
      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          textContent = 'Wrong password.';
        } else {
          textContent = errorMessage;
        }
        console.log(error);
        showAlert(null, textContent, 'login');
        // [END_EXCLUDE]
      });
      // [END authwithemail]
    }
  }

  /**
   * Handles the sign up button press.
   */
  function handleSignUp(user) {
    var email = user.email;
    var password = user.password;

    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      service.signup = false;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        textContent = 'The password is too weak.';
      } else {
        textContent = errorMessage;
      }
      console.log(error);
      showAlert(null, textContent, 'login');
      return;
      // [END_EXCLUDE]
    });
      service.signup = true;
    // [END createwithemail]
  }

  /**
   * Sends an email verification to the user.
   */
  function sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      title = 'Email Verification Sent!';
      textContent = 'Please check your e-mail and for an e-mail verification link.';
      showAlert(title,textContent, null);
      // [END_EXCLUDE]
    });
    // [END sendemailverification]
  }

  function sendPasswordReset(user) {
    var email = user.email;
    var title, textContent;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      title = 'Password Reset Email Sent!';
      textContent = 'Please check your e-mail for password reset instructions.';
     showAlert(title, textContent, null);
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
       showAlert(null, errorMessage, null);
      } else if (errorCode == 'auth/user-not-found') {
        showAlert(null, errorMessage, null);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
  }

  function isEmailVerified() {
    var user = firebase.auth().currentUser;
    return user.emailVerified;
  }

  function resetPassword(password) {
    var user = firebase.auth().currentUser;

    user.updatePassword(password).then(function() {
      showAlert('Success!', 'Your password has been reset. Please login agian.', null);
      toggleSignIn(null);
      $state.go('login');
    }, function(error) {
      showAlert(null, 'Please try resetting your password again.', null);
    });
  }

  function updateProfile(data) {
    var user = firebase.auth().currentUser;

    user.updateProfile(data).then(function() {
      showAlert('Success!', 'Profile updated.', null);
    }, function(error) {
      showAlert(null, 'Please try updating your profile again.', null);
    });
  }

  function deleteUser() {
    var user = firebase.auth().currentUser;

    user.delete().then(function() {
      showAlert('Did you mean to do that?', 'Your account has been deleted.', null);
    }, function(error) {
      showAlert(null, 'Please try deleting your account again.', null);

    });
  }

  function isDisplayNameTaken(username) {
    return firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {
      return snapshot.exists();
    });
  }

  function addDisplayNameToCollection(username) {
    firebase.database().ref('users/' + username).set({data:''});
  }

  function deleteDisplayNameFromCollection(username) {
    firebase.database().ref('users/' + username).remove();
  }
}
