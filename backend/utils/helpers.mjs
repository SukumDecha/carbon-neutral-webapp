import bcrypt from "bcrypt";
import pool from "../connections/mysql.connection.mjs";

const saltRounds = 10;

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password + "", salt);
};

export const comparePassword = (plain, hashed) =>
  bcrypt.compareSync(plain + "", hashed);

export const executeQuery = async (query, params = [], single = true) => {
  try {
    const [results] = await pool.query(query, params);

    if (single) return results[0];

    return results;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

export const handleErrors = (res, error, message) => {
  console.error(error);
  res.status(500).json({ error: message });
};
