/* This helper requires the following html

  <div>
    <h4>Login and signup</h4>
    <input  type="text" id="email" placeholder="Email"/>
    <input  type="password" id="password" placeholder="Password"/>
    <button disabled id="login">Sign In</button>
    <button  id="sign-up">Sign Up</button>
    
    <label for="role">Role:</label>
    <select id="role">
      <option value="employee">Employee</option>
      <option value="employer">Employer</option>
    </select> 
  </div>

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
      } 
      else {
        alert(errorMessage);
      }
      console.log(error);
      document.getElementById('login').disabled = false;
    });
  }
  document.getElementById('login').disabled = true;
}

// Handles sign up
function handleSignUp(){
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
    // I know we can just use != but some ungodly reasons this is more stable
  } 
  else {
    alert('Please select a role from the drop down list');
    return;
  }
  // Create user with email and pass.
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
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
    } 
    else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

// Sets up UI event listeners
function initApp() {
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      if(document.getElementById('login') != null){
        document.getElementById("account-details").innerHTML=user.email
      }
      document.getElementById('login').textContent = 'Logout';
      if (location.pathname == "/"){
        window.setTimeout(function() {
          location.replace("/users.html");
        }, 2000)
      }
    } 
    else {
      // User is signed out.
      document.getElementById('login').textContent = 'Sign in';
      if (location.pathname != "/"){
        window.setTimeout(function() {
          location.replace("/");
        }, 2000)
      }
    }
    document.getElementById('login').disabled = false;
  });

  if (document.getElementById('login') != null){
    document.getElementById('login').addEventListener('click', toggleSignIn, false);
  }
  if (document.getElementById('sign-up') != null){
    document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
  }
  if (document.getElementById('logout') != null){
    document.getElementById('logout').addEventListener('click', toggleSignIn, false);
  }
}

window.onload = function () {
  initApp();
};