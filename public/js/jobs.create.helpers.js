document.getElementById('create-job-listing').addEventListener('click', createJobListing, false);

function createJobListing(){
  if(document.getElementById("job-name").value[0] == " "){
    alert("Cannot start wil space.")
    return
  }
  if(document.getElementById("skills").M_Chips.chipsData.length == 0){
    alert("Skills are empty")
    return
  }
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const users =  firebase.firestore().collection("users").get().then((userDoc) => {
        const res = userDoc.forEach((userDoc) => {
          if (userDoc.data()['email'] == user.email){
            let skillsLen = document.getElementById("skills").M_Chips.chipsData.length
            let skills = [];
            for ( let i=0; i<skillsLen;i++){
              skills.push(document.getElementById("skills").M_Chips.chipsData[i]['tag'])
            }
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
  document.getElementById("modal-create").M_Modal.close()
  setTimeout(() => {
      document.getElementById("job-list").innerHTML = "";
      updateJobList();
    }, 2000);
}