class ClandestinoInternalError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends ClandestinoInternalError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class InvalidParameterError extends ClandestinoInternalError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorisedError extends ClandestinoInternalError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  ClandestinoInternalError,
  ValidationError,
  InvalidParameterError,
  NotAuthorisedError,
};
