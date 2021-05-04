/* Add modal to html

<div id="modal-login" class="modal">
  <div class="modal-content">
    <h4>Login</h4><br />
    <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
      <div class="mdl-card__title mdl-color--light-blue-600 mdl-color-text--white">
        <h2 class="mdl-card__title-text">Firebase Email &amp; Password Authentication</h2>
      </div>
      <div class="mdl-card__supporting-text mdl-color-text--grey-600">
        <p>Enter an email and password below and either sign in to an existing account or sign up</p>

        <input class="mdl-textfield__input" style="display:inline;width:auto;" type="text" id="email" name="email" placeholder="Email"/>
        &nbsp;&nbsp;&nbsp;
        <input class="mdl-textfield__input" style="display:inline;width:auto;" type="password" id="password" name="password" placeholder="Password"/>
        <br/><br/>
        <button disabled class="mdl-button mdl-js-button mdl-button--raised" id="sign-in" name="signin">Sign In</button>
        &nbsp;&nbsp;&nbsp;
        <button class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-up" name="signup">Sign Up</button>
        
        <label for="role">Choose a role:</label>

        <select class="mdl-textfield__input" style="display:inline;width:auto;" name="role" id="role">
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
        </select> 
        
        &nbsp;&nbsp;&nbsp;
        <button class="mdl-button mdl-js-button mdl-button--raised" disabled id="verify-email" name="verify-email">Send Email Verification</button>
        &nbsp;&nbsp;&nbsp;
        <button class="mdl-button mdl-js-button mdl-button--raised" id="password-reset" name="verify-email">Send Password Reset Email</button>
        
        <div class="quickstart-user-details-container">
          Status: <span id="sign-in-status">Unknown</span>
        </div>
      </div>
    </div>
  </div>
</div>
*/

/* Add script to html
  <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-firestore.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script src="js/index.js"></script>
  <script src="js/navbar.auth.helpers.js"></script>
*/

// Handles sign in and signout
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
    location.reload();
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
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
      location.reload();
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      document.getElementById('sign-in').disabled = false;
    });
  }
  document.getElementById('sign-in').disabled = true;
}

// Handles sign up
function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var role = document.getElementById('role').value;
  //Input validation
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  if (role == "employee" || role == "employer") {

  } else {
    alert('Please select a role from the drop down list');
    return;
  }
  // Create user with email and pass.
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function (firebaseUser) {
    // Create firestore entry for user
    firebase.firestore().collection('users').add({
      email: email,
      role: role
    }).then(function (){
      location.reload();
    });
    
  }).catch(function (error) {
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

// Verify the users account
function sendEmailVerification() {
  firebase.auth().currentUser.sendEmailVerification().then(function () {
    alert('Email Verification Sent!');
  });
}

// Send password reset
function sendPasswordReset() {
  var email = document.getElementById('email').value;
  firebase.auth().sendPasswordResetEmail(email).then(function () {
    // Password Reset Email Sent!
    alert('Password Reset Email Sent!');
  }).catch(function (error) {
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

// Sets up UI event listeners
function initApp() {
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function (user) {
    document.getElementById('verify-email').disabled = true;
    if (user) {
      var emailVerified = user.emailVerified;
      document.getElementById('sign-in-status').textContent = 'Signed in';
      document.getElementById('sign-in').textContent = 'Sign out';
      if (!emailVerified) {
        document.getElementById('verify-email').disabled = false;
      }
    } else {
      // User is signed out.
      document.getElementById('sign-in-status').textContent = 'Signed out';
      document.getElementById('sign-in').textContent = 'Sign in';
    }
    document.getElementById('sign-in').disabled = false;
  });

  document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
  document.getElementById('logout').addEventListener('click', toggleSignIn, false);
  document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
  document.getElementById('verify-email').addEventListener('click', sendEmailVerification, false);
  document.getElementById('password-reset').addEventListener('click', sendPasswordReset, false);
}

window.onload = function () {
  initApp();
};