const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    statusCode,
    success: false,
    message: statusCode === 500 ? "Internal server error" : err.message,
    errors: err.errors || [],
  };

  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
