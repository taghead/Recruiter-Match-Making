
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

// Listens for match event
document.getElementById('match').addEventListener('click', function(){
  // Declares matched users
  var matchUsers = firebase.functions().httpsCallable('matchUsers');
  matchUsers().then((result) => {});
  // Shows loading bar
  document.getElementById("job-list").innerHTML = `
    <div class="progress" id="job-list-progress">
      <div class="indeterminate"></div>
    </div>
  `;
  setTimeout(() => {
      location.reload();
    }, 1000);
})