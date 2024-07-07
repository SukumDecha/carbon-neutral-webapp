import { createUser, findUserByEmail } from "./user.service.mjs";

export const register = async (user) => {
  const existingUser = await findUserByEmail(user.email);

  if (existingUser.length !== 0) {
    throw new Error("User already exists");
  }

  await createUser(user);
};

export const logout = async (req, res) => {
  req.logout();
  return res.status(200).json({ message: "Logged out" });
};
