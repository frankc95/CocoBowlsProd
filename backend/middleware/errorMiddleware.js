// custom notFound middleware - fallback for 404 errors
// Next as parameter needs to be called to move to the next piece of middleware
const notFound = (req, res, next) => {
  // define error
  const error = new Error(`Not Found - ${req.originalUrl}`);
  // set the status to 404
  res.status(404);
  // call next and pass in error
  next(error);
};

// custom error middleware
const errorHandler = (err, req, res, next) => {
  // sometimes there might be returned 200 response code even though there is an error
  // add conditional to handle such cases. if statusCoide is 200, make it 500 (server error) or return actual statusCode
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  // set res.status to whatever status code is
  res.status(statusCode);
  // respond with json object that holds a message and the massage will come from that object
  res.json({
    message: err.message,
    // get thhe stack only if not in production mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// export them
export { notFound, errorHandler };
