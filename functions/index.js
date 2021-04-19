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

exports.matchUsers = functions.https.onRequest(async (req, res) => {
    // const userCollectionRef = await admin.firestore().collection("users").then((doc)  => {
    //     const response = data.forEach((doc) => {
    //         console.log("OK");
    //     })
    // })

    const users = await admin.firestore().collection("users").get().then((doc) => {
        const res = doc.forEach((doc) => {
            console.log("OK")
        })
    })

    res.send("Hello from Firebase!");
    
    // const listingCollectionRef = admin.firestore().collection("listings").then((listing)  => {
    //     console.log(user);
    //     console.log(listing);
    // })

    // const yourData = await   
    // admin.firestore().collection(userCollectionRef).get().then((doc) => {
    //    const temp = \[\]
    //    const response = data.forEach((doc) => {
    //      temp.push(doc.data())
    //   })
    //   return temp
    // })

    // userDocRef.get().then((doc) => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // }); 

    // userDocRef.where("skills", "array-contains", "");
    
    // res.json({result: `${JSON.stringify(readResult)}`});
  });