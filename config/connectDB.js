const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.DATABASE_URI);
  } catch (e) {
    console.log("connectDB", e);
  }
};

module.exports = connectDB;
