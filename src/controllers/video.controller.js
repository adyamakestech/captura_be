import { uploadVideoModel, deleteVideoModel } from "../models/video.model.js";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import { errorResponse, successResponse } from "../utils/response.js";
import { promisify } from "util";
import { deleteFile } from "../middlewares/video.js";

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

    const video = await uploadVideoModel(
      userId,
      title,
      filename,
      filePath,
      duration
    );

    return successResponse(res, 200, "Success to upload video", video);
  } catch (err) {
    return errorResponse(res, 500, "Failed to upload video", err.message);
  }
};

export const deleteVideoController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const filename = await deleteVideoModel(id, userId);

    if (!filename) return errorResponse(res, 404, "Video not found");

    const filePath = path.resolve("uploads/videos", filename);
    deleteFile(filePath);

    return successResponse(res, 200, "Video deleted successfully", { id });
  } catch (err) {
    return errorResponse(res, 500, "Failed to delete video", err.message);
  }
};
