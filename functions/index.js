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
            console.log(userDoc.data()['skills'])
        })
    })
    res.send("Matches Updates")
  });