const express = require("express");
const app = express.Router();
const {
  getEmployee,
  newEmployee,
  resetPassword,
} = require("../controllers/employees");

app.route("/").get(getEmployee).post(newEmployee);
app.route("/Reset").post(resetPassword);
module.exports = app;
