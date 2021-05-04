/* This helper requires the following html

  <!-- Navbar -->
    <!-- RIGHT ALIGNED -->
      <li class="waves-effect waves-light">
        <a href="#" class="btn lightgrey-text modal-trigger" data-target="modal-login">Login</a>
      </li>
      // This shoud not be on the index.html
      <li class="waves-effect waves-light">
        <button id="login" class="btn teal lighten-1 z-depth-0 waves-effect waves-light">Logout</button>
      </li>

  <!-- Login Modal -->
  <div id="modal-login" class="modal">
    <div class="modal-content">
      <h4>Login</h4><br /> <!-- Login Form -->
        <div class="input-field"> <!-- Email -->
          <input type="email" id="email" required />
          <label for="email">Email Address</label>
        </div>
        <div class="input-field"> <!-- Password -->
          <input type="password" id="password" required />
          <label for="password" data-error="Email or password is incorrect!">Password</label>
        </div>
        <label for="role">Role:</label>
        <select class="browser-default" id="role">
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
        </select> 
        <button id="login" class="btn teal lighten-1 z-depth-0 waves-effect waves-light">Login</button><span id="invalid">Incorrect email or password!</span>
        <button id="sign-up" class="btn teal lighten-1 z-depth-0 waves-effect waves-light">Sign up</button>
    </div>
  </div>

  <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-firestore.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script src="js/index.js"></script>
  <script src="js/auth.helpers.js"></script>
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
          const users =  firebase.firestore().collection("users").get().then((userDoc) => {
          const res = userDoc.forEach((userDoc) => {
            if (userDoc.data()['email'] == user.email){

              // If role is employer
              if (userDoc.data()['role'] == "employer"){
                document.getElementById("navbar-left").innerHTML += `
                <li class="waves-effect waves-light">
                  <a href="/jobs.html" class="lightgrey-text" id="jobs" >JOBS</a>
                </li>
                `
              }

              // If role is employee
              if (userDoc.data()['role'] == "employee"){
                if (location.pathname == "/jobs.html"){
                  location.replace("/404.html");
                }
              }
            }
          })
        })
      }
      document.getElementById('login').textContent = 'Logout';
      if (location.pathname == "/"){
        window.setTimeout(function() {
          location.replace("/users.html");
        }, 500)
      }
    } 
    else {
      // User is signed out.
      document.getElementById('login').textContent = 'Sign in';
      if (location.pathname != "/"){
        window.setTimeout(function() {
          location.replace("/");
        }, 500)
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