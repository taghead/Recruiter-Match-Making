document.getElementById('edit-job-open-modal').addEventListener('click', function(){
  document.getElementById("job-edit-list").innerHTML = '<option selected="selected">Select a job listing</option>'
  document.getElementById('edit-job-name').value = ""
  document.getElementById('edit-description').value = ""
  skillsEditLen = document.getElementById("skillsEdit").M_Chips.chipsData.length
  for ( let i=0; i<skillsEditLen;i++){
    document.getElementById("skillsEdit").M_Chips.deleteChip(0)
  }
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const users =  firebase.firestore().collection("users").get().then((userDoc) => {
        const res = userDoc.forEach((userDoc) => {
          if (userDoc.data()['email'] == user.email){
            for (let i=0; i<userDoc.data()['listings'].length;i++){
              var docRef = firebase.firestore().collection("listings").doc(userDoc.data()['listings'][i]);
              docRef.get().then((doc) => {
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

document.getElementById('job-edit-list').onchange = function(){
  var docRef = firebase.firestore().collection("listings").doc(document.getElementById("job-edit-list").value);
  docRef.get().then((doc) => {
    document.getElementById('edit-job-name').value = doc.data()['jobName']
    document.getElementById('edit-description').value = doc.data()['description']
    skillsEditLen = document.getElementById("skillsEdit").M_Chips.chipsData.length
    for ( let i=0; i<skillsEditLen;i++){
      document.getElementById("skillsEdit").M_Chips.deleteChip(0)
    }
    for ( i in doc.data()['skills']){
      document.getElementById("skillsEdit").M_Chips.addChip({
        tag: doc.data()['skills'][i]
      });
    }
  })  
}

document.getElementById('job-edit-button').addEventListener('click', function(){
  if(document.getElementById("edit-job-name").value[0] == " "){
    alert("Cannot start wil space.")
    return
  }
  if(document.getElementById("edit-job-name").value[0] == null){
    alert("Name cannot be empty.")
    return
  }
  if(document.getElementById("skillsEdit").M_Chips.chipsData.length == 0){
    alert("Skills are empty")
    return
  }

  let skillsLen = document.getElementById("skillsEdit").M_Chips.chipsData.length
  let skills = [];
  for ( let i=0; i<skillsLen;i++){
    skills.push(document.getElementById("skillsEdit").M_Chips.chipsData[i]['tag'])
  }
  firebase.firestore().collection("listings").add({
      jobName: document.getElementById("edit-job-name").value,
      description: document.getElementById("edit-description").value,
      skills: skills
  })
  document.getElementById("modal-edit").M_Modal.close()
  setTimeout(() => {
      document.getElementById("job-list").innerHTML = "";
      updateJobList();
    }, 1000);
})