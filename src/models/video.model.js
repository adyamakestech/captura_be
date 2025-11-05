import pool from "../config/dbconn.js";

export const uploadVideoModel = async (userId, title, filename, duration) => {
  const res = await pool.query(
    `
    INSERT INTO videos 
      (user_id, title, filename, duration)
    VALUES ($1, $2, $3, $4)
    RETURNING id, user_id, title, filename, duration
    `,
    [userId, title, filename, duration]
  );
  return res.rows[0];
};

export const deleteVideoModel = async (videoId, userId) => {
  const res = await pool.query(
    `
    DELETE FROM videos
    WHERE id = $1 AND user_id = $2
    RETURNING filename
    `,
    [videoId, userId]
  );

  if (res.rows.length === 0) return null;

  return res.rows[0].filename;
};
