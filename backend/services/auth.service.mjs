import { comparePassword } from "../utils/helpers.mjs";
import { createUser, findUserByEmail } from "./user.service.mjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password: userPass } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  if (!comparePassword(userPass, user.password)) {
    return res.status(401).send("Invalid email or password");
  }

  const { password, ...userWithoutPassword } = user;

  const token = jwt.sign(
    { user: userWithoutPassword },
    process.env.SECRET_TOKEN,
    {
      expiresIn: "24h",
    }
  );

  req.user = userWithoutPassword;

  res.cookie("accessToken", token, {
    httpOnly: false,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ accessToken: token });
};

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

export const getMe = async (req, res) => {
  console.log("User: " + req.user);
  return req.user ? res.json(req.user) : res.sendStatus(401);
};
