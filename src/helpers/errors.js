class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class InvalidParameterError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = { ValidationError, InvalidParameterError };
