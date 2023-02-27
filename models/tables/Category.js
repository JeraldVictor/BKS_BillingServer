module.exports = (sequelize, { DataTypes }) => {
  return sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "Category",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
