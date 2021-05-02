var firebaseConfig = {
apiKey: "AIzaSyAUYfyiQEAm34NjF27EspaPfcLm5Gq4jBU",
authDomain: "group-01-match-making-cosc2408.firebaseapp.com",
projectId: "group-01-match-making-cosc2408",
storageBucket: "group-01-match-making-cosc2408.appspot.com",
messagingSenderId: "784245292062",
appId: "1:784245292062:web:1595179e05c02b90c3020f",
measurementId: "G-63R4C1NDKD"
};
firebase.initializeApp(firebaseConfig);
// firebase.auth().useEmulator("http://localhost:9099");
// firebase.firestore().useEmulator("localhost", 8080);


// OPEN SOURCE CODE FROM https://github.com/firebase/quickstart-js/blob/master/auth/email-password.html

    /**
     * Handles the sign in button press.
     */
     function toggleSignIn() {
        if (firebase.auth().currentUser) {
          firebase.auth().signOut();
          
        } else {
          var email = document.getElementById('email').value;
          var password = document.getElementById('password').value;
          if (email.length < 4) {
            alert('Please enter an email address.');
            return;
          }
          if (password.length < 4) {
            alert('Please enter a password.');
            return;
          }
          // Sign in with email and pass.
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
          });
        }
        document.getElementById('quickstart-sign-in').disabled = true;
      }
  
      /**
       * Handles the sign up button press.
       */
      function handleSignUp() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var role = document.getElementById('role').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        if (role == "employee" || role != "employer") {
          
        }
        else {
          alert('Please select a role from the drop down list');
          return;
        }
        // Create user with email and pass.
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(firebaseUser){
          // Create firestore entry for user
          firebase.firestore().collection('users').add({
            email: email,
            role: role
          });
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
      }
  
      /**
       * Sends an email verification to the user.
       */
      function sendEmailVerification() {
        firebase.auth().currentUser.sendEmailVerification().then(function() {
          // Email Verification sent!
          alert('Email Verification Sent!');
        });
      }
  
      function sendPasswordReset() {
        var email = document.getElementById('email').value;
        firebase.auth().sendPasswordResetEmail(email).then(function() {
          // Password Reset Email Sent!
          alert('Password Reset Email Sent!');
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
          } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
          }
          console.log(error);
        });
      }
  
      /**
       * initApp handles setting up UI event listeners and registering Firebase auth listeners:
       *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
       *    out, and that is where we update the UI.
       */
      function initApp() {
        // Listening for auth state changes.
        firebase.auth().onAuthStateChanged(function(user) {
          document.getElementById('quickstart-verify-email').disabled = true;
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            if (!emailVerified) {
              document.getElementById('quickstart-verify-email').disabled = false;
            }
          } else {
            // User is signed out.
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            document.getElementById('quickstart-account-details').textContent = 'null';
          }
          document.getElementById('quickstart-sign-in').disabled = false;
        });
  
        document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
        document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
        document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
        document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
      }
  
      window.onload = function() {
        initApp();
      };