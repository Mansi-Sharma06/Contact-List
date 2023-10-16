// require the library
// const mongoose = require('mongoose');   //created

// //connecting to the db
// mongoose.connect("mongodb://127.0.0.1:27017/contact_list_db");

// //acquire the connection to check if it is successful
// const db = mongoose.connection;

// // if error
// db.on('error', console.error.bind(console, 'error connecting to db'));

// //if up and running then print the message
// db.once('open', function () {
//     console.log('Successfully connected to the database');
// });

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:27017/contact_list_db", {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection is successfully");
  })
  .catch((e) => {
    console.log("No Connection");
  });
