const express = require("express");
const app = express.Router();
const { home, login } = require("../controllers/home");
const { newEmployee } = require("../controllers/employees");
// const { isLoggedIn } = require("../middleware/auth");

app.route("/").get(home);
app.route("/login").post(login);
app.route("/signup").post(newEmployee);
// app.route("/home").get(isLoggedIn, home);
module.exports = app;
