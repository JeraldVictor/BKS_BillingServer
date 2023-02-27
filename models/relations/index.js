module.exports = (db) => {
  db.m_Category.hasMany(db.m_Products, {
    as: "products",
    foreignKey: {
      name: "category_id",
      allowNull: false,
    },
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true,
  });

  db.m_Products.belongsTo(db.m_Category, {
    as: "category",
    foreignKey: {
      name: "category_id",
      allowNull: false,
    },
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true,
  });
  db.m_Orders.hasMany(db.m_OrderItems, {
    as: "Items",
    foreignKey: {
      name: "order_id",
      allowNull: false,
    },
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true,
  });

  db.m_OrderItems.belongsTo(db.m_Orders, {
    as: "order",
    foreignKey: {
      name: "order_id",
      allowNull: false,
    },
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true,
  });
};
