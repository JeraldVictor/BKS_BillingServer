const { Sequelize, Op } = require("sequelize");
const config = require("../configs");
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

let db = {
  sequelize,
  Sequelize,
  Op,
  //! General
  m_Employee: require("./tables/Employee")(sequelize, Sequelize),
  m_Category: require("./tables/Category")(sequelize, Sequelize),
  m_Products: require("./tables/Products")(sequelize, Sequelize),
  m_Orders: require("./tables/Orders")(sequelize, Sequelize),
  m_OrderItems: require("./tables/OrderItems")(sequelize, Sequelize),
};

require("./relations")(db);

module.exports = db;
