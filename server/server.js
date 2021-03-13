const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

//Setting up config file
dotenv.config({ path: "server/config/config.env" });

// Connecting to databse
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server listening at Port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
