const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // Path to your Firebase service account key

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Export Firestore instance
const db = admin.firestore();
module.exports = db;
