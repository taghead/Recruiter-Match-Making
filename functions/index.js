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

                    skillWanted = userDoc.data()['skills']
                    skillAquire = listingDoc.data()['skills']
                    skillsMatch = []

                    for ( i in skillWanted ){
                        for ( j in skillAquire ){
                            if ( skillWanted[i] == skillAquire[j] ){
                                skillsMatch.push(skillAquire[j])
                            }
                        }
                    }

                    var percentage = 0;
                    percentage = (skillsMatch.length / skillWanted.length) * 100;
                    console.log(skillsMatch.length)
                    console.log("Job Specifications Skills: \t\t\t" + skillWanted);
                    console.log("Employee relevent skills: \t\t\t" + skillAquire);
                    console.log("Employee relevent skills (Removed dupes): \t" + skillsMatch);
                
                    if ( percentage >= 50 ) {
                        console.log("\t\t\t\t\t\tMatch: " + percentage);
                    }
                    else {
                        console.log("\t\t\t\t\t\tBad candidate: " + percentage);
                    }
                    
                })
            })
        })
    })
    res.send("DONE")
  });

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

    // Test user 3
    var docData = {
        email: "test3@test3.com",
        skills: ["Javascript", "Angular", "NodeJs", "Deno"],
    };
    admin.firestore().collection("users").doc("3").set(docData).then(() => {
        console.log("Document successfully written!");
    });

    // Test user 4
    var docData = {
        email: "test4@test4.com",
        skills: ["Packing"],
    };
    admin.firestore().collection("users").doc("4").set(docData).then(() => {
        console.log("Document successfully written!");
    });

    // Test listing 1
    var docData = {
        jobName: "Running friends",
        skills: ["Running", "Climbing", "Vaulting"],
        candidates: []
    };
    admin.firestore().collection("listings").doc("1").set(docData).then(() => {
        console.log("Document successfully written!");
    });

    // Test listing 2
    var docData = {
        jobName: "A Very Active Programmer",
        skills: ["Running", "Climbing", "Vaulting", "Javascript", "Angular", "NodeJs", "Deno"],
        candidates: []
    };
    admin.firestore().collection("listings").doc("2").set(docData).then(() => {
        console.log("Document successfully written!");
    });

    // Test listing 3
    var docData = {
        jobName: "Active Programmer - Meblourne Central Safeway",
        skills: ["Running", "NodeJs", "Deno"],
        candidates: []
    };
    admin.firestore().collection("listings").doc("3").set(docData).then(() => {
        console.log("Document successfully written!");
    });
    
    // Test listing 4
    var docData = {
        jobName: "General Labour - Box Hill",
        skills: ["RF Scanning", "Mathematics", "Hard Labour"],
        candidates: []
    };
    admin.firestore().collection("listings").doc("4").set(docData).then(() => {
        console.log("Document successfully written!");
    });

    // Test listing 5
    var docData = {
        jobName: "Packing",
        skills: ["Packing"],
        candidates: []
    };
    admin.firestore().collection("listings").doc("5").set(docData).then(() => {
        console.log("Document successfully written!");
    });
    res.send("Test data added")
})