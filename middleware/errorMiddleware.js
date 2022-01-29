// Error handler

export const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal server error!" });
};

export const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({ message: "Path is not found!" });
};
