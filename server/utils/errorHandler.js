// Error Handler Class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    //sets up .stack property on target object(this)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
