module.exports = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
  
    // Determine the type of error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      status: 'error',
      message: message,
    });
  };