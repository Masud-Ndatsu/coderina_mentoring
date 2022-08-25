const { Todo } = require("../../models/mongo/todo");
class TodoMongo {
  static async createTodo({ body }) {
    try {
      const todo = await Todo.create({ ...body });
      return todo;
    } catch (error) {
      throw error;
    }
  }

  static async getAllTodos() {
    try {
      const todos = await Todo.find({});
      return todos;
    } catch (error) {
      throw error;
    }
  }

  static async getTodoById({ id }) {
    try {
      const todo = await Todo.findById(id);
      return todo;
    } catch (error) {
      throw error;
    }
  }
  static async updateTodoById({ id }, { body }) {
    try {
      const todo = await Todo.findByIdAndUpdate(id, { ...body });
      return todo;
    } catch (error) {
      throw error;
    }
  }
  static async deleteTodoById({ id }) {
    try {
      const todo = await Todo.findByIdAndDelete(id);
      return todo;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { TodoMongo };
