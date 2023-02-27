const express = require("express");
const app = express.Router();
const {
  allProduct,
  newProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
} = require("../controllers/product");

app
  .route("/")
  .get(allProduct)
  .post(newProduct)
  .put(updateProduct)
  .delete(deleteProduct);

app.route("/Search").post(searchProduct);
module.exports = app;
