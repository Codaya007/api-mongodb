const server = require("./src/app.js");
const { connectDB } = require("./src/db.js");
const { PORT } = require("./config");

// Syncing all the models at once.
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`); // eslint-disable-line no-console
    });
  })
  .catch((err) => {
    console.log(`Could not connect to the DDBB`);
    console.log("Error message:", `${err.message}`);
  });
