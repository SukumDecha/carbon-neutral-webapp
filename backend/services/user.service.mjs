import { hashPassword, executeQuery } from "../utils/helpers.mjs";

export const findUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = ?";
  return await executeQuery(query, [id]);
};

export const findAllUsers = async () => {
  const query = "SELECT * FROM users";
  return await executeQuery(query, [], false);
};

export const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  return await executeQuery(query, [email]);
};

export const createUser = async (user) => {
  const { email, username, password, avatar } = user;

  const hashedPassword = hashPassword(password);

  const query = `
    INSERT INTO users (username, password, email, avatar, points, isAdmin, total_Donation)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [
    username,
    hashedPassword,
    email,
    avatar || "/public/uploads/default-avatar.png",
    0,
    0,
    0,
  ];

  await executeQuery(query, params);
};

export const updateUser = async (id, user) => {
  const { username, email, avatar, password } = user;

  const fieldsToUpdate = {
    ...(username && { username }),
    ...(email && { email }),
    ...(avatar && { avatar }),
    ...(password && { password: hashPassword(password) }),
  };

  if (Object.keys(fieldsToUpdate).length === 0) {
    throw new Error("No fields provided for update");
  }

  const setClause = Object.keys(fieldsToUpdate)
    .map((field) => `${field} = ?`)
    .join(", ");
  const params = [...Object.values(fieldsToUpdate), id];

  const query = `
    UPDATE users 
    SET ${setClause}
    WHERE id = ?
  `;

  await executeQuery(query, params);
};

export const addTotalDonation = async (userId, amount) => {
  const query =
    "UPDATE users SET total_donations = total_donations + ? WHERE id = ?";
  const params = [amount, userId];
  await executeQuery(query, params);
};

export const updateUserPoints = async (userId, points, add) => {
  const operator = add ? "+" : "-";
  const query = `UPDATE users SET points = points ${operator} ? WHERE id = ?`;
  const params = [points, userId];
  await executeQuery(query, params);
};
