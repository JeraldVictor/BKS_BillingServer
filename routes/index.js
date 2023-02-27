const home = require("./home");
const employee = require("./employee");
const category = require("./category");
const product = require("./product");
const orders = require("./orders");
const { isLoggedIn } = require("../middleware/auth");

module.exports = (app) => {
  app.use("/", home);
  app.use("/employee", isLoggedIn, employee);
  app.use("/category", isLoggedIn, category);
  app.use("/product", isLoggedIn, product);
  app.use("/order", isLoggedIn, orders);
  app.all("*", async (req, res) => {
    res.json({
      status: 404,
      message: "Path Not Found",
    });
  });
};
