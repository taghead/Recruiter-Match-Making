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
            console.log(userDoc.data())
          }
        })
      })
    }
  })
}