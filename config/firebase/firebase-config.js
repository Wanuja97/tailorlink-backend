// firebase configurations

const admin = require("firebase-admin");

const serviceAccount = require('./ServiceAccount.json');
// serviceAccount.json file included to the .gitignore file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;