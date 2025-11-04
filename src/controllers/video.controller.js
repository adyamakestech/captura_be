import { uploadVideoModel } from "../models/video.model.js";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import { errorResponse, successResponse } from "../utils/response.js";
import { promisify } from "util";

const ffprobeAsync = promisify(ffmpeg.ffprobe);

export const uploadVideoController = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

    if (!req.file) return errorResponse(res, 400, "No video uploaded");

    const filename = req.file.filename;
    const filePath = path.resolve("uploads/videos", filename);

    const metadata = await ffprobeAsync(filePath);
    const duration = metadata.format.duration;

    const video = await uploadVideoModel(userId, title, filename, duration);
    return successResponse(res, 200, "Success to upload video", video);
  } catch (err) {
    return errorResponse(res, 500, "Failed to upload video", err.message);
  }
};
