const mongoose = require('mongoose');
//connecting database
require('dotenv').config();
let DB = process.env.DB;

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => { // Successfully connected
    // console.log(result);
    console.log("Database conncetion successfully created")
  })
  .catch((err) => {
    // Catch any potential error
    // console.log(mongoose.version);
    console.log("Unable to connect to MongoDB. Error: " + err);
  });

module.exports = mongoose;