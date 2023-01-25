// заменяет try catch в async функциях

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

module.exports = { asyncWrapper };
