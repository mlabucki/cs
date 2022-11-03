const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionDB = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      `MongoDB Connected: ${connectionDB.connection.host}`
    );
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
