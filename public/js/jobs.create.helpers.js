// Listens for create-job-listing event
document.getElementById('create-job-listing').addEventListener('click', createJobListing, function(event){
  event.preventDefault()
});

// Listens for create-job-form event
document.getElementById("create-job-form").addEventListener('submit', function(event){
  event.preventDefault()
});

function createJobListing(){
  // Checks if field is empty
  if(document.getElementById("job-name").value[0] == " "){
    alert("Cannot start wil space.")
    return
  }
  // Checks if field is empty
  if(document.getElementById("skills").M_Chips.chipsData.length == 0){
    alert("Skills are empty")
    return
  }

  // Gets signed in user
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // Checks if signed in user matches the document
      const users =  firebase.firestore().collection("users").get().then((userDoc) => {
        const res = userDoc.forEach((userDoc) => {
          // Checks if signed in user matches the document email
          if (userDoc.data()['email'] == user.email){
            // Gets amount of skills
            let skillsLen = document.getElementById("skills").M_Chips.chipsData.length
            // Declares arrat
            let skills = [];
            // Iterates over the skills
            for ( let i=0; i<skillsLen;i++){
              // Pushes skill to array
              skills.push(document.getElementById("skills").M_Chips.chipsData[i]['tag'])
            }
            // Adds a new listing with new details
            firebase.firestore().collection("listings").add({
                jobName: document.getElementById("job-name").value,
                description: document.getElementById("description").value,
                skills: skills
            })
            .then(function(docRef) {
                firebase.firestore().collection('users').doc(userDoc.id).set({ listings: firebase.firestore.FieldValue.arrayUnion(docRef.id) }, { merge: true });
            })
          }
        })
      })
    }
  })
  // Closes modal
  document.getElementById("modal-create").M_Modal.close()

  // Shows loading bar
  document.getElementById("job-list").innerHTML = `
    <div class="progress" id="job-list-progress">
      <div class="indeterminate"></div>
    </div>
  `;

  setTimeout(() => {
    var matchUsers = firebase.functions().httpsCallable('matchUsers');
    matchUsers().then((result) => {});
      // reloads webpage
      location.reload();
    }, 3000);
}