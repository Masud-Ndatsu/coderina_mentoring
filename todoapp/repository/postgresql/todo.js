const { Todo } = require("../../models/postgresql/");
const { User } = require("../../models/postgresql/");
class TodoPostgres {
  static async createTodo({ body }) {
    console.log(body.userId);
    try {
      const user = await User.findOne({ where: { oid: body.userId } });
      console.log(user);
      const todo = await Todo.create({ ...body, userId: user.id });
      return todo;
    } catch (error) {
      throw error;
    }
  }

  static async getAllTodos() {
    try {
      const todos = await Todo.findAll({ include: ["user"] });
      return todos;
    } catch (error) {
      throw error;
    }
  }

  static async getTodoById({ id }) {
    try {
      const todo = await Todo.findOne({
        where: { oid: id },
        include: ["user"],
      });
      return todo;
    } catch (error) {
      throw error;
    }
  }
  static async updateTodoById({ id }, { body }) {
    try {
      const todo = await Todo.findOne({
        where: { oid: id },
        include: ["user"],
      });

      todo.title = body.title;
      todo.description = body.description;

      await todo.save();
      return todo;
    } catch (error) {
      throw error;
    }
  }
  static async deleteTodoById({ id }) {
    try {
      const todo = await Todo.findOne({ where: { oid: id } });
      await todo.destroy();
      return todo;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { TodoPostgres };
