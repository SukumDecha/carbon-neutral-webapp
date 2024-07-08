import jwt from "jsonwebtoken";

export const handleGuard = (req, res, next) => {
  const token = req.cookies.accessToken


  if(!token) {
    return res.redirect("http://localhost:5173/auth/login")
  }
  jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
    if (error) {
      res.clearCookie("accessToken");
      return res.redirect("http://localhost:3000/auth/login");
    }

    req.user = decoded.user;
    console.log("Authenticated user:", req.user);
    next();
  });
};
