import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/video.routes.js";
import voiceoverRoutes from "./routes/voiceovers.routes.js";
import captionRoutes from "./routes/caption.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/voices", voiceoverRoutes);
app.use("/api/captions", captionRoutes);

export default app;
