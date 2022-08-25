const { User } = require("../../models/mongo/user");
class UserMongo {
  static async createUser({ body }) {
    try {
      const user = await User.create({ ...body });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async getUserByEmail({ email }) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async getAllUsers() {
    try {
      const users = await User.find({});
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById({ id }) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async updateUserById({ id }, { body }) {
    try {
      const user = await User.findByIdAndUpdate(id, { ...body });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async deleteUserById({ id }) {
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { UserMongo };
