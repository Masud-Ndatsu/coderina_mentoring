const { Todo } = require("../../models/postgresql/");
class UserPostgres {
  static async createUser({ body }) {
    try {
      const todo = await Todo.create({ ...body });
      return todo;
    } catch (error) {
      throw error;
    }
  }
  static async getUserByEmail({ email }) {
    try {
      const todo = await Todo.findOne({ where: { email } });
      return todo;
    } catch (error) {
      throw error;
    }
  }
  static async getAllUsers() {
    try {
      const todos = await User.findAll({ include: ["users"] });
      return todos;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById({ id }) {
    try {
      const user = await User.findOne({ where: { oid: id } });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async updateUserById({ id }, { body }) {
    try {
      const user = await User.findOne({ where: { oid: id } });
      body.password = await hashObject(body.password);
      user.name = body.name;
      user.email = body.email;
      user.password = body.password;
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async deleteUserById({ id }) {
    try {
      const user = await User.findOne({ where: { oid: id } });
      await user.destroy();
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { UserPostgres };
