import {
  createCaptionModel,
  getCaptionByVoiceoverModel,
  updateCaptionModel,
  deleteCaptionModel,
} from "../models/caption.model.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const createCaptionController = async (req, res) => {
  try {
    const { voiceoverId } = req.params;
    const { text } = req.body;

    if (!text) return errorResponse(res, 400, "Caption text is required");

    const caption = await createCaptionModel(voiceoverId, text);

    return successResponse(res, 201, "Caption created", caption);
  } catch (err) {
    return errorResponse(res, 500, "Failed to create caption", err.message);
  }
};

export const getCaptionByVoiceoverController = async (req, res) => {
  try {
    const { voiceoverId } = req.params;

    if (!voiceoverId) return errorResponse(res, 400, "Caption not found");

    const captions = await getCaptionByVoiceoverModel(voiceoverId);

    return successResponse(res, 200, "Captions fetched", captions);
  } catch (err) {
    return errorResponse(res, 500, "Failed to fetch captions", err.message);
  }
};

export const updateCaptionController = async (req, res) => {
  try {
    const { captionId } = req.params;
    const { text } = req.body;

    if (!text) return errorResponse(res, 400, "Caption text is required");

    const updated = await updateCaptionModel(captionId, text);
    if (!updated) return errorResponse(res, 404, "Caption not found");

    return successResponse(res, 200, "Caption updated", updated);
  } catch (err) {
    return errorResponse(res, 500, "Failed to update caption", err.message);
  }
};

export const deleteCaptionController = async (req, res) => {
  try {
    const { captionId } = req.params;

    const deleted = await deleteCaptionModel(captionId);
    if (!deleted) return errorResponse(res, 404, "Caption not found");

    return successResponse(res, 200, "Caption deleted", deleted);
  } catch (err) {
    return errorResponse(res, 500, "Failed to delete caption", err.message);
  }
};
