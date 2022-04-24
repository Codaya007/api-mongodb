require("dotenv").config();
const mongoose = require("mongoose");
const { MONGO_URL } = require("../config");

const connectDB = async () => {
  const connection = await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${connection.connection.host}`);
};

module.exports = { connectDB };
