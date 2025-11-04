import pool from "../config/dbconn.js";

export const uploadVideoModel = async (userId, title, filename, duration) => {
  const res = await pool.query(
    `
    INSERT INTO videos 
      (user_id, title, filename, duration)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id, title, filename, duration
    `,
    [userId, title, filename, duration]
  );
  return res.rows[0];
};
