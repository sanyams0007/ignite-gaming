const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

// Handle Uncaught exceptions !!Note (always place on top)
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

//Setting up config file
dotenv.config({ path: "server/config/config.env" });

// Connecting to databse
connectDatabase();

// Creating server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server listening at Port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

// Handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`ERROR : ${err.stack}`);
  console.log("Shutting down the server due to Unhandled Rejection");
  server.close(() => {
    process.exit(1);
  });
});
