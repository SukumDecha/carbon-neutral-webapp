import { removeDirFromFile, saveFile } from "../utils/file.mjs";
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
  const { email, username, password } = user;

  // Ensure the password is hashed correctly
  const hashedPassword = await hashPassword(password);

  const query = `
    INSERT INTO users (username, password, email, points, isAdmin, total_Donations)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [username, hashedPassword, email, 0, 0, 0];

  try {
    await executeQuery(query, params);
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error; // Rethrow the error after logging it
  }
};

export const getClaimHistory = async (userId) => {
  const query = `
    SELECT 
    c.id, 
    c.claimAt, 
    p.name, 
    p.*,
    (c.quantity * p.point_cost) AS total_points,
    c.quantity as quantity
FROM 
    claim_product_history c
JOIN 
    products p ON c.product_Id = p.id
JOIN 
    users u ON c.user_Id = u.id
WHERE 
    c.user_Id = ?
  `;

  return await executeQuery(query, [userId], false, false);
};

export const getDonationHistory = async (userId) => {
  const query = `
  SELECT c.title, SUM(d.amount) as total FROM donations d 
  JOIN users u ON d.user_id = u.id
  JOIN campaigns c ON d.campaign_id = c.id 
  WHERE u.id = ?
  GROUP BY c.title
  `;

  return await executeQuery(query, [userId], false);
};

export const updateUser = async (id, user) => {
  const { username, email, image, password } = user;

  const fieldsToUpdate = {
    ...(username && { username }),
    ...(email && { email }),
    ...(password && { password: await hashPassword(password) }),
  };

  if (image) {
    const user = await findUserById(id);

    try {
      removeDirFromFile(user.avatar);
    } catch (err) {
      console.log("Could not remove file");
    }

    fieldsToUpdate.avatar = await saveFile(image);
  }

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

  return await executeQuery(query, params);
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
