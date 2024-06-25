const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@sandbox.0ozt3va.mongodb.net/");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");
});

module.exports = db;
