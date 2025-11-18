import pool from "../config/dbconn.js";

export const createFinalOutputModel = async ({
  videoId,
  voiceoverId = null,
  outputFilename,
  outputFilepath,
  creditUsed = 1,
}) => {
  const res = await pool.query(
    `
    INSERT INTO final_outputs (video_id, voiceover_id, output_filename, output_filepath, credit_used)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, video_id, voiceover_id, output_filename, output_filepath, credit_user, created_at
    `,
    [videoId, voiceoverId, outputFilename, outputFilepath, creditUsed]
  );
  return res.row[0];
};

export const getFinalOutputByVideoIdModel = async ({ videoId }) => {
  const res = await pool.query(
    `
    SELECT id, video_id, voiceover_id, output_filename, output_filepath, credit_used, created_at
    FROM final_outputs
    WHERE video_id = $1
    ORDER BY created_at DESC`,
    [videoId]
  );
  return res.row[0];
};

export const getFinalOutputDetailModel = async ({ id }) => {
  const res = await pool.query(
    `
    SELECT id, video_id, voiceover_id, output_filename, output_filepath, credit_used, created_at
    FROM final_outputs
    WHERE video_id = $1
    ORDER BY created_at DESC`,
    [id]
  );
  return res.row[0];
};

export const deleteFinalOutputModel = async ({ finalOutputId }) => {
  const res = await pool.query(
    `DELETE FROM final_outputs WHERE id = $1 RETURNING id`,
    [finalOutputId]
  );
  return res.row[0];
};
