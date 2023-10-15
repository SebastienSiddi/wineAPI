const mongoose = require("mongoose");

const connectionString = process.env.CONNECTION_STRING + process.env.DB_NAME;

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
