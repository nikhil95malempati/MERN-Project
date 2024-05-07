import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//Protect routes
const protect = async (req, res, next) => {
  let token;

  //Read JWT from cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch {
      res.status(401).send("Not Authorized, token failed");
    }
  } else {
    res.status(401).send("Not Authorized, no token ");
  }
};

//Admin middleware

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not Authorized as admin ");
  }
};

export { protect, admin };
