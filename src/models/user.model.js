import pool from "../config/dbconn.js";

export const createUserModel = async (name, email, password) => {
  const res = await pool.query(
    `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING name, email, role, is_verified, created_at;
    `,
    [name, email, password]
  );
  return res.rows[0];
};

export const checkEmailModel = async (email) => {
  const res = await pool.query(
    `
    SELECT id FROM users WHERE email = $1`,
    [email]
  );
  return res.rows;
};

export const getAllUserModel = async (limit = 10, offset = 0) => {
  const res = await pool.query(
    `
        SELECT id, name, email, role, is_verified, created_at
        FROM users
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );
  return res.rows;
};

export const getUserModel = async (search) => {
  const res = await pool.query(
    `SELECT id, name, email, role, is_verified, created_at
        FROM users
        WHERE name ILIKE $1 OR email ILIKE $1
        ORDER BY created_at DESC
        `,
    [`%${search}%`]
  );
  return res.rows;
};

export const getUserByIdModel = async (id) => {
  const res = await pool.query(
    `SELECT id
        FROM users 
        WHERE id = $1
        `,
    [id]
  );
  return res.rows[0];
};
export const updateUserModel = async (id, data) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = $${index++}`);
    values.push(value);
  }

  if (fields.length > 0) {
    fields.push(`updated_at = CURRENT_TIMESTAMP`);
  } else {
    throw new Error("No fields provided to update");
  }

  const query = `UPDATE users
  SET ${fields.join(", ")}
  WHERE id = $${index}
  RETURNING name, email, role, is_verified, updated_at`;

  values.push(id);

  const res = await pool.query(query, values);
  return res.rows[0];
};

export const deleteUserModel = async (id) => {
  const res = await pool.query(
    `DELETE FROM users 
        WHERE id = $1 
        RETURNING name, email, role, is_verified;
        `,
    [id]
  );
  return res.rows[0];
};
