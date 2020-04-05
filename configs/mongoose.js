//importing library
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/csv-files");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error!!"));
db.once("open", function() {
  console.log("Connected to database using mongoose!!");
});