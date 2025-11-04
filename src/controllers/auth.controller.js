import jwt from "jsonwebtoken";
import { checkEmailModel, createUserModel } from "../models/user.model.js";
import { generateToken } from "../middlewares/middleware.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const requiredFields = { name, email, password };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value || value.toString().trim() === "") {
        return errorResponse(res, 400, `Field ${key} wajib diisi.`);
      }
    }

    const existingUser = await checkEmailModel(email);
    if (existingUser.length > 0) {
      return errorResponse(res, 409, "Email already exists");
    }
    const hashedPassword = await hashPassword(password);

    const newUsers = await createUserModel(name, email, hashedPassword);

    return successResponse(res, 201, "User created successfully", newUsers);
  } catch (err) {
    return errorResponse(res, 500, "Failed to create user", err.message);
  }
};

export const loginController = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const requiredFields = { identifier, password };
    for (const [key, value] of Object.entries(requiredFields)) {
      if ((!value || value.trim()) === "") {
        return errorResponse(res, 400, `Field ${key} wajib diisi.`);
      }
    }

    const users = await checkEmailModel(identifier);
    if (users.length === 0) {
      return errorResponse(res, 404, "User not found.");
    }

    const existingUser = users[0];
    const isMatch = await comparePassword(password, existingUser.password);
    if (!isMatch) {
      return errorResponse(res, 401, "Wrong password.");
    }

    const token = generateToken({
      id: existingUser.id,
      name: existingUser.name,
      role: existingUser.role,
    });

    delete existingUser.password;

    const { password: _, ...safeUser } = existingUser;
    return successResponse(res, 200, "Login berhasil.", {
      user: safeUser,
      token,
    });
  } catch (err) {
    return errorResponse(res, 500, "Failed to login", err.message);
  }
};
