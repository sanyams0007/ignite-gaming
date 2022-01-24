const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((con) =>
      console.log(
        "Successfully connected to Database with Host: ",
        con.connection.host
      )
    )
    .catch(() => console.log("Failed to connect to Database"));
};

module.exports = connectDatabase;
