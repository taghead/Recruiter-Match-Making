/* This component requires the following html
    <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-functions.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="js/index.js"></script>
    <script  src="js/employer.jobs.component.js"></script>
*/

function updateJobList(){
  // Gets signed in user
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Get signed in users document
      const users =  firebase.firestore().collection("users").get().then((userDoc) => {
        const res = userDoc.forEach((userDoc) => {
          // If signed in email matches document email
          if (userDoc.data()['email'] == user.email){
            // Iterate over listings the user posted
            var getJobCandidates = firebase.functions().httpsCallable('getJobCandidates');
            try {
              if (userDoc.data()['listings'].length == "0"){
                throw TypeError;
              }
              // Gets signed in user job listings
              if ( userDoc.data()['listings'] ){
                for ( let i=0; i < userDoc.data()['listings'].length; i++ ){
                  getJobCandidates({ id: userDoc.data()['listings'][i] }).then((usersOwnedListings) => {
                    var getJobListing = firebase.functions().httpsCallable('getJobListing');
                    getJobListing({ id: userDoc.data()['listings'][i] }).then((listingDoc) => {
                      let formattedCandidates = [];
                      for ( i in listingDoc.data['candidates'] ){
                        formattedCandidates.push(`
                        <li class="waves-effect waves-light">
                          <a href="#" class="lightgrey-text modal-trigger" data-target="modal-view-user" onclick="updateViewModal(this)" id="${listingDoc.data['candidates'][i]}">${listingDoc.data['candidates'][i]}</a>
                        </li>
                        `
                        )
                      }
                      // Write job listing details to html
                      document.getElementById("job-list").innerHTML += `
                        <li>
                          <div class="collapsible-header">
                            <i class="material-icons">filter_drama</i>${listingDoc.data['jobName']}
                          </div>
                          <div class="collapsible-body white lighten-2"><span>
                            <table>
                              <tr>
                                <th>Description</th><td>${listingDoc.data['description']}</td>
                              </tr>
                              <tr>
                                <th>Skills</th><td>${listingDoc.data['skills']}</td>
                              </tr>
                              <tr>
                                <th>Candidates</th><td>${formattedCandidates}</td>
                              </tr>
                            </table>                      
                            </span>
                          </div>
                        </li>
                      `
                      //Removes loading bar on last iteration
                      if(document.getElementById("job-list-progress")) document.getElementById("job-list-progress").remove();
                    })
                  });
                }
              }
            }
            // Catch error
            catch (e) {
              if (e instanceof TypeError || e.name == "TypeError") {
                document.getElementById("job-list").innerHTML = `
                  <li>
                    <div class="collapsible-header">
                      <i class="material-icons">error</i>You have no listings. Head to Create to make a new listing!
                    </div>
                  </li>
                `
                if(document.getElementById("job-list-progress")) document.getElementById("job-list-progress").remove();
              }
            }
            // Load Profile
            const details = userDoc.data();
            console.log(details);

            // Set elements
            document.querySelector('#user-title').innerHTML = details.name;
            document.querySelector('#user-name').value = details.name;
            document.querySelector('#user-email').value = details.email;
            document.querySelector('#user-comp').value = details.company;
            document.querySelector('#user-loc').value = details.location;

            // undefined Checks
            if (document.querySelector('#user-title').innerHTML == 'undefined') {
              document.querySelector('#user-title').innerHTML = details.email;
            }
            if (document.querySelector('#user-name').value == 'undefined') {
              document.querySelector('#user-name').value = "";
            }
            if (document.querySelector('#user-comp').value == 'undefined') {
              document.querySelector('#user-comp').value = "";
            }
            if (document.querySelector('#user-loc').value == 'undefined') {
              document.querySelector('#user-loc').value = "";
            }

            // updateUserProfile form
            const updateUserProfile = document.querySelector('#update-user-profile');
            // Listens for submit event
            updateUserProfile.addEventListener('submit', (e) => {
              e.preventDefault();
              firebase.firestore().collection('users').doc(userDoc.id).update({
                // Update Details
                name: document.querySelector('#user-name').value,
                email: document.querySelector('#user-email').value,
                company: document.querySelector('#user-comp').value,
                location: document.querySelector('#user-loc').value,
              }).then(() => {
                location.reload(); // Reload Page
              }).catch(err => { console.log(err.message) });
            });
          }
        })
      })
    }
  })
}

function updateViewModal(email){
  // console.log()
  // Gets signed in user doc
  const users =  firebase.firestore().collection("users").get().then((userDoc) => {
    const res = userDoc.forEach((userDoc) => {
      // If signed in user matches user document
      if(email.id == userDoc.data()['email']){
        // Inject HTML
        document.getElementById("modal-view-user").innerHTML = `
          <div class="modal-content">
            <h4>${userDoc.data()['name']}</h4>
            <table>
              <tr>
                <th> Name: </th><td>
                ${userDoc.data()['name']}
                </td>
              </tr>
              <tr>
                <th> Email: </th><td>
                  ${userDoc.data()['email']}
                </td>
              </tr>
              <tr>
                <th> Date of Birth: </th><td>
                  ${userDoc.data()['dob']}
                </td>
              </tr>
              <tr>
                <th> Location: </th><td>
                  ${userDoc.data()['location']}
                </td>
              </tr>
              <tr>
                <th> Biography: </th><td>
                    ${userDoc.data()['biography']}
                </td>
              </tr>
              <tr>
                <th> Experiences: </th><td>
                  ${userDoc.data()['experience']}
                </td>
              </tr>
              <tr>
                <th> Skills: </th><td>
                    ${userDoc.data()['skills']}
                </td>
              </tr>
            </table><br />
            <span>Click outside the modal to close</span>
          </div>
        `
      }
    })
  })
}

updateJobList()