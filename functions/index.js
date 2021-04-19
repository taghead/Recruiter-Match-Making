// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// localhost:5001/group-01-match-making-co-78d4c/us-central1/matchUsers
exports.matchUsers = functions.https.onRequest(async (req, res) => {
    const users = await admin.firestore().collection("users").get().then((userDoc) => {
        const res = userDoc.forEach((userDoc) => {
            const listings = admin.firestore().collection("listings").get().then((listingDoc) => {
                const res = listingDoc.forEach((listingDoc) => {
                    matchingTest(userDoc.data()['skills'], listingDoc.data()['skills'], [])
                    console.log("OK")
                })
            })
        })
    })
    res.send("DONE")
  });

function matchingTest(skillWanted , skillAquire , skillsMatch ){
    var updatedSkillWanted = [];
    for (var i = 0; i < skillWanted.length; i++) {
        updatedSkillWanted[i] = skillWanted[i].toLowerCase();
    }
    updatedSkillWanted.sort();

    var updatedSkillAquire = [];
    for (var i = 0; i < skillAquire.length; i++) {
        updatedSkillAquire[i] = skillAquire[i].toLowerCase();
    }
    updatedSkillAquire.sort();

    for (a in updatedSkillWanted) {
        for (b in updatedSkillAquire) {
            if (a == b){
                if (skillsMatch.includes(skillWanted[b]) == false) {
                    skillsMatch.push(skillAquire[b]);
                }
            }
        }
    }

    var percentage = 0;
    percentage = (skillsMatch.length / updatedSkillWanted.length) * 100;

    console.log("Job Specifications Skills: \t\t\t" + skillWanted);
    console.log("Employee relevent skills: \t\t\t" + skillAquire);
    console.log("Employee relevent skills (Removed dupes): \t" + skillsMatch);

    if ( percentage >= 50 ) {
        console.log("\t\t\t\t\t\tMatch: " + percentage);
    }
    else {
        console.log("\t\t\t\t\t\tBad candidate: " + percentage);
    }
    return percentage;
}


// localhost:5001/group-01-match-making-co-78d4c/us-central1/testData
exports.testData = functions.https.onRequest(async (req, res) => {
    // Test user 1
    var docData = {
        email: "test@test.com",
        skills: ["Dancing", "Piano", "Vocals", "Charismatic"],
    };
    admin.firestore().collection("users").doc("1").set(docData).then(() => {
        console.log("Document successfully written!");
    });

    // Test user 2
    var docData = {
        email: "test2@test2.com",
        skills: ["Jumping", "Climbing", "Vaulting", "Hugging"],
    };
    admin.firestore().collection("users").doc("2").set(docData).then(() => {
        console.log("Document successfully written!");
    });

    // Test listing 1
    var docData = {
        skills: ["Running", "Climbing", "Vaulting"],
    };
    admin.firestore().collection("listings").doc("1").set(docData).then(() => {
        console.log("Document successfully written!");
    });


    res.send("Test data added")
})