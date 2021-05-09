/* This component requires the following html
      
    <table id="job-list-table" style="width:100%"></table> 

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
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Get signed in users document
      const users =  firebase.firestore().collection("users").get().then((userDoc) => {
        const res = userDoc.forEach((userDoc) => {
          if (userDoc.data()['email'] == user.email){
            // Iterate over listings the user posted
            var getJobCandidates = firebase.functions().httpsCallable('getJobCandidates');
            try {
              if (userDoc.data()['listings'].length == "0"){
                throw TypeError;
              }
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
                              <th>Description</th>
                              <th>Skills</th>
                              <th>Candidates</th>
                            </tr>
                            <tr>
                              <td>${listingDoc.data['description']}</td>
                              <td>${listingDoc.data['skills']}</td>
                              <td>${formattedCandidates}</td>
                            </tr>
                          </table>                      
                        </span></div>
                    </li>
                      `
                      //Removes loading bar on last iteration
                      if(document.getElementById("job-list-progress")) document.getElementById("job-list-progress").remove();
                    })
                  });
                }
              }
            }
            catch (e) {
              if (e instanceof TypeError || e.name == "TypeError") {
                let zeroListings = ["(◡﹏◡✿) There are no listings here. I forgot to mention you had to make a listing.",
                "Beep bop beep no listings detected [✖﹏✖] go make some.",
                "(ㄒoㄒ) oh noooo I need to make some listings.",
                "ಥ_ಥ Listings why have you failed me. Oh wait I just forgot to make some :P."]
                document.getElementById("job-list").innerHTML = `
                  <li>
                    <div class="collapsible-header">
                      <i class="material-icons">filter_drama</i>${zeroListings[Math.floor(Math.random() * zeroListings.length)]} Normally listings will be here... 
                    </div>
                  </li>
                `
                if(document.getElementById("job-list-progress")) document.getElementById("job-list-progress").remove();
              }
            }
          }
        })
      })
    }
  })
}

function updateViewModal(email){
  console.log()
  const users =  firebase.firestore().collection("users").get().then((userDoc) => {
    const res = userDoc.forEach((userDoc) => {
      if(email.id == userDoc.data()['email']){
        document.getElementById("modal-view-user").innerHTML = `
          <table>
          <tr>
            <th> Name: </th><td>
              <div class="input-field"> <!-- USER.NAME -->
                <input disabled type="text" value="${userDoc.data()['name']}" required>
              </div>
            </td>
          </tr>
          <tr>
            <th> Email: </th><td>
              <div class="input-field"> <!-- USER.EMAIL -->
                <input disabled type="email" value="${userDoc.data()['email']}" required>
              </div>
            </td>
          </tr>
          <tr>
            <th> Date of Birth: </th><td>
              <div class="input-field"> <!-- USER.DOB -->
                <input disabled type="text" value="${userDoc.data()['dob']}" required>
                <span class="helper-text">YYYY-MM-DD</span>
              </div>
            </td>
          </tr>
          <tr>
            <th> Location: </th><td>
              <div class="input-field"> <!-- USER.LOCATION -->
                <input disabled type="text" value="${userDoc.data()['location']}" required>
              </div>
            </td>
          </tr>
          <tr>
            <th> Biography: </th><td>
              <div class="input-field"> <!-- USER.BIO -->
                <textarea disabled value="${userDoc.data()['biography']}" class="materialize-textarea"></textarea>
              </div>
            </td>
          </tr>
          <tr>
            <th> Experiences: </th><td>
              <div class="input-field"> <!-- USER.EXP -->
                <textarea disabled value="${userDoc.data()['experience']}"class="materialize-textarea"></textarea>
              </div>
            </td>
          </tr>
          <tr>
            <th> Skills: </th><td>
              <div class="input-field"> <!-- USER.EXP -->
                <textarea disabled value="${userDoc.data()['skills']}"class="materialize-textarea"></textarea>
              </div>
            </td>
          </tr>
        </table><br />
        `
      }
    })
  })
}

updateJobList()