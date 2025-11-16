import pool from "../config/dbconn.js";

export const createCaptionModel = async (voiceoverId, text) => {
  const res = await pool.query(
    `
    INSERT INTO captions (voiceover_id, text)
    VALUES ($1, $2)
    RETURNING text, created_at`,
    [voiceoverId, text]
  );
  return res.rows[0];
};

export const getCaptionByVoiceoverModel = async (voiceoverId) => {
  const res = await pool.query(
    `
        SELECT id, text, created_at
        FROM captions
        WHERE voiceover_id = $1
        ORDER BY created_at DESC`,
    [voiceoverId]
  );
  return res.rows;
};

export const updateCaptionModel = async (captionId, text) => {
  const res = await pool.query(
    `
        UPDATE captions
        SET text = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING id, voiceover_id, text, updated_at`,
    [text, captionId]
  );
  return res.rows[0];
};

export const deleteCaptionModel = async (captionId) => {
  const res = await pool.query(
    `DELETE FROM captions WHERE id = $1 RETURNING id`,
    [captionId]
  );
  return res.rows[0];
};
