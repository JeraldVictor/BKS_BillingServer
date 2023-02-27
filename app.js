const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const app = express();
const { sequelize } = require("./models");

const { PORT } = process.env;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, "images")));

//! routes
require("./routes")(app);

// error handler
app.use(function (err, req, res, next) {
  res.status(200).json({
    error: true,
    status: err.status || 500,
    message: err.message,
  });
});

sequelize.sync({ force: false, alter: false }).then(() => {
  app.listen(PORT);
  console.log(`Server started on port ${PORT}`);
});
