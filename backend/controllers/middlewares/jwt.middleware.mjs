import { findUserByEmail } from "../../services/user.service.mjs";

import jwt from "jsonwebtoken";
import { comparePassword } from "../../utils/helpers.mjs";

export const handleLogin = async (req, res, next) => {
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

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: "None", // Adjust as per your application's needs
  });

  req.user = userWithoutPassword;

  next();
};

export const handleGuard = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
    if (error) {
      res.clearCookie("token");
      return res.redirect("/auth/login");
    }

    req.user = decoded.user;
    console.log(req.user);
    next();
  });
};
