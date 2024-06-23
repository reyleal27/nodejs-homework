// const app = require("./app");
import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();
const { DB_HOST, PORT = 3000} = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is running. Use our API on port: ${PORT}`)
    );
    console.log("Database connect successfully");
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
