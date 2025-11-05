import path from "path";
import ffmpeg from "fluent-ffmpeg";
import { promisify } from "util";
import { errorResponse, successResponse } from "../utils/response.js";
import {
  uploadVoiceoversModel,
  getVoiceoversByVideoModel,
  deleteVoiceoversModel,
} from "../models/voiceovers.model.js";
import { deleteFile } from "../middlewares/voiceovers.js";

const ffprobeAsync = promisify(ffmpeg.ffprobe);

export const uploadVoiceoversController = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) return errorResponse(res, 400, "videoId is required");

    if (!req.file) return errorResponse(res, 400, "No voiceovers uploaded");

    const filename = req.file.filename;
    const filepath = path.resolve("uploads/voice", filename);

    const metadata = await ffprobeAsync(filepath);
    const duration = metadata.format.duration;

    const voiceovers = await uploadVoiceoversModel(
      videoId,
      filename,
      filepath,
      duration
    );

    return successResponse(
      res,
      200,
      "Voiceover uploaded successfully",
      voiceovers
    );
  } catch (err) {
    return errorResponse(res, 500, "Failed to upload voiceovers", err.message);
  }
};

export const getVoiceoversByVideosIdController = async (req, res) => {
  try {
    const { videoId } = req.params;
    const data = await getVoiceoversByVideoModel(videoId);
    if (data.length === 0)
      return errorResponse(res, 404, "No voiceover found for this video");
    return successResponse(res, 200, "Voiceover fetched successfully", data);
  } catch (err) {
    return errorResponse(res, 500, "Failed to get voiceover", err.message);
  }
};

export const deleteVoiceoversController = async (req, res) => {
  try {
    const { voiceId } = req.params;
    const userId = req.user.id;

    const filename = await deleteVoiceoversModel(voiceId, userId);

    if (!filename) return errorResponse(res, 404, "Voice not found");

    const filePath = path.resolve("uploads/voice", filename);
    deleteFile(filePath);

    return successResponse(res, 200, "Voice deleted successfully", { voiceId });
  } catch (err) {
    return errorResponse(res, 500, "Voice to delete video", err.message);
  }
};
