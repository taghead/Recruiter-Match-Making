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
if (location.hostname === "localhost") {
  firebase.auth().useEmulator("http://localhost:9099");
  firebase.firestore().useEmulator("localhost", 8080);
  firebase.functions().useEmulator("localhost", 5001);
  console.log("Using emulators for auth, firestore and functions")
}

document.addEventListener('DOMContentLoaded', function() { // Materialize Components

  var modals = document.querySelectorAll('.modal'); // Declare modal
  M.Modal.init(modals); // Initialize modal

  var items = document.querySelectorAll('.collapsible'); // Declare Collapsible
  M.Collapsible.init(items); // Initialize collapsible

  var parrs = document.querySelectorAll('.parallax');
  M.Parallax.init(parrs);

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, options);
  });

});
