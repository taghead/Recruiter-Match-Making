/* This component requires the following html
    <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-functions.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="js/skills.js"></script>
    <script src="js/index.js"></script>
    <script src="js/auth.helpers.js"></script>
    <script src="js/users.component.js"></script>
*/

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    firebase.firestore().collection('users').get().then((doc) => {
      doc.forEach((doc) => {
        if (doc.data()['email'] == user.email) {
          // Load profile
          const details = doc.data();
          // console.log(details);
          
          // Set elements
          document.querySelector('#user-title').innerHTML = details.name;
          document.querySelector('#user-name').value = details.name;
          document.querySelector('#user-email').value = details.email;
          document.querySelector('#user-dob').value = details.dob;
          document.querySelector('#user-loc').value = details.location;
          document.querySelector('#user-bio').value = details.biography;
          document.querySelector('#user-exp').value = details.experience;

          // undefined Checks
          if (document.querySelector('#user-title').innerHTML == 'undefined') {
            document.querySelector('#user-title').innerHTML = details.email;
          }
          if (document.querySelector('#user-name').value == 'undefined') {
            document.querySelector('#user-name').value = "";
          }
          if (document.querySelector('#user-dob').value == 'undefined') {
            document.querySelector('#user-dob').value = "";
          }
          if (document.querySelector('#user-loc').value == 'undefined') {
            document.querySelector('#user-loc').value = "";
          }
          if (document.querySelector('#user-bio').value == 'undefined') {
            document.querySelector('#user-bio').value = "";
          }
          if (document.querySelector('#user-exp').value == 'undefined') {
            document.querySelector('#user-exp').value = "";
          }
          
          // SKILLS
          // Set element
          document.querySelector('#user-skills-input').value = details.skills;
          // undefined check
          if (document.querySelector('#user-skills-input').value != 'undefined') {
            // Clear the input 
            document.querySelector('#user-skills-input').value = "";
            // Interate throught the array and print skills as M_Chips
            for (let i = 0; i < details.skills.length; i++) { 
              document.querySelector('#user-skills').M_Chips.addChip({
                tag: details.skills[i],
              });
            }
          } else { // IF undefined
            document.querySelector('#user-skills-input').value = "";
          }

          // Hide/Show elements
          document.querySelector('.progress').style.display = "none"; // Hide loading bar
          document.querySelector('.card').style.display = "block"; // Show profile

          const userSkillChips = document.querySelector('#user-skills').M_Chips.chipsData;
          // console.log(userSkillChips.length);
          // console.log(userSkillChips[0].tag);
          // console.log(userSkillChips[1].tag);
          // console.log(details.skills);

          
          // updateUserProfile form
          const updateUserProfile = document.querySelector('#update-user-profile');
          updateUserProfile.addEventListener('submit', (e) => {
            e.preventDefault();
            // Declare array
            let skills = [];
            for (let i = 0; i < userSkillChips.length; i++) {
              skills.push(userSkillChips[i].tag)
            }
            firebase.firestore().collection('users').doc(doc.id).update({
              // Update Details
              name: document.querySelector('#user-name').value,
              email: document.querySelector('#user-email').value,
              dob: document.querySelector('#user-dob').value,
              location: document.querySelector('#user-loc').value,
              biography: document.querySelector('#user-bio').value,
              experience: document.querySelector('#user-exp').value,
              // Update Skills
              skills: skills,
            }).then(() => {
              location.reload(); // Reload Page
            }).catch(err => { console.log(err.message) });
          });
        }
      })
    }, err => { 
      console.log("ERROR\n" + err.message);
    })
  } else {
    location.replace("/");
  }
})
