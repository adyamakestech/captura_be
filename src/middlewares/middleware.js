import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";

const tokenEnv = process.env.JWT_SECRET || "default_tokeng";
const time = process.env.JWT_EXPIRES_IN || "1d";

export const generateToken = (payload) => {
  return jwt.sign(payload, tokenEnv, { expiresIn: time });
};

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, 401, "No token provided");
    }

    const tokenHeader = authHeader.split(" ")[1];
    const decoded = jwt.verify(tokenHeader, tokenEnv);

    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
