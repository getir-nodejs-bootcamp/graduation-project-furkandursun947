
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.status = statusCode;
  }
  
  errorDetected(message, statusCode) {}
}
  
module.exports = ErrorHandler;
  