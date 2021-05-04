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
// firebase.functions().useEmulator("localhost", 5001);

document.addEventListener('DOMContentLoaded', function() { // Materialize Components
  var modals = document.querySelectorAll('.modal'); // Declare modal
  M.Modal.init(modals, modalOptions); // Initialize modal
  var items = document.querySelectorAll('.collapsible'); // Declare Collapsible
  M.Collapsible.init(items); // Initialize collapsible
});