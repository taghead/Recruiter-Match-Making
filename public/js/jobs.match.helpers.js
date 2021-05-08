
// document.getElementById('match').addEventListener('click', function(){
//   matchUsers().then((usersOwnedListings) => {
//     var matchUsers = firebase.functions().httpsCallable('matchUsers');
//     matchUsers();
//     })
//   }, function(event){event.preventDefault()});

// document.getElementById('match').addEventListener('click', function(){
//   var mathcUsers = firebase.functions().httpsCallable('mathcUsers').then((usersOwnedListings) => {
//     matchUsers()
//   })
// }, function(event){event.preventDefault()});
document.getElementById('match').addEventListener('click', function(){
  var matchUsers = firebase.functions().httpsCallable('matchUsers');
  matchUsers().then((result) => {});
})