const express = require("express");
const app = express.Router();
const {
  getAll,
  newCategory,
  getProducts,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

app
  .route("/")
  .get(getAll)
  .post(newCategory)
  .put(updateCategory)
  .delete(deleteCategory);
app.route("/Product").get(getProducts);
module.exports = app;
