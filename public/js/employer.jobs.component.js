/* This component requires the following html
      
    <table id="job-list-table" style="width:100%"></table> 

    <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-firestore.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="js/index.js"></script>
    <script  src="js/employer.jobs.component.js"></script>
*/

// Set Table Headings
document.getElementById("job-list-table").innerHTML += `
<tr>
<th>Listing Name</th>
<th>Description</th>
<th>Skills</th>
<th>Candidates</th>
</tr>
`

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Get signed in users document
    const users =  firebase.firestore().collection("users").get().then((userDoc) => {
      const res = userDoc.forEach((userDoc) => {
        if (userDoc.data()['email'] == user.email){
          // Iterate over listings the user posted
          var getJobCandidates = firebase.functions().httpsCallable('getJobCandidates');
          for ( let i=0; i < userDoc.data()['listings'].length; i++ ){
            getJobCandidates({ id: userDoc.data()['listings'][i] }).then((usersOwnedListings) => {
              var getJobListing = firebase.functions().httpsCallable('getJobListing');
              getJobListing({ id: userDoc.data()['listings'][i] }).then((listingDoc) => {
                // Write job listing details to html
                document.getElementById("job-list-table").innerHTML += `
                  <tr>
                    <td>${listingDoc.data['jobName']}</td>
                    <td>${listingDoc.data['description']}</td>
                    <td>${listingDoc.data['skills']}</td>
                    <td>${listingDoc.data['candidates']}</td>
                  </tr>
                `
              })
            });
          }
        }
      })
    })
  }
})