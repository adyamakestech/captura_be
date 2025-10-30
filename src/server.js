import dotenv from "dotenv";
import db from "./config/dbconn.js";

dotenv.config();

const PORT = process.env.PORT;

db.connect()
  .then(() => {
    console.log(`Server is running on port ${PORT}`);
    // Here you can add more server initialization code if needed
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });
