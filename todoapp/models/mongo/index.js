const mongoose = require("mongoose");
const { DB_URI } = process.env;
// TODO create env for database connection uri
function connectDB() {
  try {
    mongoose.connect(DB_URI, { useNewUrlParser: true });
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log({ error });
    console.log("MongoDB failed!");
  }
}

module.exports = { connectDB };
