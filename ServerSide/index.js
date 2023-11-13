// Import required modules
const express = require("express");
const cors = require("cors");

// Create an Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Database setup
const db = require("./dbModel");
const Role = db.role;

// Synchronize the database (create tables if they do not exist)
db.sequelize.sync();

// Routes setup
require("./routes/beer.routes")(app);

// Define behavior for other routes (if needed)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
