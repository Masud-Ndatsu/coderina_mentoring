const { TodoMongo } = require("../repository/mongo/todo");
const {
  createTodoSchema,
  updateTodoSchema,
} = require("../utils/validators/todo");
const filterJOIValidation = require("../utils/validators/filterJOI");
const { TodoService } = require("../services/todo");
const { TodoPostgres } = require("../repository/postgresql/todo");
const todoService = new TodoService(TodoMongo);

async function createTodo(req, res) {
  try {
    const { error } = createTodoSchema.validate(req.body);
    if (error) {
      return res.status(422).json({
        success: false,
        message: filterJOIValidation(error.message),
        payload: null,
      });
    }
    const id = req.userId;
    const { description, title } = req.body;
    const result = await todoService.createTodo({
      description,
      title,
      userId: id,
    });
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

async function getTodos(req, res) {
  try {
    const result = await todoService.getAllTodos();
    return res.status(200).json({
      success: true,
      message: "Todo successfully found",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function getTodoById(req, res) {
  try {
    const { id } = req.params;
    const result = await todoService.getTodoById({ id });

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

async function updateTodoById(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const { error } = updateTodoSchema.validate(body);
    if (error) {
      return res.status(422).json({
        success: false,
        message: filterJOIValidation(error.message),
        payload: null,
      });
    }
    const result = await todoService.updateTodoById({ id }, { body });
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

async function deleteTodoById(req, res) {
  try {
    const { id } = req.params;
    const result = await todoService.deleteTodoById({ id });
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
  createTodo,
  getTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
