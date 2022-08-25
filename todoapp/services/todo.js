class TodoService {
  constructor(respository) {
    this.respository = respository;
  }

  async createTodo(body) {
    try {
      const todo = await this.respository.createTodo({ body });
      return {
        status: 201,
        success: true,
        message: "Todo successfully created",
        payload: todo,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllTodos() {
    try {
      const todos = await this.respository.getAllTodos();
      return todos;
    } catch (error) {
      throw error;
    }
  }
  async getTodoById({ id }) {
    try {
      const todo = await this.respository.getTodoById({ id });
      if (!todo)
        return {
          status: 404,
          success: false,
          message: "Todo not found",
          payload: null,
        };
      return {
        status: 200,
        success: true,
        message: "Todo successfully found",
        payload: todo,
      };
    } catch (error) {
      throw error;
    }
  }
  async updateTodoById(id, body) {
    try {
      const todo = await this.respository.updateTodoById(id, { body });
      return {
        status: 200,
        success: true,
        message: "Todo successfully updated",
        payload: todo,
      };
    } catch (error) {
      throw error;
    }
  }
  async deleteTodoById({ id }) {
    try {
      const todo = await this.respository.deleteTodoById({ id });
      return {
        status: 200,
        success: true,
        message: "Todo successfully deleted",
        payload: todo,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { TodoService };
