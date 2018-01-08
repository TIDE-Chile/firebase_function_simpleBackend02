// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');

var serviceAccount = require("./config/tidedemo-96abf-firebase-adminsdk-g0szp-51df085c34");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.verifyToken = functions.https.onRequest((req, res) => {
  var idToken = req.headers.authorization.replace('Bearer ',''); 

  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;
    res.send(decodedToken);
  }).catch(function(error) {
    res.send(error);
  });

});

