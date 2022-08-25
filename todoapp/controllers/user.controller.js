const mongoose = require("mongoose");
const { UserMongo } = require("../repository/mongo/user");
const { UserPostgres } = require("../repository/postgresql/user");
const { UserService } = require("../services/user");
const userService = new UserService(UserMongo);
const filterJOIValidation = require("../utils/validators/filterJOI");
const {
  createUserSchema,
  loginSchema,
  updateUserSchema,
} = require("../utils/validators/user");

async function createUser(req, res) {
  try {
    const { body } = req;
    const { error } = createUserSchema.validate(body);
    if (error) {
      return res.status(422).json({
        success: false,
        message: filterJOIValidation(error.message),
        payload: null,
      });
    }
    const result = await userService.createUser({ body });

    return res.status(result.status).json({
      success: result.success,
      message: result.message,
      payload: result.payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function loginUser(req, res) {
  try {
    const { body } = req;
    const { error } = loginSchema.validate(body);
    if (error) {
      return res.status(422).json({
        success: false,
        message: filterJOIValidation(error.message),
        payload: null,
      });
    }
    const result = await userService.loginUser({ body });
    return res.status(result.status).json({
      success: result.success,
      message: result.message,
      payload: result.payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function getUsers(req, res) {
  try {
    const result = await userService.getAllUsers();
    return res.status(200).json({
      success: true,
      message: "User successfully found",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const result = await userService.getUserById({ id });

    return res.status(result.status).json({
      success: result.success,
      message: result.message,
      payload: result.payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const { error } = updateUserSchema.validate(body);
    if (error) {
      return res.status(422).json({
        success: false,
        message: filterJOIValidation(error.message),
        payload: null,
      });
    }
    const result = await userService.updateUserById({ id }, { body });

    return res.status(result.status).json({
      success: result.success,
      message: result.message,
      payload: result.payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    const result = await userService.deleteUserById({ id });

    return res.status(result.status).json({
      success: result.success,
      message: result.message,
      payload: result.payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
