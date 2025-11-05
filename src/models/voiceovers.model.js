import pool from "../config/dbconn.js";

export const uploadVoiceoversModel = async (
  videoId,
  filename,
  filepath,
  duration
) => {
  const res = await pool.query(
    `
    INSERT INTO voiceovers (video_id, filename, filepath, duration)
    VALUES ($1, $2, $3, $4)
    RETURNING 
      id, 
      video_id, 
      (SELECT user_id FROM videos WHERE id = $1) AS user_id,
      filename, 
      filepath, 
      duration, 
      created_at
    `,
    [videoId, filename, filepath, duration]
  );
  return res.rows[0];
};

export const getVoiceoversByVideoModel = async (videoId) => {
  const res = await pool.query(
    `
        SELECT id, video_id, filename, filepath, duration, created_at, updated_at 
        FROM voiceovers
        WHERE video_id = $1 `,
    [videoId]
  );
  return res.rows;
};

export const deleteVoiceoversModel = async (voiceId, userId) => {
  const res = await pool.query(
    `
    DELETE FROM voiceovers v
    USING videos vi
    WHERE v.video_id = vi.id
      AND v.id = $1
      AND vi.user_id = $2
    RETURNING v.filename
    `,
    [voiceId, userId]
  );

  if (res.rows.length === 0) return null;

  return res.rows[0].filename;
};
