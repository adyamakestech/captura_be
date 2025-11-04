import {
  createUserModel,
  checkEmailModel,
  getAllUserModel,
  getUserModel,
  getUserByIdModel,
  updateUserModel,
  deleteUserModel,
} from "../models/user.model.js";
import { hashPassword } from "../utils/bcrypt.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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

export const getAllUserController = async (req, res) => {
  try {
    const allUsers = await getAllUserModel();
    return successResponse(res, 200, "User fetched successfully", allUsers);
  } catch (err) {
    return errorResponse(res, 500, "Failed to fetch users", err.message);
  }
};

export const searchUserController = async (req, res) => {
  try {
    const { search } = req.body;

    if (!search || search.trim() === "") {
      return errorResponse(res, 400, "Search term is required");
    }

    const users = await getUserModel(search);

    if (!users.length) {
      return errorResponse(res, 404, "User not found");
    }

    console.log("search body:", search);
    console.log("hasil query SQL:", users);

    return successResponse(
      res,
      200,
      "Search results fetched successfully",
      users
    );
  } catch (err) {
    return errorResponse(res, 500, "Failed to search users", err.message);
  }
};

export const updateUserController = async (req, res) => {
  try {
    const updatedUser = await updateUserModel(req.params.id, req.body);

    if (!updatedUser)
      return errorResponse(res, 409, "User not found", updatedUser);

    return successResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    return errorResponse(res, 500, "Failed to updated users", err.message);
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserByIdModel(id);

    if (!user) return errorResponse(res, 409, "User ID is required", user);

    const deletedUser = await deleteUserModel(id);

    if (!deletedUser)
      return errorResponse(res, 404, "User not found", deletedUser);

    return successResponse(res, 200, "User deleted succressfully", deletedUser);
  } catch (err) {
    return errorResponse(res, 500, "Failed to deleted users", err.message);
  }
};
