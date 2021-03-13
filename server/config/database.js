const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Successfully connected to Database"))
    .catch(() => console.log("Failed to connect to Database"));
};

module.exports = connectDatabase;
