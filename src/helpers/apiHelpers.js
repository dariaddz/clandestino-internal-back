const { ValidationError, InvalidParameterError } = require("./errors");

// заменяет try catch в async функциях

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

// отлавливает  ошибки
const errorHandler = (error, req, res, next) => {
  if (
    error instanceof ValidationError ||
    error instanceof InvalidParameterError
  ) {
    return res.status(error.status).json({ message: error.message });
  }

  res.status(500).json({ message: error.message });
};
module.exports = { asyncWrapper, errorHandler };
