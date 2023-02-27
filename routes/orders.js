const express = require("express");
const app = express.Router();
const {
  getOrders,
  newOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders");

const { newOrderItem, deleteOrderItem } = require("../controllers/orderItem");

app
  .route("/")
  .get(getOrders)
  .post(newOrder)
  .put(updateOrder)
  .delete(deleteOrder);

app.route("/Item").post(newOrderItem).delete(deleteOrderItem);

module.exports = app;
