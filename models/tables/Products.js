module.exports = (sequelize, { DataTypes }) => {
  return sequelize.define(
    "Products",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        // type: DataTypes.BIGINT,
        type: DataTypes.STRING,
        // unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      measure: {
        type: DataTypes.STRING,
        defaultValue: "Nos",
      },
      mrp: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      rate: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      hsnCode: {
        type: DataTypes.STRING,
        defaultValue: "-",
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Products",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
