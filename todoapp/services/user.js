const {
  hashObject,
  verifyHash,
  generateToken,
} = require("../utils/encryption");

class UserService {
  constructor(respository) {
    this.respository = respository;
  }

  async createUser({ body }) {
    try {
      body.password = await hashObject(body.password);
      const user = await this.respository.createUser({ body });
      return {
        status: 201,
        success: true,
        message: "User successfully created",
        payload: user,
      };
    } catch (error) {
      throw error;
    }
  }
  async getUserByEmail({ email }) {
    try {
      const user = await this.respository.getUserByEmail({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async loginUser({ body }) {
    try {
      const { email, password } = body;
      const user = await this.getUserByEmail({ email });
      if (!user) {
        return {
          status: 404,
          success: false,
          message: "User not found",
          payload: null,
        };
      }
      const accurateObject = user.password;
      const validPassword = await verifyHash({
        sentObject: password,
        accurateObject,
      });
      if (!validPassword) {
        return {
          status: 400,
          success: false,
          message: "Invalid email or password",
          payload: null,
        };
      }
      console.log(user.oid);
      const tokenPayload = {
        userId: user?._id || user?.oid,
        email: user.email,
      };
      const token = await generateToken({
        payload: tokenPayload,
        expirationTime: "24h",
      });

      return {
        status: 200,
        success: true,
        message: "User Logged in",
        payload: { user, token },
      };
    } catch (error) {
      throw error;
    }
  }
  async getAllUsers() {
    try {
      const users = await this.respository.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }
  async getUserById({ id }) {
    try {
      const user = await this.respository.getUserById({ id });
      if (!user)
        return {
          status: 404,
          success: false,
          message: "User not found",
          payload: null,
        };
      return {
        status: 200,
        success: true,
        message: "User successfully found",
        payload: user,
      };
    } catch (error) {
      throw error;
    }
  }
  async updateUserById(id, { body }) {
    try {
      const user = await this.respository.updateUserById(id, { body });
      return {
        status: 200,
        success: true,
        message: "User successfully updated",
        payload: user,
      };
    } catch (error) {
      throw error;
    }
  }
  async deleteUserById({ id }) {
    try {
      const user = await this.respository.deleteUserById({ id });
      return {
        status: 200,
        success: true,
        message: "User successfully deleted",
        payload: user,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { UserService };
