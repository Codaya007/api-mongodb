const getMessageMongoError = ({
  code,
  name,
  message,
  keyPattern,
  keyValue,
}) => {
  if (code === 11000)
    return `The '${Object.keys(
      keyPattern
    )}' field must be unique, is repeated in '${Object.values(
      keyValue
    )}' value.`;
  return message;
};

module.exports = (error, req, res, next) => {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "====================== ERROR LOGGER ====================="
  );
  console.table(error);

  if (error.errors) return res.status(400).json(error.errors);
  if (error.name === "MongoServerError") {
    console.error("\x1b[31m%s\x1b[0m", "Error name:", error.name);
    console.error("\x1b[31m%s\x1b[0m", "Error code:", error.code);
    error.status = 400;
    error.message = getMessageMongoError(error);
  }

  const status = error.status || 500;
  const message = error.message || "Server Error";
  res.status(status).send({ success: false, message });
  console.error(
    "\x1b[31m%s\x1b[0m",
    "========================================================="
  );
};
