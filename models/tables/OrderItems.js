module.exports = (sequelize, { DataTypes }) => {
  return sequelize.define(
    "OrderItems",
    {
      // id: {
      //   type: DataTypes.BIGINT,
      //   autoIncrement: true,
      // },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mrp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qty: {
        type: DataTypes.STRING,
        defaultValue: "1",
      },
      total: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
    },
    {
      sequelize,
      modelName: "OrderItems",
      timestamps: true,
      createdAt: "added_on",
      updatedAt: "last_modified",
    }
  );
};
