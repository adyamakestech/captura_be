import {
  createFinalOutputModel,
  getFinalOutputByVideoIdModel,
  getFinalOutputDetailModel,
  deleteFinalOutputModel,
} from "../models/finaloutput.model.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const createFinalOutputController = async (req, res) => {
  try {
    const { videoId, voiceoverId } = req.body;

    if (!videoId) return errorResponse(res, 400, "Video is required");

    if (!req.file) return errorResponse(res, 400, "No Video uploaded");

    const filename = req.file.filename;
    const filepath = path.resolve("uploads/finaloutput", filename);

    const finaloutput = await createFinalOutputModel(
      videoId,
      voiceoverId,
      filename,
      filepath
    );

    return successResponse(res, 201, "Final output created", finaloutput);
  } catch (err) {
    return errorResponse(
      res,
      500,
      "Failed to create final output",
      err.message
    );
  }
};

export const getFinalOutputByVideoIdController = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!videoId) return errorResponse(res, 400, "Final output not found");

    const finaloutput = await getFinalOutputDetailModel(videoId);

    return successResponse(res, 200, "Final output fetched", captions);
  } catch (err) {
    return errorResponse(res, 500, "Failed to fetch final output", err.message);
  }
};

export const deleteFinalOutputController = async (req, res) => {
  try {
    const { finaloutputId } = req.params;

    const deleted = await deleteCaptionModel(finaloutputId);
    if (!deleted) return errorResponse(res, 404, "Final output not found");

    return successResponse(res, 200, "Final output deleted", deleted);
  } catch (err) {
    return errorResponse(
      res,
      500,
      "Failed to delete final output",
      err.message
    );
  }
};
