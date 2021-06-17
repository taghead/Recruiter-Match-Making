// Listens for edit-job-open-modal event
document.getElementById('edit-job-open-modal').addEventListener('click', function(){
  // Sets HTML
  document.getElementById("job-edit-list").innerHTML = '<option selected="selected">Select a job listing</option>'
  document.getElementById('edit-job-name').value = ""
  document.getElementById('edit-description').value = ""
  skillsEditLen = document.getElementById("skillsEdit").M_Chips.chipsData.length
  for ( let i=0; i<skillsEditLen;i++){
    document.getElementById("skillsEdit").M_Chips.deleteChip(0)
  }
  // Gets signed in user
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // Is signed in user matches document
      const users =  firebase.firestore().collection("users").get().then((userDoc) => {
        const res = userDoc.forEach((userDoc) => {
          // If signed in user email mathces document email
          if (userDoc.data()['email'] == user.email){
            // Iterates over the listings and adds listings to HTML
            for (let i=0; i<userDoc.data()['listings'].length;i++){
              var docRef = firebase.firestore().collection("listings").doc(userDoc.data()['listings'][i]);
              docRef.get().then((doc) => {
                // Injects HTML for every listing
                document.getElementById("job-edit-list").innerHTML += `
                <option value="${userDoc.data()['listings'][i]}">${doc.data()['jobName']}</option>
                `
              })
            }
          }
        })
      })
  }
  })
}, function(event){event.preventDefault()});

// Listens for job-edit-list event
document.getElementById('job-edit-list').onchange = function(){
  var docRef = firebase.firestore().collection("listings").doc(document.getElementById("job-edit-list").value);
  // Gets document
  docRef.get().then((doc) => {
    // Sets HTML elements
    document.getElementById('edit-job-name').value = doc.data()['jobName']
    document.getElementById('edit-description').value = doc.data()['description']
    skillsEditLen = document.getElementById("skillsEdit").M_Chips.chipsData.length
    // Iterates over skills
    for ( let i=0; i<skillsEditLen;i++){
      document.getElementById("skillsEdit").M_Chips.deleteChip(0)
    }
    // Iterates over skills
    for ( i in doc.data()['skills']){
      document.getElementById("skillsEdit").M_Chips.addChip({
        tag: doc.data()['skills'][i]
      });
    }
  })  
}

// Listens to job-edit-button event
document.getElementById('job-edit-button').addEventListener('click', function(){
  // Checks if empty
  if(document.getElementById("edit-job-name").value[0] == " "){
    alert("Cannot start wil space.")
    return
  }
  // Checks if empty
  if(document.getElementById("edit-job-name").value[0] == null){
    alert("Name cannot be empty.")
    return
  }
  // Checks if empty
  if(document.getElementById("skillsEdit").M_Chips.chipsData.length == 0){
    alert("Skills are empty")
    return
  }
  // Gets skills
  let skillsLen = document.getElementById("skillsEdit").M_Chips.chipsData.length
  let skills = [];
  for ( let i=0; i<skillsLen;i++){
    // Pushes each skill into array
    skills.push(document.getElementById("skillsEdit").M_Chips.chipsData[i]['tag'])
  }
  var docRef = firebase.firestore().collection('listings').doc(document.getElementById("job-edit-list").value);
  // Updates document
  var update = docRef.update({
    jobName: document.getElementById("edit-job-name").value,
    description: document.getElementById("edit-description").value,
    skills: skills
  });

  // Close modal
  document.getElementById("modal-edit").M_Modal.close()
  setTimeout(() => {
      updateJobList();
      location.reload(); // Reload page
    }, 1000);
})

// Listens for job-edit-delete-button event
document.getElementById('job-edit-delete-button').addEventListener('click', function(){
  // Gets signed in user
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const users =  firebase.firestore().collection("users").get().then((userDoc) => {
        const res = userDoc.forEach((userDoc) => {
          // Checks if signed in user email matches document email
          if (userDoc.data()['email'] == user.email){
            let listings = []
            // Iterates over listings
            for (let i=0; i<userDoc.data()['listings'].length;i++){
              // If the values match
              if (document.getElementById("job-edit-list").value == userDoc.data()['listings'][i]){
                // Delete value
                firebase.firestore().collection("listings").doc(document.getElementById("job-edit-list").value).delete().then(() => {
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
              }
              else{
                listings.push(userDoc.data()['listings'][i])
              }
            }
            var docRef = firebase.firestore().collection('users').doc(userDoc.id);
            // Update listings
            var update = docRef.update({
              listings: listings
            });
          }
        })
      })
    }
  })

  // Closes modal
  document.getElementById("modal-edit").M_Modal.close()
  setTimeout(() => {
      updateJobList();
      location.reload(); // Reloads page
    }, 1000);
})