import dotenv from "dotenv";
import app from "./app.js";
import db from "./config/dbconn.js";

dotenv.config();

const PORT = process.env.PORT || 5050;

db.connect()
  .then(() => {
    console.log("✅ Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Server OK");
});
