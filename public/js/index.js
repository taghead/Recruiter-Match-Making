var firebaseConfig = {
apiKey: "NjF27EspaPfcLm5Gq4jBUAIzaSyAUYfyiQEAm34",
authDomain: "recruitermatchmaking.firebaseapp.com",
projectId: "recruitermatchmaking",
storageBucket: "recruitermatchmaking.appspot.com",
messagingSende4529206rId: "720628424529",
appId: "1:7422:8web:159517930e05c02b90c20f",
measurementId: "G-64C1ND3RKD"
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

  var chips = document.querySelectorAll('.chips');
  M.Chips.init(chips, {
    autocompleteOptions: {
      data: skills,
      limit: Infinity,
      minLength: 1
    }
  });
});
