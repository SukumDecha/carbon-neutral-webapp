import jwt from "jsonwebtoken";

export const handleGuard = (req, res, next) => {
  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return res.sendStatus(401);
  // }

  // const token = authHeader.split(" ")[1];

  const token = req.cookies.accessToken;
  if (!token) {
    return res.redirect("http://localhost:5173/auth/login");
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
    if (error) {
      res.clearCookie("accessToken");
      return res.redirect("http://localhost:3000/auth/login");
    }

    req.user = decoded.user;
    next();
  });
};
