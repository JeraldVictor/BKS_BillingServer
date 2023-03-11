module.exports = (sequelize, { DataTypes }) => {
  return sequelize.define(
    "Orders",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      billType: {
        type: DataTypes.STRING,
        defaultValue: "CASH", // "SWIGGY", "ZOMATO" , "UPI" , "OTHER" , "QUOTATION"
      },
      total: {
        type: DataTypes.STRING, // Actual total by adding items rate.
        allowNull: false,
      },
      discount: {
        type: DataTypes.STRING, // discount amount
        defaultValue: "0",
      },
      rate: {
        type: DataTypes.STRING, // Total - Discount
        defaultValue: "0",
      },
      mrp: {
        type: DataTypes.STRING, // Total - Discount
        defaultValue: "0",
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "COMPLETED", // "CANCELED" "CREDITED"
      },
      message: {
        type: DataTypes.STRING,
      },
      billedBy: {
        type: DataTypes.STRING,
      },
      billedTo: {
        type: DataTypes.STRING,
        defaultValue: "CUSTOMER",
      },
    },
    {
      sequelize,
      modelName: "Orders",
      timestamps: true,
      createdAt: "placed_on",
      updatedAt: "last_modified",
    }
  );
};
