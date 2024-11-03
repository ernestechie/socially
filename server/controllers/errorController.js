export const globalErrorHandler = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  console.log('Error -> ', err.name);

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message || 'Unexpected error has occured',
  });
};

export const catchErrorAsync = (func) => (req, res, next) => {
  func(req, res, next).catch(next);
};
